import dayjs from 'dayjs'
import { deriveStatus } from './time'

describe('deriveStatus', () => {
  const start = dayjs('2025-01-01T00:00:00Z').toISOString()
  const end = dayjs('2026-01-01T00:00:00Z').toISOString()

  it('returns cooldown before start', () => {
    const now = dayjs('2024-12-31T23:59:59Z')
    expect(deriveStatus(start, end, now)).toBe('cooldown')
  })

  it('returns active between start and end', () => {
    const now = dayjs('2025-06-01T12:00:00Z')
    expect(deriveStatus(start, end, now)).toBe('active')
  })

  it('returns finished after end', () => {
    const now = dayjs('2027-01-01T00:00:00Z')
    expect(deriveStatus(start, end, now)).toBe('finished')
  })
})


