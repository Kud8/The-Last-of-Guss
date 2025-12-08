import { useQuery } from '@tanstack/react-query'
import { me } from '../api'
import type { User } from '../types'

function useMeQuery(enabled: boolean) {
  return useQuery<User, Error, User, ['me']>({
    queryKey: ['me'],
    queryFn: () => me(),
    enabled,
    retry: false,
    staleTime: 60_000,
  })
}

export default useMeQuery

