import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import type { StatusFilter } from '../types'

interface Props {
  status: StatusFilter
  onChange: (value: StatusFilter) => void
}

function RoundFilters({ status, onChange }: Props) {
  return (
    <ToggleButtonGroup
      size="small"
      exclusive
      value={status}
      onChange={(_, val) => {
        if (!val) return
        onChange(val)
      }}
      sx={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        width: { xs: '100%', sm: 'auto' },
        justifyContent: { xs: 'space-between', sm: 'flex-start' },
        '& .MuiToggleButton-root': {
          color: '#e2e8f0',
          borderColor: 'rgba(255,255,255,0.08)',
          '&.Mui-selected': {
            background: 'linear-gradient(90deg, #7c3aed, #3b82f6)',
            color: '#fff',
            borderColor: 'transparent',
          },
        },
      }}
    >
      <ToggleButton value="all">Все</ToggleButton>
      <ToggleButton value="active">Active</ToggleButton>
      <ToggleButton value="cooldown">Cooldown</ToggleButton>
      <ToggleButton value="finished">Finished</ToggleButton>
    </ToggleButtonGroup>
  )
}

export default RoundFilters

