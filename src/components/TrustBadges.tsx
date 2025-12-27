import { motion } from 'framer-motion'
import styles from './TrustBadges.module.css'

const partners = [
  { name: 'Stripe', color: '#635BFF' },
  { name: 'Square', color: '#000000' },
  { name: 'PayPal', color: '#003087' },
  { name: 'QuickBooks', color: '#2CA01C' },
  { name: 'Xero', color: '#13B5EA' },
  { name: 'Shopify', color: '#95BF47' },
  { name: 'WooCommerce', color: '#96588A' },
  { name: 'Mailchimp', color: '#FFE01B' },
  { name: 'Slack', color: '#4A154B' },
  { name: 'Zapier', color: '#FF4A00' },
  { name: 'Google Pay', color: '#4285F4' },
  { name: 'Apple Pay', color: '#000000' }
]

export default function TrustBadges() {
  return (
    <section className={styles.trustBadges}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Trusted by Industry Leaders</h2>
          <p>Seamlessly integrated with the tools your business already uses</p>
        </motion.div>

        <div className={styles.grid}>
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              className={styles.badgeCard}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className={styles.logoPlaceholder} style={{ borderColor: partner.color }}>
                <span style={{ color: partner.color }}>{partner.name}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.footer}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p>And many more integrations to power your business</p>
        </motion.div>
      </div>
    </section>
  )
}
