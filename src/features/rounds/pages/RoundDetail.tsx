import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate, Navigate, useSearchParams } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { alpha } from '@mui/material/styles'
import { formatCountdown, formatDate } from '../../../shared/utils/time'
import { extractErrorMessage } from '../../../shared/utils/error'
import GlassPaper from '../../../shared/ui/GlassPaper'
import TopPlayers from '../components/TopPlayers'
import Chip from '@mui/material/Chip'
import RoundInfo from '../components/RoundInfo'
import StatusChip from '../../../shared/ui/StatusChip'
import useRoundQuery from '../hooks/useRoundQuery'
import useRoundStatus from '../hooks/useRoundStatus'
import useNow from '../hooks/useNow'
import useTapRound from '../hooks/useTapRound'

function RoundDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [countdown, setCountdown] = useState('00:00')
  const [particles, setParticles] = useState<{ id: string; x: number; y: number }[]>([])
  const tapAreaRef = useRef<HTMLDivElement | null>(null)
  const now = useNow()

  const { data, isLoading, isError, error, refetch } = useRoundQuery(id)

  const round = data?.round
  const status = useRoundStatus(round?.startTime, round?.endTime, now)

  useEffect(() => {
    if (!round) return
    const target = status === 'cooldown' ? round.startTime : round.endTime
    const tick = () => setCountdown(formatCountdown(target))
    tick()
    const timer = window.setInterval(tick, 1000)
    return () => window.clearInterval(timer)
  }, [round, status])

  const tapMutation = useTapRound(id!)

  const isTapDisabled = status !== 'active'

  const handleTap = (pos?: { x: number; y: number }) => {
    if (isTapDisabled || tapMutation.isPending) return
    if (navigator.vibrate) {
      navigator.vibrate(10)
    }
    if (pos) {
      const id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)
      setParticles((prev) => [...prev, { id, x: pos.x, y: pos.y }])
      window.setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id))
      }, 800)
    }
    tapMutation.mutate()
  }

  if (!id) {
    return <Navigate to="/rounds" replace />
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError || !data) {
    return (
      <Alert
        severity="error"
        action={
          <Stack direction="row" spacing={1}>
            <Button size="small" color="inherit" onClick={() => refetch()}>
              Повторить
            </Button>
            <Button size="small" color="inherit" onClick={() => navigate('/rounds')}>
              Назад
            </Button>
          </Stack>
        }
      >
        {extractErrorMessage(error, 'Не удалось загрузить раунд')}
      </Alert>
    )
  }

  const countdownLabel = status === 'cooldown' ? 'До старта осталось' : status === 'active' ? 'До конца осталось' : ''
  const backStatus = searchParams.get('status')
  const backUrl = backStatus && backStatus !== 'all' ? `/rounds?status=${backStatus}` : '/rounds'

  return (
    <Stack spacing={2.5}>
      <Button
        variant="outlined"
        color="inherit"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(backUrl)}
        sx={{ color: '#e2e8f0', borderColor: 'rgba(255,255,255,0.2)', alignSelf: 'flex-start' }}
      >
        Назад
      </Button>

      <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
        <Stack spacing={0.5}>
          <Typography variant="h5" fontWeight={800} color="common.white">
            Раунд
          </Typography>
          <Typography variant="body2" color="grey.400">
            ID: {round?.id || '-'}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <StatusChip status={status} />
          <Chip label={`Всего: ${round?.totalScore || '-'}`} color="secondary" variant="outlined" />
        </Stack>
      </Stack>

      <GlassPaper sx={{ padding: { xs: 2.5, sm: 3 } }}>
        <Stack spacing={2.5} alignItems="center">
          <Box
            role="button"
            tabIndex={isTapDisabled ? -1 : 0}
            aria-label="Тапнуть гуся"
            ref={tapAreaRef}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              handleTap({ x: e.clientX - rect.left, y: e.clientY - rect.top })
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                const rect = tapAreaRef.current?.getBoundingClientRect()
                if (rect) {
                  handleTap({ x: rect.width / 2, y: rect.height / 2 })
                } else {
                  handleTap()
                }
              }
            }}
            sx={{
              width: '100%',
              maxWidth: 256,
              minHeight: 256,
              overflow: 'hidden',
              position: 'relative',
              borderRadius: 3,
              display: 'grid',
              placeItems: 'center',
              background: `linear-gradient(135deg, ${alpha('#7c3aed', 0.2)}, ${alpha('#2563eb', 0.12)}),
                rgba(255,255,255,0.04)`,
              boxShadow: isTapDisabled
                ? '0 10px 30px rgba(0,0,0,0.2)'
                : tapMutation.isPending
                  ? '0 20px 50px rgba(124,58,237,0.2)'
                  : '0 24px 60px rgba(124,58,237,0.25)',
              cursor: isTapDisabled ? 'not-allowed' : 'pointer',
              transition: 'box-shadow 140ms ease, border-color 140ms ease',
              '&:active': !isTapDisabled
                ? {
                  transform: 'scale(0.995)',
                }
                : undefined,
              '&:focus-visible': {
                outline: 'none',
              },
              '&:hover': !isTapDisabled
                ? {
                  boxShadow: '0 26px 65px rgba(59,130,246,0.32)',
                  borderColor: alpha('#7c3aed', 0.6),
                }
                : undefined,
            }}
          >
            <Box
              component="img"
              src="/logo-guss.png"
              alt="G-42 Goose"
              sx={{
                width: '100%',
                filter: isTapDisabled ? 'grayscale(0.45) brightness(0.82)' : 'none',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                overflow: 'hidden',
                '@keyframes floatUp': {
                  '0%': { opacity: 1, transform: 'translate(-50%, -50%) translateY(0) scale(1)' },
                  '100%': { opacity: 0, transform: 'translate(-50%, -50%) translateY(-36px) scale(1.1)' },
                },
              }}
            >
              {particles.map((p) => (
                <Typography
                  key={p.id}
                  variant="h5"
                  color="#7cf4a0"
                  sx={{
                    position: 'absolute',
                    left: p.x,
                    top: p.y,
                    transform: 'translate(-50%, -50%)',
                    fontWeight: 800,
                    textShadow: `
                      0 0 12px rgba(124, 244, 160, 0.9),
                      0 0 0.5px rgba(0,0,0,0.6),
                      0 0 4px rgba(0,0,0,0.7)
                    `,
                    animation: 'floatUp 800ms ease-out forwards',
                  }}
                >
                  +1
                </Typography>
              ))}
            </Box>
          </Box>

          <Typography variant="caption" color="grey.500" textAlign="center">
            Коснись гуся и зарабатывай очки.
          </Typography>

          <Stack spacing={0.5} alignItems="center">
            <Typography variant="body1" color="common.white" fontWeight={700}>
              {status === 'active'
                ? 'Раунд активен!'
                : status === 'cooldown'
                  ? 'Раунд скоро начнется'
                  : 'Раунд завершен'}
            </Typography>
            <Typography variant="body2" color="grey.300">
              {status === 'finished'
                ? `Завершен: ${round ? formatDate(round.endTime) : '-'}`
                : `${countdownLabel}: ${countdown}`}
            </Typography>
            <Typography variant="body2" color="grey.300">
              Мои очки — {data.myStats.score} · Taps — {data.myStats.taps}
            </Typography>
          </Stack>
        </Stack>
      </GlassPaper>

      <RoundInfo round={round} />

      <TopPlayers top={data.topStats} />
    </Stack>
  );
}

export default RoundDetail

