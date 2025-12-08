import { styled } from '@mui/material/styles'

export const Shell = styled('div')(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#0f172a',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'fixed',
    inset: 0,
    zIndex: 0,
    background: `
      linear-gradient(135deg, rgba(15, 23, 42, 0.94) 0%, rgba(15, 23, 42, 0.88) 55%, rgba(15, 23, 42, 0.92) 100%),
      radial-gradient(120% 120% at 20% 20%, rgba(124, 58, 237, 0.2), transparent 45%),
      radial-gradient(140% 140% at 85% 0%, rgba(59, 130, 246, 0.25), transparent 40%),
      url('/bg.png') center/cover no-repeat
    `,
    pointerEvents: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    '&::before': {
      background: `
        linear-gradient(135deg, rgba(15, 23, 42, 0.94) 0%, rgba(15, 23, 42, 0.88) 55%, rgba(15, 23, 42, 0.92) 100%),
        radial-gradient(120% 120% at 20% 20%, rgba(124, 58, 237, 0.22), transparent 45%),
        radial-gradient(140% 140% at 85% 0%, rgba(59, 130, 246, 0.28), transparent 40%),
        url('/bg-mobile.png') center/cover no-repeat
      `,
    },
  },
}))

export const Main = styled('main')(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(3),
  maxWidth: 1200,
  width: '100%',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  position: 'relative',
  zIndex: 1,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}))

