import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Package, BarChart3, Building2, Users, CreditCard, UserCircle, FileDown, Smartphone, Shield } from 'lucide-react'
import { gsap, ScrollTrigger } from '../utils/gsapConfig'
import styles from './FeatureShowcase.module.css'

const features = [
  {
    icon: Zap,
    title: 'Lightning-Fast POS',
    description: 'Process transactions in under 3 seconds with barcode scanning, quick search, and one-tap checkout.',
    color: '#F59E0B'
  },
  {
    icon: Package,
    title: 'Smart Inventory',
    description: 'Real-time stock tracking, low-stock alerts, automatic reordering, and multi-location inventory sync.',
    color: '#8B5CF6'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Visual dashboards, sales trends, profit margins, and AI-powered insights to grow your business.',
    color: '#06B6D4'
  },
  {
    icon: Building2,
    title: 'Multi-Store Management',
    description: 'Manage unlimited locations from one dashboard. Transfer inventory and view consolidated reports.',
    color: '#10B981'
  },
  {
    icon: Users,
    title: 'Team Management',
    description: 'Role-based permissions, shift tracking, performance analytics, and secure staff access controls.',
    color: '#EF4444'
  },
  {
    icon: CreditCard,
    title: 'Payment Processing',
    description: 'Accept all payment types: cards, mobile wallets, contactless, and split payments seamlessly.',
    color: '#2563EB'
  },
  {
    icon: UserCircle,
    title: 'Customer Management',
    description: 'Build customer profiles, loyalty programs, purchase history, and personalized marketing campaigns.',
    color: '#EC4899'
  },
  {
    icon: FileDown,
    title: 'Reports & Exports',
    description: 'Generate detailed reports, export to CSV/PDF, schedule automated reports, and share with stakeholders.',
    color: '#F97316'
  },
  {
    icon: Smartphone,
    title: 'Mobile App',
    description: 'iOS and Android apps for on-the-go management. Sell anywhere with offline mode and cloud sync.',
    color: '#14B8A6'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level encryption, PCI compliance, daily backups, 2FA, and audit logs for complete peace of mind.',
    color: '#6366F1'
  }
]

