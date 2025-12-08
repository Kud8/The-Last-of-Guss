import dayjs, { Dayjs } from 'dayjs'

export type DerivedStatus = 'active' | 'cooldown' | 'finished'

export function deriveStatus(startTime: string, endTime: string, current: Dayjs = dayjs()): DerivedStatus {
  if (current.isBefore(dayjs(startTime))) return 'cooldown'
  if (current.isBefore(dayjs(endTime))) return 'active'
  return 'finished'
}

export function formatCountdown(target: string): string {
  const now = dayjs()
  const end = dayjs(target)
  const diff = end.diff(now, 'second')
  const clamped = Math.max(diff, 0)
  const minutes = Math.floor(clamped / 60)
  const seconds = clamped % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export function formatDate(date: string) {
  return dayjs(date).format('DD.MM.YYYY HH:mm:ss')
}

