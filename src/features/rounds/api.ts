import { api } from '../../shared/api/client'
import type {
  CreateRoundPayload,
  CreateRoundResponse,
  RoundDetailResponse,
  RoundsResponse,
  RoundStatus,
  TapResponse,
} from './types'

export type { CreateRoundPayload, CreateRoundResponse, RoundDetailResponse, RoundsResponse, RoundStatus, TapResponse }

export async function fetchRounds(params?: {
  cursor?: string
  limit?: number
  status?: RoundStatus
}): Promise<RoundsResponse> {
  const { data } = await api.get<RoundsResponse>('/api/v1/rounds', { params })
  return data
}

export async function fetchRound(id: string): Promise<RoundDetailResponse> {
  const { data } = await api.get<RoundDetailResponse>(`/api/v1/rounds/${id}`)
  return data
}

export async function createRound(payload?: CreateRoundPayload): Promise<CreateRoundResponse> {
  const { data } = await api.post<CreateRoundResponse>('/api/v1/rounds', payload)
  return data
}

export async function tapRound(id: string): Promise<TapResponse> {
  const { data } = await api.post<TapResponse>(`/api/v1/rounds/${id}/tap`)
  return data
}
