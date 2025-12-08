import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import RoundFilters from './RoundFilters'
import theme from '../../../shared/theme'
import type { StatusFilter } from '../types'

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

describe('RoundFilters', () => {
  it('renders all filter buttons', () => {
    const handleChange = vi.fn()
    renderWithTheme(<RoundFilters status="all" onChange={handleChange} />)

    expect(screen.getByRole('button', { name: 'Все' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Active' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cooldown' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Finished' })).toBeInTheDocument()
  })

  it('calls onChange with selected value', () => {
    const handleChange = vi.fn<(value: StatusFilter) => void>()
    renderWithTheme(<RoundFilters status="all" onChange={handleChange} />)

    fireEvent.click(screen.getByRole('button', { name: 'Active' }))
    expect(handleChange).toHaveBeenCalledWith('active')
  })
})


