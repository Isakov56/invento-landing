import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Navbar.module.css'

interface NavbarProps {
  showDemoSidebar: boolean
  setShowDemoSidebar: (show: boolean) => void
}

export default function Navbar({ setShowDemoSidebar }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDemoInView, setIsDemoInView] = useState(false)

  useEffect(() => {
    const demoSection = document.getElementById('demo')
    if (!demoSection) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDemoInView(entry.isIntersecting)
      },
      {
        threshold: 0.3, // Trigger when 30% of demo section is visible
        rootMargin: '-80px 0px 0px 0px' // Account for navbar height
      }
    )

    observer.observe(demoSection)

    return () => {
      observer.disconnect()
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  const handleMenuButtonClick = () => {
    if (isDemoInView) {
      // On mobile, when demo is in view, open demo sidebar
      setShowDemoSidebar(true)
    } else {
      // Otherwise, toggle regular mobile menu
      setIsMenuOpen(!isMenuOpen)
    }
  }

  return (
    <nav className={`${styles.nav} ${isDemoInView ? styles.navDemoMode : ''}`}>
      <div className={styles.container}>
        <div className={styles.logoWrapper}>
          <div className={styles.logo}>Invento</div>
          <AnimatePresence>
            {isDemoInView && (
              <motion.div
                className={styles.demoBadge}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <span className={styles.demoBadgeText}>DEMO</span>
                <motion.div
                  className={styles.demoPulse}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Menu - Hidden in demo mode */}
        {!isDemoInView && (
          <>
            <ul className={styles.navLinks}>
              <li><a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features') }}>Features</a></li>
              <li><a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToSection('pricing') }}>Pricing</a></li>
              <li><a href="#demo" onClick={(e) => { e.preventDefault(); scrollToSection('demo') }}>Demo</a></li>
            </ul>

            <a href="/login" className={styles.ctaButton}>Get Started Free</a>
          </>
        )}

        {/* Mobile Menu Button */}
        <button className={styles.menuButton} onClick={handleMenuButtonClick}>
          {isMenuOpen && !isDemoInView ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu - Only show when not in demo view */}
      {isMenuOpen && !isDemoInView && (
        <div className={styles.mobileMenu}>
          <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features') }}>Features</a>
          <a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToSection('pricing') }}>Pricing</a>
          <a href="#demo" onClick={(e) => { e.preventDefault(); scrollToSection('demo') }}>Demo</a>
          <a href="/login" className={styles.mobileCtaButton}>Get Started Free</a>
        </div>
      )}
    </nav>
  )
}
