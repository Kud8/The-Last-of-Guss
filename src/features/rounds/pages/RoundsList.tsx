import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import { useAuthStore } from '../../auth/store'
import { extractErrorMessage } from '../../../shared/utils/error'
import RoundFilters from '../components/RoundFilters'
import RoundCard from '../components/RoundCard'
import CreateRoundDialog from '../components/CreateRoundDialog'
import useRoundsQuery from '../hooks/useRoundsQuery'
import useCreateRound from '../hooks/useCreateRound'
import type { CreateRoundPayload, StatusFilter } from '../types'

function RoundsList() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const user = useAuthStore((s) => s.user)
  const isAdmin = user?.role === 'ADMIN'
  const [modalOpen, setModalOpen] = useState(false)

  const statusParam = searchParams.get('status')
  const isValidStatus = (val: string | null): val is StatusFilter =>
    val === 'active' || val === 'cooldown' || val === 'finished' || val === 'all' || val === null
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(isValidStatus(statusParam) && statusParam ? statusParam : 'all')

  useEffect(() => {
    if (isValidStatus(statusParam) && statusParam && statusParam !== statusFilter) {
      setStatusFilter(statusParam)
    }
  }, [statusParam, statusFilter])

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useRoundsQuery(statusFilter)

  const createMutation = useCreateRound()

  const items = useMemo(() => data?.pages.flatMap((p) => p.data) ?? [], [data])

  const handleStatusChange = (val: StatusFilter) => {
    setStatusFilter(val)
    if (val === 'all') {
      setSearchParams({}, { replace: true })
    } else {
      setSearchParams({ status: val }, { replace: true })
    }
  }

  const handleCreate = (payload: CreateRoundPayload) => {
    createMutation.mutate(payload, {
      onSuccess: (newRound) => {
        navigate(`/rounds/${newRound.id}`)
        setModalOpen(false)
      },
      onError: (err) => {
        alert(extractErrorMessage(err, 'Не удалось создать раунд'))
      },
    })
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2} flexWrap="wrap">
        <Typography variant="h5" fontWeight={800} color="common.white">
          Раунды
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 1.5 }}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          flexWrap="wrap"
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          <RoundFilters status={statusFilter} onChange={handleStatusChange} />
          <Tooltip title={isAdmin ? 'Создать новый раунд' : 'Доступно только для роли ADMIN'}>
            <span>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                disabled={!isAdmin || createMutation.isPending}
                onClick={() => setModalOpen(true)}
                sx={{
                  background: 'linear-gradient(90deg, #7c3aed, #3b82f6)',
                  color: '#fff',
                  boxShadow: '0 10px 30px rgba(59,130,246,0.35)',
                  width: { xs: '100%', sm: 'auto' },
                  '&:hover': {
                    background: 'linear-gradient(90deg, #6d28d9, #2563eb)',
                  },
                  '&.Mui-disabled': {
                    opacity: 0.6,
                    color: '#e2e8f0',
                    boxShadow: 'none',
                  },
                }}
              >
                {createMutation.isPending ? 'Создаем...' : 'Создать раунд'}
              </Button>
            </span>
          </Tooltip>
        </Stack>
      </Stack>

      {isLoading && (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      )}

      {isError && (
        <Alert severity="error" action={<Button color="inherit" size="small" onClick={() => refetch()}>Повторить</Button>}>
          {extractErrorMessage(error, 'Не удалось загрузить раунды')}
        </Alert>
      )}

      {!isLoading && items.length === 0 && (
        <Alert severity="info" sx={{ background: 'rgba(12,17,31,0.9)', color: 'white' }}>
          Раундов пока нет. {isAdmin ? 'Создайте первый раунд.' : 'Ожидайте, когда админ создаст раунд.'}
        </Alert>
      )}

      <Stack spacing={1.5}>
        {items.map((round) => (
          <RoundCard
            key={round.id}
            round={round}
            onClick={() => navigate(`/rounds/${round.id}${statusFilter === 'all' ? '' : `?status=${statusFilter}`}`)}
          />
        ))}
      </Stack>

      {hasNextPage && (
        <Box display="flex" justifyContent="center" pt={1}>
          <Button
            variant="outlined"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}
          >
            {isFetchingNextPage ? 'Загружаем...' : 'Показать еще'}
          </Button>
        </Box>
      )}

      <CreateRoundDialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreate}
        loading={createMutation.isPending}
      />
    </Stack>
  )
}

export default RoundsList

