import { useEffect, type PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { useAuthStore } from '../store'
import useMeQuery from '../hooks/useMeQuery'

function RequireAuth({ children }: PropsWithChildren) {
  const location = useLocation()
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)

  const enabled = Boolean(token)
  const { data, isPending, isError } = useMeQuery(enabled)

  useEffect(() => {
    if (data) setUser(data)
  }, [data, setUser])
 
  useEffect(() => {
    if (isError) setUser(null)
  }, [isError, setUser])

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (isPending) {
    return (
      <Box minHeight="60vh" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Box>
    )
  }

  if (isError || !user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default RequireAuth

