import { FormEvent, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import { login } from '../../api/auth'
import { useAuthStore } from '../../store/auth'
import { extractErrorMessage } from '../../utils/error'
import { AccentBar, Actions, Card, Form, Logo, PageWrapper } from './Login.styles'

const MIN_USERNAME = 3
const MIN_PASSWORD = 3

function LoginPage() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const isFormValid = useMemo(
    () => username.trim().length >= MIN_USERNAME && password.trim().length >= MIN_PASSWORD,
    [username, password],
  )

  const { mutateAsync, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth({ token: data.token, user: { username: data.username, role: data.role } })
      setError('')
      navigate('/rounds', { replace: true })
    },
    onError: (err) => {
      setError(extractErrorMessage(err, 'Не удалось войти. Проверьте данные.'))
    },
  })

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isFormValid || isPending) return
    await mutateAsync({ username: username.trim(), password })
  }

  return (
    <PageWrapper>
      <Card>
        <Stack spacing={1.5}>
          <Typography variant="h5" component="h1" gutterBottom fontWeight={800}>
            Войти в игру
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Подключайся, чтобы тапать мутировавшего гуся и поднимать свой счет.
          </Typography>
          <AccentBar />
        </Stack>

        <Form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            inputProps={{ minLength: MIN_USERNAME, maxLength: 32 }}
            disabled={isPending}
            autoFocus
            fullWidth
          />
          <TextField
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            inputProps={{ minLength: MIN_PASSWORD, maxLength: 64 }}
            disabled={isPending}
            fullWidth
          />

          <Actions>
            {error && <Alert severity="error">{error}</Alert>}
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!isFormValid || isPending}
              startIcon={isPending ? <CircularProgress size={18} color="inherit" /> : null}
            >
              {isPending ? 'Входим...' : 'Войти'}
            </Button>
          </Actions>
        </Form>
      </Card>
    </PageWrapper>
  )
}

export default LoginPage

