import { useEffect, useRef } from 'react'
import { gsap } from '../utils/gsapConfig'

export function useMagneticButton<T extends HTMLElement = HTMLElement>(
  options: {
    strength?: number
    speed?: number
  } = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const button = ref.current
    if (!button) return

    const strength = options.strength || 50
    const speed = options.speed || 0.3

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = (e.clientX - centerX) / (rect.width / 2)
      const deltaY = (e.clientY - centerY) / (rect.height / 2)

      // Check if mouse is within the magnetic field
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      if (distance < 1.5) {
        gsap.to(button, {
          x: deltaX * strength,
          y: deltaY * strength,
          duration: speed,
          ease: 'power2.out'
        })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: speed * 2,
        ease: 'elastic.out(1, 0.5)'
      })
    }

    button.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [options.strength, options.speed])

  return ref
}
