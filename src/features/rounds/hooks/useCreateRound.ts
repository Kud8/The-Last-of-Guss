import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createRound, type CreateRoundPayload } from '../api'

function useCreateRound() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateRoundPayload) => createRound(payload),
    onSuccess: (newRound) => {
      queryClient.invalidateQueries({ queryKey: ['rounds'] })
      return newRound
    },
  })
}

export default useCreateRound

