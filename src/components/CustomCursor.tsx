import { useEffect, useRef } from 'react'
import { gsap } from '../utils/gsapConfig'
import styles from './CustomCursor.module.css'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    // Check if device supports hover (desktop)
    const hasHover = window.matchMedia('(hover: hover)').matches
    if (!hasHover) {
      cursor.style.display = 'none'
      follower.style.display = 'none'
      return
    }

    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: 'power2.out'
      })

      gsap.to(follower, {
        x: mouseX,
        y: mouseY,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Expand cursor on interactive elements
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('magnetic') ||
        target.closest('a') ||
        target.closest('button')
      ) {
        gsap.to(cursor, {
          scale: 0.5,
          duration: 0.3,
          ease: 'power2.out'
        })
        gsap.to(follower, {
          scale: 1.5,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
      gsap.to(follower, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseDown = () => {
      gsap.to([cursor, follower], {
        scale: 0.9,
        duration: 0.1
      })
    }

    const handleMouseUp = () => {
      gsap.to([cursor, follower], {
        scale: 1,
        duration: 0.1
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className={styles.cursor} />
      <div ref={followerRef} className={styles.follower} />
    </>
  )
}
