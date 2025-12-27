import { useEffect, useRef } from 'react'
import { gsap } from '../utils/gsapConfig'

export function useTextReveal<T extends HTMLElement = HTMLElement>(
  options: {
    stagger?: number
    duration?: number
    ease?: string
    start?: string
  } = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    const text = element.textContent || ''

    // Split text into words and wrap each in a span
    const words = text.split(' ')
    element.innerHTML = words
      .map(word => `<span class="word-wrapper"><span class="word">${word}</span></span>`)
      .join(' ')

    const wordElements = element.querySelectorAll('.word')

    // Set initial state
    gsap.set(wordElements, {
      opacity: 0,
      y: 30,
      rotateX: -90,
    })

    // Animate on scroll
    const ctx = gsap.context(() => {
      gsap.to(wordElements, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: options.duration || 0.8,
        stagger: options.stagger || 0.05,
        ease: options.ease || 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: options.start || 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })
    })

    return () => ctx.revert()
  }, [options.duration, options.stagger, options.ease, options.start])

  return ref
}

export function useLineReveal<T extends HTMLElement = HTMLElement>(
  options: {
    stagger?: number
    duration?: number
    ease?: string
  } = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    const text = element.textContent || ''

    // Split into lines
    const lines = text.split('\n').filter(line => line.trim())
    element.innerHTML = lines
      .map(line => `<div class="line-wrapper"><div class="line">${line}</div></div>`)
      .join('')

    const lineElements = element.querySelectorAll('.line')

    gsap.set(lineElements, {
      opacity: 0,
      y: 50
    })

    const ctx = gsap.context(() => {
      gsap.to(lineElements, {
        opacity: 1,
        y: 0,
        duration: options.duration || 1,
        stagger: options.stagger || 0.1,
        ease: options.ease || 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })
    })

    return () => ctx.revert()
  }, [options.duration, options.stagger, options.ease])

  return ref
}
