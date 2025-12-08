import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import RoundCard from './RoundCard'
import theme from '../../../shared/theme'
import type { Round } from '../types'
import { beforeAll, afterAll, vi } from 'vitest'

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

const baseRound: Round = {
  id: '12345678901234567890',
  startTime: '2025-01-01T00:00:00Z',
  endTime: '2026-01-01T00:00:00Z',
  totalScore: 100,
  createdAt: '2024-12-01T00:00:00Z',
}

describe('RoundCard', () => {
  beforeAll(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-06-01T12:00:00Z'))
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('renders round info and shortens long id', () => {
    renderWithTheme(<RoundCard round={baseRound} onClick={() => {}} />)

    expect(screen.getByText('Round ID')).toBeInTheDocument()
    expect(screen.getByText('123456...567890')).toBeInTheDocument()
    expect(screen.getByText('Start')).toBeInTheDocument()
    expect(screen.getByText('End')).toBeInTheDocument()
    expect(screen.getByText('Total score')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('ACTIVE')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    renderWithTheme(<RoundCard round={baseRound} onClick={handleClick} />)

    fireEvent.click(screen.getByText('Round ID'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})


