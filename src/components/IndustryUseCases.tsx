import { motion } from 'framer-motion'
import { Coffee, Shirt, ShoppingCart } from 'lucide-react'
import styles from './IndustryUseCases.module.css'

const industries = [
  {
    icon: Coffee,
    name: 'Café & Coffee Shops',
    description: 'Perfect for high-volume quick service',
    features: [
      'Lightning-fast checkout under 30 seconds',
      'Custom modifiers for drinks (size, milk, shots)',
      'Table management and order tracking',
      'Loyalty programs for regulars'
    ],
    color: '#8B4513'
  },
  {
    icon: Shirt,
    name: 'Boutique & Fashion',
    description: 'Elegant solution for apparel retail',
    features: [
      'Size and color variant tracking',
      'Seasonal inventory management',
      'Customer wish lists and layaway',
      'Visual merchandising reports'
    ],
    color: '#E91E63'
  },
  {
    icon: ShoppingCart,
    name: 'Grocery & Convenience',
    description: 'Built for everyday essentials',
    features: [
      'Barcode scanning for rapid checkout',
      'Weight-based pricing for produce',
      'Expiration date tracking',
      'Age verification for restricted items'
    ],
    color: '#4CAF50'
  }
]

export default function IndustryUseCases() {
  return (
    <section className={styles.industries}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Built for Every Type of Retail</h2>
          <p>Tailored features for your specific industry needs</p>
        </motion.div>

        <div className={styles.grid}>
          {industries.map((industry, index) => {
            const Icon = industry.icon
            return (
              <motion.div
                key={industry.name}
                className={styles.industryCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className={styles.iconWrapper} style={{ backgroundColor: `${industry.color}15`, color: industry.color }}>
                  <Icon className={styles.icon} />
                </div>
                <h3>{industry.name}</h3>
                <p className={styles.description}>{industry.description}</p>
                <ul className={styles.featureList}>
                  {industry.features.map((feature, idx) => (
                    <li key={idx}>
                      <span className={styles.checkmark} style={{ color: industry.color }}>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="#demo" className={styles.learnMore} style={{ color: industry.color }}>
                  Learn More →
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
