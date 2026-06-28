'use client'

import React, { useRef, type CSSProperties } from 'react'
import clsx from 'clsx'

interface BorderGlowProps {
  children: React.ReactNode
  className?: string
  glowSize?: number
  borderWidth?: number
  borderRadius?: number
  glowColor?: string
  backgroundColor?: string
  onClick?: () => void
}

export default function BorderGlow({
  children,
  className,
  glowSize = 180,
  borderWidth = 1,
  borderRadius = 24,
  glowColor = '59,130,246',
  backgroundColor = '#ffffff',
  onClick,
}: BorderGlowProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect()

    ref.current!.style.setProperty('--x', `${e.clientX - rect.left}px`)
    ref.current!.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }

  const handleEnter = () => {
    ref.current?.style.setProperty('--opacity', '1')
  }

  const handleLeave = () => {
    ref.current?.style.setProperty('--opacity', '0')
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      onClick={onClick}
      className={clsx(
        'relative overflow-hidden transition-transform duration-200',
        className
      )}
      style={
        {
          '--x': '50%',
          '--y': '50%',
          '--opacity': 0,
          '--glow-size': `${glowSize}px`,
          '--glow-color': glowColor,
          '--border-width': `${borderWidth}px`,
          borderRadius,
          background: backgroundColor,
        } as CSSProperties
      }
    >
      {/* Border Glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[inherit]"
        style={{
          padding: `var(--border-width)`,
          opacity: 'var(--opacity)',
          transition: 'opacity .25s ease',
          background: `
            radial-gradient(
              var(--glow-size) circle at var(--x) var(--y),
              rgba(var(--glow-color),1),
              rgba(var(--glow-color),0.5) 25%,
              transparent 70%
            )
          `,
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* Soft Glow */}
      <div
        className="absolute pointer-events-none -inset-10 rounded-[inherit]"
        style={{
          opacity: 'calc(var(--opacity) * .75)',
          transition: 'opacity .25s ease',
          background: `
            radial-gradient(
              calc(var(--glow-size) * 0.8) circle
              at var(--x) var(--y),
              rgba(var(--glow-color),.35),
              transparent 75%
            )
          `,
          filter: 'blur(32px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 rounded-[inherit]">
        {children}
      </div>
    </div>
  )
}