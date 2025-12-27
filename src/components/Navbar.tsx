import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.logo}>Invento</div>

        {/* Desktop Menu */}
        <ul className={styles.navLinks}>
          <li><a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features') }}>Features</a></li>
          <li><a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToSection('pricing') }}>Pricing</a></li>
          <li><a href="#demo" onClick={(e) => { e.preventDefault(); scrollToSection('demo') }}>Demo</a></li>
        </ul>

        <a href="/login" className={styles.ctaButton}>Get Started Free</a>

        {/* Mobile Menu Button */}
        <button className={styles.menuButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
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
