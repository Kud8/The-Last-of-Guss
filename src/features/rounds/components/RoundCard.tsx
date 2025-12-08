import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { deriveStatus, formatDate } from '../../../shared/utils/time'
import type { Round } from '../types'
import { cardPaperSx } from './RoundCard.styles'
import StatusChip from '../../../shared/ui/StatusChip'

interface Props {
  round: Round
  onClick: () => void
}

function RoundCard({ round, onClick }: Props) {
  const status = deriveStatus(round.startTime, round.endTime)
  const shortId = round.id.length > 12 ? `${round.id.slice(0, 6)}...${round.id.slice(-6)}` : round.id

  return (
    <Paper sx={cardPaperSx} onClick={onClick}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
        <Stack spacing={0.5}>
          <Typography variant="body2" color="grey.400">
            Round ID
          </Typography>
          <Typography variant="h6" fontWeight={700} color="common.white" noWrap title={round.id}>
            {shortId}
          </Typography>
        </Stack>
        <StatusChip status={status} />
      </Stack>
      <Divider sx={{ my: 1.5, borderColor: 'rgba(255,255,255,0.08)' }} />
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} divider={<Divider flexItem orientation="vertical" />}>
        <Stack spacing={0.5}>
          <Typography variant="body2" color="grey.400">
            Start
          </Typography>
          <Typography variant="body2">{formatDate(round.startTime)}</Typography>
        </Stack>
        <Stack spacing={0.5}>
          <Typography variant="body2" color="grey.400">
            End
          </Typography>
          <Typography variant="body2">{formatDate(round.endTime)}</Typography>
        </Stack>
        <Stack spacing={0.5}>
          <Typography variant="body2" color="grey.400">
            Total score
          </Typography>
          <Typography variant="body2">{round.totalScore}</Typography>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default RoundCard

