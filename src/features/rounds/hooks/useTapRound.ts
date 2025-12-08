import { useMutation, useQueryClient } from '@tanstack/react-query'
import { tapRound } from '../api'
import type { RoundDetailResponse } from '../types'

function useTapRound(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => tapRound(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['round', id] })
      const prev = queryClient.getQueryData<RoundDetailResponse>(['round', id])
      if (prev) {
        const optimistic: RoundDetailResponse = {
          ...prev,
          myStats: {
            taps: prev.myStats.taps + 1,
            score: prev.myStats.score + 1,
          },
        }
        queryClient.setQueryData(['round', id], optimistic)
      }
      return { prev }
    },
    onError: (_err, _vars, context) => {
      if (context?.prev) {
        queryClient.setQueryData(['round', id], context.prev)
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData<RoundDetailResponse>(['round', id], (current) =>
        current ? { ...current, myStats: { taps: data.taps, score: data.score } } : current,
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['round', id] })
    },
  })
}

export default useTapRound

