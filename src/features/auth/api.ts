import { api } from '../../shared/api/client'
import type { User, LoginPayload, LoginResponse } from './types'

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>('/api/v1/auth/login', payload)
  return data
}

export async function me(): Promise<User> {
  const { data } = await api.get<User>('/api/v1/auth/me')
  return data
}

