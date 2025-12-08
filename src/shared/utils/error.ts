import { AxiosError, isAxiosError } from 'axios'

export function extractErrorMessage(error: unknown, fallback = 'Что-то пошло не так') {
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>
    const message = axiosError.response?.data?.message
    if (message) return message
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}

