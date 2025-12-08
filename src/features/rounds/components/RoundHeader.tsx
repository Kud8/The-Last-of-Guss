import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import StatusChip from '../../../shared/ui/StatusChip'

interface Props {
  roundId?: string
  status: 'active' | 'cooldown' | 'finished'
  totalScore?: number
  onBack: () => void
}

function RoundHeader({ roundId, status, totalScore, onBack }: Props) {
  return (
    <Stack spacing={1.5}>
      <Button
        variant="outlined"
        color="inherit"
        startIcon={<ArrowBackIcon />}
        onClick={onBack}
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
            ID: {roundId || '-'}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <StatusChip status={status} />
          <Chip label={`Всего: ${totalScore ?? '-'}`} color="secondary" variant="outlined" />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default RoundHeader

