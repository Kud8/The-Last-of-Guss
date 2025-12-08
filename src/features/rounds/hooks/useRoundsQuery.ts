import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchRounds } from '../api'
import type { StatusFilter } from '../types'

function useRoundsQuery(status: StatusFilter) {
  return useInfiniteQuery({
    queryKey: ['rounds', status],
    queryFn: ({ pageParam }: { pageParam?: string }) =>
      fetchRounds({
        cursor: pageParam,
        limit: 10,
        status: status === 'all' ? undefined : status,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => (lastPage.pagination.hasMore ? lastPage.pagination.nextCursor : undefined),
    staleTime: 10_000,
  })
}

export default useRoundsQuery

