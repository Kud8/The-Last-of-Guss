export type RoundStatus = 'active' | 'cooldown' | 'finished'

export interface Round {
  id: string
  startTime: string
  endTime: string
  totalScore: number
  createdAt: string
}

export interface RoundsResponse {
  data: Round[]
  pagination: {
    limit: number
    nextCursor: string | null
    hasMore: boolean
  }
}

export interface RoundDetailResponse {
  round: Round
  topStats: Array<{
    taps: number
    score: number
    user: { username: string }
  }>
  myStats: {
    taps: number
    score: number
  }
}

export interface CreateRoundResponse extends Round {}

export interface CreateRoundPayload {
  startTime?: string
  endTime?: string
  totalScore?: number
}

export interface TapResponse {
  taps: number
  score: number
}

export type StatusFilter = 'all' | RoundStatus


