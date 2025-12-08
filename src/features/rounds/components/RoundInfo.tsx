import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { formatDate } from '../../../shared/utils/time'
import type { Round } from '../types'
import GlassPaper from '../../../shared/ui/GlassPaper'

interface Props {
  round?: Round
}

function RoundInfo({ round }: Props) {
  return (
    <GlassPaper>
      <Typography variant="subtitle1" fontWeight={700} gutterBottom>
        Информация о раунде
      </Typography>
      <Stack
        spacing={1.5}
        direction={{ xs: 'column', sm: 'row' }}
        divider={<Divider flexItem orientation="vertical" />}
      >
        <Stack spacing={0.5}>
          <Typography variant="body2" color="grey.400">
            Start
          </Typography>
          <Typography variant="body2">{round ? formatDate(round.startTime) : '-'}</Typography>
        </Stack>
        <Stack spacing={0.5}>
          <Typography variant="body2" color="grey.400">
            End
          </Typography>
          <Typography variant="body2">{round ? formatDate(round.endTime) : '-'}</Typography>
        </Stack>
        <Stack spacing={0.5}>
          <Typography variant="body2" color="grey.400">
            Total score
          </Typography>
          <Typography variant="body2">{round?.totalScore ?? '-'}</Typography>
        </Stack>
      </Stack>
    </GlassPaper>
  )
}

export default RoundInfo

