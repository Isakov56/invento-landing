import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Global GSAP defaults
gsap.defaults({
  ease: 'power2.out',
  duration: 0.8,
})

// ScrollTrigger defaults
ScrollTrigger.defaults({
  toggleActions: 'play none none reverse',
  scroller: undefined, // Use window as default
})

// Match media helpers for responsive animations
export const mm = gsap.matchMedia()

// Breakpoints
export const breakpoints = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
}

// Utility function to kill all ScrollTriggers
export const killAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
}

// Refresh ScrollTrigger (useful after layout changes)
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh()
}

// Export gsap and ScrollTrigger for use in components
export { gsap, ScrollTrigger }
