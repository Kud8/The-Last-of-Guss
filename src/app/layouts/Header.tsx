import { Outlet, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import LogoutIcon from '@mui/icons-material/Logout'
import { Shell, Main } from './Header.styles'
import { useAuthStore } from '../../features/auth/store'

function Header() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <Shell>
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{
          background: 'rgba(11, 18, 36, 0.92)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(8px)',
          px: { xs: 1, sm: 2 },
          py: { xs: 0.75, sm: 0.75 },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
            width: '100%',
            minHeight: 56,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0, flex: 1 }}>
            <Avatar src="/logo-guss.png" alt="Guss" sx={{ width: 36, height: 36 }} />
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="subtitle1"
                fontWeight={700}
                color="common.white"
                noWrap
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                The Last of Guss
              </Typography>
              <Typography
                variant="caption"
                color="grey.400"
                noWrap
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                Tap survival protocol
              </Typography>
              {user && (
                <Stack spacing={0} sx={{ display: { xs: 'flex', sm: 'none' } }}>
                  <Typography variant="body1" color="grey.50" fontWeight={700} noWrap title={user.username}>
                    {user.username}
                  </Typography>
                  <Typography variant="caption" color="grey.400" noWrap>
                    Роль: {user.role}
                  </Typography>
                </Stack>
              )}
            </Box>
          </Stack>
          {user && (
            <Stack
              direction="row"
              spacing={0.75}
              alignItems="center"
              sx={{ minWidth: 0, maxWidth: { xs: '60%', sm: '40%' }, display: { xs: 'none', sm: 'flex' } }}
            >
              <Stack spacing={0} sx={{ minWidth: 0 }}>
                <Typography variant="body1" color="grey.50" fontWeight={700} noWrap title={user.username}>
                  {user.username}
                </Typography>
                <Typography variant="caption" color="grey.400" noWrap>
                  Роль: {user.role}
                </Typography>
              </Stack>
            </Stack>
          )}
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleLogout}
            sx={{
              width: 36,
              minWidth: 36,
              height: 36,
              px: 0,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Выйти"
          >
            <LogoutIcon fontSize="small" />
          </Button>
        </Toolbar>
      </AppBar>
      <Main>
        <Outlet />
      </Main>
    </Shell>
  )
}

export default Header

