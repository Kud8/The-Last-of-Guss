import { useState, useRef } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'

interface Particle {
  id: string
  x: number
  y: number
}

interface Props {
  disabled: boolean
  loading: boolean
  onTap: (pos?: { x: number; y: number }) => void
}

function TapArea({ disabled, loading, onTap }: Props) {
  const [particles, setParticles] = useState<Particle[]>([])
  const tapAreaRef = useRef<HTMLDivElement | null>(null)

  const addParticle = (pos: { x: number; y: number }) => {
    const id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)
    setParticles((prev) => [...prev, { id, x: pos.x, y: pos.y }])
    window.setTimeout(() => setParticles((prev) => prev.filter((p) => p.id !== id)), 800)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || loading) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    addParticle(pos)
    onTap(pos)
  }

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled || loading) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      const rect = tapAreaRef.current?.getBoundingClientRect()
      const pos = rect ? { x: rect.width / 2, y: rect.height / 2 } : undefined
      if (pos) addParticle(pos)
      onTap(pos)
    }
  }

  return (
    <Box
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label="Тапнуть гуся"
      ref={tapAreaRef}
      onClick={handleClick}
      onKeyDown={handleKey}
      sx={{
        width: '100%',
        maxWidth: 256,
        minHeight: 256,
        overflow: 'hidden',
        position: 'relative',
        borderRadius: 3,
        display: 'grid',
        placeItems: 'center',
        background: `linear-gradient(135deg, ${alpha('#7c3aed', 0.2)}, ${alpha('#2563eb', 0.12)}),
          rgba(255,255,255,0.04)`,
        boxShadow: disabled
          ? '0 10px 30px rgba(0,0,0,0.2)'
          : loading
            ? '0 20px 50px rgba(124,58,237,0.2)'
            : '0 24px 60px rgba(124,58,237,0.25)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'box-shadow 140ms ease, border-color 140ms ease',
        '&:active': !disabled
          ? {
            transform: 'scale(0.995)',
          }
          : undefined,
        '&:focus-visible': {
          outline: 'none',
        },
        '&:hover': !disabled
          ? {
            boxShadow: '0 26px 65px rgba(59,130,246,0.32)',
            borderColor: alpha('#7c3aed', 0.6),
          }
          : undefined,
      }}
    >
      <Box
        component="img"
        src="/logo-guss.png"
        alt="G-42 Goose"
        sx={{
          width: '100%',
          filter: disabled ? 'grayscale(0.45) brightness(0.82)' : 'none',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          '@keyframes floatUp': {
            '0%': { opacity: 1, transform: 'translate(-50%, -50%) translateY(0) scale(1)' },
            '100%': { opacity: 0, transform: 'translate(-50%, -50%) translateY(-36px) scale(1.1)' },
          },
        }}
      >
        {particles.map((p) => (
          <Typography
            key={p.id}
            variant="h5"
            color="#7cf4a0"
            sx={{
              position: 'absolute',
              left: p.x,
              top: p.y,
              transform: 'translate(-50%, -50%)',
              fontWeight: 800,
              textShadow: `
                0 0 12px rgba(124, 244, 160, 0.9),
                0 0 0.5px rgba(0,0,0,0.6),
                0 0 4px rgba(0,0,0,0.7)
              `,
              animation: 'floatUp 800ms ease-out forwards',
            }}
          >
            +1
          </Typography>
        ))}
      </Box>
    </Box>
  )
}

export default TapArea

