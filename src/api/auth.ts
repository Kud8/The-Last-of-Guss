import { api } from './client'
import type {UserRole} from '../store/auth'

export interface LoginPayload {
  username: string
  password: string
}

export interface LoginResponse {
  username: string
  role: UserRole
  token: string
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>('/api/v1/auth/login', payload)
  return data
}

