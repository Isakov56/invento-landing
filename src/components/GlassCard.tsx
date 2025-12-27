import { ReactNode } from 'react'
import clsx from 'clsx'
import glassStyles from '../styles/glass.module.css'

interface GlassCardProps {
  children: ReactNode
  variant?: 'standard' | 'premium' | 'frost' | 'gradient'
  className?: string
  glow?: boolean
  shimmer?: boolean
  onClick?: () => void
}

export default function GlassCard({
  children,
  variant = 'standard',
  className = '',
  glow = false,
  shimmer = false,
  onClick,
}: GlassCardProps) {
  const variantClass = {
    standard: glassStyles.glassCard,
    premium: glassStyles.glassCardPremium,
    frost: glassStyles.glassFrost,
    gradient: glassStyles.glassGradient,
  }[variant]

  return (
    <div
      className={clsx(
        variantClass,
        glow && glassStyles.glassGlow,
        shimmer && glassStyles.shimmer,
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
