import { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'

function useNow(intervalMs = 1000): Dayjs {
  const [now, setNow] = useState(dayjs())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(dayjs()), intervalMs)
    return () => window.clearInterval(timer)
  }, [intervalMs])

  return now
}

export default useNow

