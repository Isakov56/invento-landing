import { useEffect, useRef } from 'react'
import { gsap } from '../utils/gsapConfig'

/**
 * Image reveal animation with clip-path
 */
export function useImageReveal<T extends HTMLElement = HTMLElement>(
  direction: 'left' | 'right' | 'top' | 'bottom' = 'bottom'
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    const clipPaths: Record<typeof direction, [string, string]> = {
      left: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'],
      right: ['inset(0 0 0 100%)', 'inset(0 0 0 0%)'],
      top: ['inset(100% 0 0 0)', 'inset(0% 0 0 0)'],
      bottom: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)']
    }

    const [from, to] = clipPaths[direction]

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { clipPath: from },
        {
          clipPath: to,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    return () => ctx.revert()
  }, [direction])

  return ref
}

/**
 * Parallax effect on scroll
 */
export function useParallax<T extends HTMLElement = HTMLElement>(
  speed: number = 0.5
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: () => window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current?.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })
    })

    return () => ctx.revert()
  }, [speed])

  return ref
}

/**
 * Fade in and scale up on scroll
 */
export function useFadeScale<T extends HTMLElement = HTMLElement>(
  options: {
    scale?: number
    duration?: number
    delay?: number
  } = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          scale: options.scale || 0.8
        },
        {
          opacity: 1,
          scale: 1,
          duration: options.duration || 1,
          delay: options.delay || 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    return () => ctx.revert()
  }, [options.scale, options.duration, options.delay])

  return ref
}

/**
 * 3D card tilt effect
 */
export function use3DTilt<T extends HTMLElement = HTMLElement>(
  strength: number = 15
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -strength
      const rotateY = ((x - centerX) / centerX) * strength

      gsap.to(element, {
        rotateX,
        rotateY,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1000
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out'
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength])

  return ref
}
