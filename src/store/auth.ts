import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserRole = 'SURVIVOR' | 'NIKITA' | 'ADMIN'

export interface User {
  username: string
  role: UserRole
}

interface AuthState {
  token: string | null
  user: User | null
  setAuth: (payload: { token: string; user: User }) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: ({ token, user }) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({ token: state.token, user: state.user }),
    },
  ),
)

