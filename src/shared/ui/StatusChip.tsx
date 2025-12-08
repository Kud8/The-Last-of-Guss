import Chip from '@mui/material/Chip'
import type { RoundStatus } from '../../features/rounds/types'

const statusChipProps = (status: RoundStatus) => {
  if (status === 'active') return { color: 'success' as const, variant: 'filled' as const }
  if (status === 'cooldown') return { color: 'warning' as const, variant: 'filled' as const }
  return {
    color: 'default' as const,
    variant: 'outlined' as const,
    sx: {
      borderColor: 'rgba(255,255,255,0.5)',
      color: '#e2e8f0',
      background: 'rgba(255,255,255,0.08)',
    },
  }
}

interface Props {
  status: RoundStatus
  label?: string
}

function StatusChip({ status, label }: Props) {
  return <Chip label={label ?? status.toUpperCase()} {...statusChipProps(status)} />
}

export default StatusChip

