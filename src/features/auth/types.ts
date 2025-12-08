export type UserRole = 'SURVIVOR' | 'NIKITA' | 'ADMIN'

export interface User {
  username: string
  role: UserRole
}

export interface LoginPayload {
  username: string
  password: string
}

export interface LoginResponse {
  username: string
  role: UserRole
  token: string
}


