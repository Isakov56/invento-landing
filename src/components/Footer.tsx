import { Heart } from 'lucide-react'
import styles from './Footer.module.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>Invento</div>
            <p className={styles.tagline}>
              Modern POS & Inventory Management for retail businesses.
              Streamline operations, boost sales, and delight customers.
            </p>
          </div>

          <div className={styles.links}>
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#demo">Demo</a></li>
              <li><a href="/register">Get Started</a></li>
            </ul>
          </div>

          <div className={styles.links}>
            <h4>Company</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/careers">Careers</a></li>
            </ul>
          </div>

          <div className={styles.links}>
            <h4>Legal</h4>
            <ul>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/security">Security</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} Invento. All rights reserved.
          </p>
          <p className={styles.madeWith}>
            Made with <Heart className={styles.heart} /> for retail businesses
          </p>
        </div>
      </div>
    </footer>
  )
}
