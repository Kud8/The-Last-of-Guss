import { useMemo } from 'react'
import type { Dayjs } from 'dayjs'
import { deriveStatus } from '../../../shared/utils/time'

export type DerivedStatus = 'active' | 'cooldown' | 'finished'

function useRoundStatus(startTime?: string, endTime?: string, now?: Dayjs): DerivedStatus {
  return useMemo(
    () => (startTime && endTime ? deriveStatus(startTime, endTime, now) : 'cooldown'),
    [startTime, endTime, now],
  )
}

export default useRoundStatus

