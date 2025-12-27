import { useEffect, useRef, RefObject, DependencyList } from 'react'
import { gsap, ScrollTrigger } from '../utils/gsapConfig'

/**
 * Custom hook for managing GSAP animations in React components
 * Automatically cleans up animations and ScrollTriggers on unmount
 */
export function useGSAP<T extends HTMLElement = HTMLDivElement>(
  callback: (context: { ref: RefObject<T>; gsap: typeof gsap }) => void | (() => void),
  dependencies: DependencyList = []
): RefObject<T> {
  const ref = useRef<T>(null)
  const cleanupRef = useRef<(() => void) | void>()

  useEffect(() => {
    const context = { ref, gsap }

    // Execute the callback and store any cleanup function
    cleanupRef.current = callback(context)

    // Cleanup function
    return () => {
      // Call the cleanup function if it exists
      if (typeof cleanupRef.current === 'function') {
        cleanupRef.current()
      }

      // Kill all ScrollTriggers associated with this element
      if (ref.current) {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.trigger === ref.current || trigger.vars.trigger === ref.current) {
            trigger.kill()
          }
        })
      }

      // Kill any GSAP animations on this element
      if (ref.current) {
        gsap.killTweensOf(ref.current)
      }
    }
  }, dependencies) // eslint-disable-line react-hooks/exhaustive-deps

  return ref
}

/**
 * Hook specifically for ScrollTrigger animations
 */
export function useScrollTrigger<T extends HTMLElement = HTMLDivElement>(
  callback: (context: { ref: RefObject<T>; gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger }) => void | (() => void),
  dependencies: DependencyList = []
): RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const context = { ref, gsap, ScrollTrigger }
    const cleanup = callback(context)

    return () => {
      if (typeof cleanup === 'function') {
        cleanup()
      }

      if (ref.current) {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.trigger === ref.current || trigger.vars.trigger === ref.current) {
            trigger.kill()
          }
        })
      }
    }
  }, dependencies) // eslint-disable-line react-hooks/exhaustive-deps

  return ref
}

/**
 * Hook for creating responsive GSAP animations
 */
export function useResponsiveGSAP<T extends HTMLElement = HTMLDivElement>(
  callback: (context: { ref: RefObject<T>; gsap: typeof gsap; mm: gsap.MatchMedia }) => void | (() => void),
  dependencies: DependencyList = []
): RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    const context = { ref, gsap, mm }
    const cleanup = callback(context)

    return () => {
      if (typeof cleanup === 'function') {
        cleanup()
      }
      mm.revert()
    }
  }, dependencies) // eslint-disable-line react-hooks/exhaustive-deps

  return ref
}
