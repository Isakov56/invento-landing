import styles from './FloatingOrb.module.css'

interface FloatingOrbProps {
  color: 'teal' | 'purple' | 'magenta'
  size?: 'small' | 'medium' | 'large'
  position: { x: number; y: number } // Percentage values
  delay?: number // Animation delay in seconds
}

export default function FloatingOrb({ color, size = 'medium', position, delay = 0 }: FloatingOrbProps) {
  const sizeMap = {
    small: 300,
    medium: 500,
    large: 700,
  }

  const colorMap = {
    teal: 'rgba(6, 182, 212, 0.12)',
    purple: 'rgba(139, 92, 246, 0.12)',
    magenta: 'rgba(236, 72, 153, 0.12)',
  }

  const orbSize = sizeMap[size]
  const orbColor = colorMap[color]

  return (
    <div
      className={styles.orb}
      style={{
        width: `${orbSize}px`,
        height: `${orbSize}px`,
        background: `radial-gradient(circle, ${orbColor} 0%, transparent 70%)`,
        left: `${position.x}%`,
        top: `${position.y}%`,
        animationDelay: `${delay}s`,
      }}
    />
  )
}