export default function FeatureShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)
  const scrollableAreaRef = useRef<HTMLDivElement>(null)
  const isHoveringRef = useRef(false)
  const autoScrollRef = useRef<gsap.core.Tween | null>(null)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const scrollStartXRef = useRef(0)
  const maxScrollRef = useRef(0)

  useEffect(() => {
    if (!horizontalRef.current || !scrollableAreaRef.current) return

    const horizontal = horizontalRef.current
    const scrollableArea = scrollableAreaRef.current

    // Only apply on desktop
    const mm = gsap.matchMedia()

    // Reset transform when switching to mobile
    mm.add('(max-width: 1023px)', () => {
      // Kill any running animations
      if (autoScrollRef.current) {
        autoScrollRef.current.kill()
        autoScrollRef.current = null
      }
      gsap.set(horizontal, { clearProps: 'x' })
    })

    mm.add('(min-width: 1024px)', () => {
      // Kill any existing animations before starting new ones
      if (autoScrollRef.current) {
        autoScrollRef.current.kill()
        autoScrollRef.current = null
      }

      // Reset transform when entering desktop mode
      gsap.set(horizontal, { x: 0 })

      const calculateBounds = () => {
        // Query cards fresh each time to get current dimensions
        const cards = horizontal.querySelectorAll(`.${styles.featureCard}`)
        if (cards.length === 0) return 0

        const cardWidth = (cards[0] as HTMLElement)?.offsetWidth || 400
        const gap = 32
        const totalWidth = (cardWidth + gap) * cards.length
        const viewportWidth = window.innerWidth
        const padding = 100

        // Calculate max scroll (should always be 0 or negative)
        const maxScroll = -(totalWidth - viewportWidth + padding)

        // Safety check: if content is smaller than viewport, don't allow scrolling
        if (totalWidth <= viewportWidth) {
          return 0
        }

        // Ensure maxScroll is never positive
        return Math.min(0, maxScroll)
      }

      // Recalculate on window resize
      const handleResize = () => {
        maxScrollRef.current = calculateBounds()
        const currentX = gsap.getProperty(horizontal, 'x') as number

        // Kill existing animation
        if (autoScrollRef.current) {
          autoScrollRef.current.kill()
          autoScrollRef.current = null
        }

        // Clamp current position to new bounds
        if (currentX < maxScrollRef.current) {
          gsap.set(horizontal, { x: maxScrollRef.current })
        } else if (currentX > 0) {
          gsap.set(horizontal, { x: 0 })
        }

        // Only restart auto-scroll if we have valid bounds (content wider than viewport)
        if (maxScrollRef.current < 0) {
          autoScrollRef.current = gsap.to(horizontal, {
            x: maxScrollRef.current,
            duration: 50,
            ease: 'none',
            repeat: -1,
            yoyo: true
          })
        } else {
          // If content fits in viewport, reset to 0
          gsap.set(horizontal, { x: 0 })
        }
      }

      // Wait for layout to settle after mode switch, then initialize
      let rafId: number
      let timeoutId: number

      const initializeScroll = () => {
        // Force layout recalculation
        void horizontal.offsetHeight

        maxScrollRef.current = calculateBounds()

        // Only start auto-scroll if we have valid bounds
        if (maxScrollRef.current < 0) {
          autoScrollRef.current = gsap.to(horizontal, {
            x: maxScrollRef.current,
            duration: 50, // 50 seconds for full scroll
            ease: 'none',
            repeat: -1, // Infinite loop
            yoyo: true // Scroll back and forth
          })
        }
      }

      // Use RAF + timeout to ensure CSS has fully applied
      requestAnimationFrame(() => {
        rafId = requestAnimationFrame(() => {
          timeoutId = window.setTimeout(initializeScroll, 50)
        })
      })

      window.addEventListener('resize', handleResize)

      // Add wheel event listener to the ENTIRE scrollable area, not just cards
      const handleWheelEvent = (e: WheelEvent) => {
        if (!isHoveringRef.current) return

        const currentTransform = gsap.getProperty(horizontal, 'x') as number
        const newX = currentTransform - e.deltaY * 1.2

        // Check if we've reached the boundaries
        const atStart = currentTransform >= 0 && e.deltaY < 0
        const atEnd = currentTransform <= maxScrollRef.current && e.deltaY > 0

        // If at boundaries, allow normal vertical scroll
        if (atStart || atEnd) {
          return // Don't prevent default, allow page scroll
        }

        // Otherwise, prevent default and do horizontal scroll
        e.preventDefault()
        e.stopPropagation()

        const clampedX = Math.max(maxScrollRef.current, Math.min(0, newX))

        gsap.to(horizontal, {
          x: clampedX,
          duration: 0.15,
          ease: 'power2.out',
          overwrite: true // Kill any competing animations
        })
      }

      // Attach to scrollableArea, not horizontal
      scrollableArea.addEventListener('wheel', handleWheelEvent, { passive: false })

      // Drag-to-scroll functionality
      const handleMouseDown = (e: MouseEvent) => {
        if (!isHoveringRef.current) return

        isDraggingRef.current = true
        dragStartXRef.current = e.clientX
        scrollStartXRef.current = gsap.getProperty(horizontal, 'x') as number

        scrollableArea.style.cursor = 'grabbing'
        e.preventDefault()
      }

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDraggingRef.current) return

        const deltaX = e.clientX - dragStartXRef.current
        const newX = Math.max(maxScrollRef.current, Math.min(0, scrollStartXRef.current + deltaX))

        gsap.set(horizontal, {
          x: newX,
          overwrite: true
        })
      }

      const handleMouseUp = () => {
        if (isDraggingRef.current) {
          isDraggingRef.current = false
          scrollableArea.style.cursor = 'grab'
        }
      }

      scrollableArea.addEventListener('mousedown', handleMouseDown)
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)

      return () => {
        if (rafId) cancelAnimationFrame(rafId)
        if (timeoutId) clearTimeout(timeoutId)
        window.removeEventListener('resize', handleResize)
        scrollableArea.removeEventListener('wheel', handleWheelEvent)
        scrollableArea.removeEventListener('mousedown', handleMouseDown)
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        if (autoScrollRef.current) {
          autoScrollRef.current.kill()
          autoScrollRef.current = null
        }
      }
    })

    return () => {
      mm.revert()
    }
  }, [])

  // Handle hover state
  const handleMouseEnter = () => {
    isHoveringRef.current = true
    if (autoScrollRef.current) {
      autoScrollRef.current.kill() // Kill completely when hovering
    }
  }

  const handleMouseLeave = () => {
    isHoveringRef.current = false
    isDraggingRef.current = false // Stop dragging when leaving

    if (!horizontalRef.current || !scrollableAreaRef.current) return

    const scrollableArea = scrollableAreaRef.current
    scrollableArea.style.cursor = 'grab' // Reset cursor

    // Get current position
    const currentPos = gsap.getProperty(horizontalRef.current, 'x') as number

    // Kill old animation
    if (autoScrollRef.current) {
      autoScrollRef.current.kill()
    }

    // Use the ref value for maxScroll
    const horizontal = horizontalRef.current
    const maxScroll = maxScrollRef.current

    // Determine direction based on current position
    // If closer to start, scroll to end. If closer to end, scroll to start
    const midPoint = maxScroll / 2
    const targetX = currentPos > midPoint ? maxScroll : 0
    const distance = Math.abs(targetX - currentPos)
    const totalDistance = Math.abs(maxScroll)

    // Calculate duration based on remaining distance (maintain same speed)
    const baseDuration = 50 // Same as original
    const duration = (distance / totalDistance) * baseDuration

    // Restart auto-scroll from current position
    autoScrollRef.current = gsap.to(horizontal, {
      x: targetX,
      duration: duration,
      ease: 'none',
      overwrite: true,
      onComplete: () => {
        // When reaching the end, restart the yoyo loop
        autoScrollRef.current = gsap.to(horizontal, {
          x: targetX === 0 ? maxScroll : 0,
          duration: baseDuration,
          ease: 'none',
          repeat: -1,
          yoyo: true,
          overwrite: true
        })
      }
    })
  }

  return (
    <section className={styles.featureShowcase} ref={containerRef} id="features">
      <div className={styles.stickyContainer}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Everything You Need to Run Your Business</h2>
          <p className={styles.scrollHint}>✨ Auto-scrolling • Hover & scroll to explore</p>
        </motion.div>

        <div
          className={styles.scrollableArea}
          ref={scrollableAreaRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={styles.horizontalScroll} ref={horizontalRef}>
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                className={styles.featureCard}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -10 }}
              >
                <div className={styles.iconWrapper} style={{ backgroundColor: `${feature.color}15`, color: feature.color }}>
                  <Icon className={styles.icon} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className={styles.cardNumber} style={{ color: feature.color }}>
                  {(index + 1).toString().padStart(2, '0')}
                </div>
              </motion.div>
            )
          })}
          </div>
        </div>
      </div>
    </section>
  )
}
