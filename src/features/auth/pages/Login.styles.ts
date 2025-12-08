import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

export const PageWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `
    linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.82) 55%, rgba(15, 23, 42, 0.9) 100%),
    radial-gradient(120% 120% at 20% 20%, rgba(124, 58, 237, 0.18), transparent 45%),
    radial-gradient(140% 140% at 85% 0%, rgba(59, 130, 246, 0.2), transparent 40%),
    url('/bg.png') center/cover no-repeat
  `,
  padding: theme.spacing(3),
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    background: `
      linear-gradient(135deg, rgba(15, 23, 42, 0.94) 0%, rgba(15, 23, 42, 0.88) 55%, rgba(15, 23, 42, 0.92) 100%),
      radial-gradient(120% 120% at 20% 20%, rgba(124, 58, 237, 0.2), transparent 45%),
      radial-gradient(140% 140% at 85% 0%, rgba(59, 130, 246, 0.25), transparent 40%),
      url('/bg-mobile.png') center/cover no-repeat
    `,
  },
}))

export const Card = styled(Paper)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: 440,
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 1.5,
  background: 'rgba(255, 255, 255, 0.92)',
  border: '1px solid rgba(255,255,255,0.55)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
  backdropFilter: 'blur(10px)',
  zIndex: 1,
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background:
      'radial-gradient(70% 70% at 20% 20%, rgba(59,130,246,0.12), transparent 45%), radial-gradient(60% 60% at 80% 0%, rgba(124,58,237,0.12), transparent 40%)',
    zIndex: 0,
  },
  '& > *': {
    position: 'relative',
    zIndex: 1,
  },
}))

export const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}))

export const Actions = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
}))

export const AccentBar = styled('div')(() => ({
  width: '100%',
  height: 6,
  borderRadius: 999,
  background: 'linear-gradient(90deg, #7c3aed, #3b82f6)',
  opacity: 0.8,
}))

