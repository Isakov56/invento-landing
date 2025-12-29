import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '../utils/gsapConfig'
import styles from './IntegrationShowcase.module.css'

const integrations = [
  { name: 'Stripe', category: 'Payments', color: '#635BFF' },
  { name: 'Square', category: 'Payments', color: '#000000' },
  { name: 'PayPal', category: 'Payments', color: '#003087' },
  { name: 'QuickBooks', category: 'Accounting', color: '#2CA01C' },
  { name: 'Xero', category: 'Accounting', color: '#13B5EA' },
  { name: 'Shopify', category: 'E-commerce', color: '#95BF47' },
  { name: 'WooCommerce', category: 'E-commerce', color: '#96588A' },
  { name: 'Mailchimp', category: 'Marketing', color: '#FFE01B' },
  { name: 'Slack', category: 'Communication', color: '#4A154B' },
  { name: 'Zapier', category: 'Automation', color: '#FF4A00' },
  { name: 'Google Workspace', category: 'Productivity', color: '#4285F4' },
  { name: 'Microsoft 365', category: 'Productivity', color: '#D83B01' }
]

export default function IntegrationShowcase() {
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (carouselRef.current) {
      const carousel = carouselRef.current
      const cards = Array.from(carousel.children) as HTMLElement[]

      // Calculate total width for seamless loop
      const totalWidth = cards.reduce((acc, card) => acc + card.offsetWidth + 32, 0) // 32 = gap

      // Create seamless infinite loop (moves left continuously)
      const animation = gsap.to(carousel, {
        x: -totalWidth / 2,
        duration: 30,
        ease: 'none',
        repeat: -1
      })

      // Slow down on hover
      const handleMouseEnter = () => {
        gsap.to(animation, { timeScale: 0.2, duration: 0.5 })
      }

      const handleMouseLeave = () => {
        gsap.to(animation, { timeScale: 1, duration: 0.5 })
      }

      carousel.addEventListener('mouseenter', handleMouseEnter)
      carousel.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        carousel.removeEventListener('mouseenter', handleMouseEnter)
        carousel.removeEventListener('mouseleave', handleMouseLeave)
        animation.kill()
      }
    }
  }, [])

  return (
    <section className={styles.integrations}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Seamless Integrations</h2>
          <p>Connect with the tools your business already uses</p>
        </motion.div>

        <div className={styles.carouselWrapper}>
          <div className={styles.carousel} ref={carouselRef}>
            {[...integrations, ...integrations].map((integration, index) => (
              <div
                key={`${integration.name}-${index}`}
                className={styles.integrationCard}
                style={{ borderColor: integration.color }}
              >
                <div className={styles.integrationIcon} style={{ backgroundColor: `${integration.color}15`, color: integration.color }}>
                  {integration.name.charAt(0)}
                </div>
                <div className={styles.integrationInfo}>
                  <h4>{integration.name}</h4>
                  <p>{integration.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className={styles.footer}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p>Plus hundreds more integrations through our API and Zapier</p>
          <a href="/integrations" className={styles.viewAll}>View All Integrations →</a>
        </motion.div>
      </div>
    </section>
  )
}
