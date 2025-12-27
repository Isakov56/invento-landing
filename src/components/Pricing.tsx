import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { use3DTilt } from '../hooks/useScrollAnimations'
import styles from './Pricing.module.css'

interface PricingTier {
  name: string
  price: number
  popular?: boolean
  features: string[]
  cta: string
  link: string
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Basic',
    price: 15,
    features: [
      'Single Store Management',
      'Unlimited Products',
      'Basic Inventory Tracking',
      'Sales Reports',
      'Email Support',
      'Mobile Access',
      'Multi-Language Support',
      '14-Day Free Trial',
    ],
    cta: 'Start Free Trial',
    link: '/register',
  },
  {
    name: 'Premium',
    price: 20,
    popular: true,
    features: [
      'Everything in Basic',
      'Multi-Store Support',
      'Advanced Analytics',
      'Team Management',
      'Role-Based Access',
      'Priority Support',
      'Custom Reports',
      'API Access',
      'Automated Inventory',
      'Customer Management',
    ],
    cta: 'Start Free Trial',
    link: '/register',
  },
]

function PricingCard({ tier, index }: { tier: PricingTier; index: number }) {
  const tiltRef = use3DTilt<HTMLDivElement>(10)

  return (
    <motion.div
      ref={tiltRef}
      className={`${styles.pricingCard} ${tier.popular ? styles.popular : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {tier.popular && (
        <div className={styles.badge}>
          <Sparkles size={16} />
          Most Popular
        </div>
      )}

      <div className={styles.tierHeader}>
        <h3>{tier.name}</h3>
        <div className={styles.price}>
          <span className={styles.currency}>$</span>
          <span className={styles.amount}>{tier.price}</span>
          <span className={styles.period}>/month</span>
        </div>
      </div>

      <ul className={styles.features}>
        {tier.features.map((feature, idx) => (
          <li key={idx}>
            <Check className={styles.checkIcon} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a href={tier.link} className={styles.ctaButton}>
        {tier.cta}
      </a>
    </motion.div>
  )
}

export default function Pricing() {
  return (
    <section className={styles.pricing} id="pricing">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Simple, Transparent Pricing</h2>
          <p>No hidden fees. No surprises. Cancel anytime.</p>
        </motion.div>

        <div className={styles.grid}>
          {pricingTiers.map((tier, index) => (
            <PricingCard key={tier.name} tier={tier} index={index} />
          ))}
        </div>

        <motion.div
          className={styles.note}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p>All plans include 14-day free trial. No credit card required.</p>
        </motion.div>
      </div>
    </section>
  )
}
