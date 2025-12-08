import axios from 'axios'
import { useAuthStore } from '../../features/auth/store'

export const api = axios.create({
  baseURL: 'http://v2991160.hosted-by-vdsina.ru',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      useAuthStore.getState().logout()
      if (typeof window !== 'undefined') {
        window.location.replace('/login')
      }
    }
    return Promise.reject(error)
  },
)

