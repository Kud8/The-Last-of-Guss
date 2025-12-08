import type { SxProps, Theme } from '@mui/material/styles'
import Paper, { type PaperProps } from '@mui/material/Paper'

const baseSx: SxProps<Theme> = {
  padding: 2,
  background: 'rgba(12,17,31,0.9)',
  border: '1px solid rgba(255,255,255,0.16)',
  color: 'white',
}

type GlassPaperProps = PaperProps & { sx?: SxProps<Theme> }

function GlassPaper({ sx, ...rest }: GlassPaperProps) {
  return <Paper sx={[baseSx, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]} {...rest} />
}

export default GlassPaper

