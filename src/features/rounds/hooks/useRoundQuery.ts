import { useQuery } from '@tanstack/react-query'
import { fetchRound } from '../api'

function useRoundQuery(id?: string) {
  return useQuery({
    queryKey: ['round', id],
    queryFn: () => fetchRound(id!),
    enabled: Boolean(id),
    refetchInterval: 3000,
  })
}

export default useRoundQuery

