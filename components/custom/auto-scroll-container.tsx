'use client'

import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'

interface AutoScrollContainerProps {
  children: React.ReactNode
  className?: string
  speed?: number
  intervalTime?: number
  disabled?: boolean
  pauseDuration?: number // NEW
  onReachBottom?: () => void
}

export default function AutoScrollContainer({
  children,
  className = '',
  speed = 1,
  intervalTime = 50,
  disabled = false,
  pauseDuration = 5000, // default 5s
  onReachBottom,
}: AutoScrollContainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isHovered || disabled) return

    const container = scrollRef.current
    if (!container) return

    let isPaused = false

    const interval = setInterval(() => {
      if (isPaused) return

      const { scrollTop, scrollHeight, clientHeight } = container

      const isBottom =
        scrollTop + clientHeight >= scrollHeight - 5

      if (!isBottom) {
        container.scrollTop += speed
      } else {
        isPaused = true

        if (onReachBottom) {
          onReachBottom()
        }

        pauseTimeoutRef.current = setTimeout(() => {
          container.scrollTop = 0
          isPaused = false
        }, pauseDuration)
      }
    }, intervalTime)

    return () => {
      clearInterval(interval)
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current)
      }
    }
  }, [
    isHovered,
    disabled,
    speed,
    intervalTime,
    pauseDuration,
    onReachBottom,
  ])

  return (
    <div
      ref={scrollRef}
      className={cn('overflow-y-auto', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  )
}