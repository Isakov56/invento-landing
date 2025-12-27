import { motion } from 'framer-motion'
import { Shield, Lock, Database, Activity, FileCheck, Clock } from 'lucide-react'
import styles from './SecurityCompliance.module.css'

const securityFeatures = [
  {
    icon: Lock,
    title: 'Bank-Level Encryption',
    description: '256-bit SSL encryption protects all data transmission and storage'
  },
  {
    icon: Shield,
    title: 'PCI DSS Compliant',
    description: 'Fully certified for secure payment card processing'
  },
  {
    icon: FileCheck,
    title: 'GDPR Ready',
    description: 'Complete data privacy compliance for European customers'
  },
  {
    icon: Database,
    title: 'Daily Backups',
    description: 'Automatic daily backups with 30-day retention policy'
  },
  {
    icon: Clock,
    title: '99.9% Uptime SLA',
    description: 'Enterprise-grade reliability with redundant infrastructure'
  },
  {
    icon: Activity,
    title: '24/7 Monitoring',
    description: 'Round-the-clock security monitoring and threat detection'
  }
]

export default function SecurityCompliance() {
  return (
    <section className={styles.security}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.badge}>
            <Shield className={styles.badgeIcon} />
            <span>Enterprise Security</span>
          </div>
          <h2>Your Data is Safe with Us</h2>
          <p>Industry-leading security and compliance standards built into every feature</p>
        </motion.div>

        <div className={styles.grid}>
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                className={styles.featureCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={styles.iconWrapper}>
                  <Icon className={styles.icon} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className={styles.certifications}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className={styles.certText}>
            Certified and audited by leading security organizations
          </p>
          <div className={styles.certBadges}>
            <div className={styles.certBadge}>SOC 2 Type II</div>
            <div className={styles.certBadge}>ISO 27001</div>
            <div className={styles.certBadge}>PCI DSS Level 1</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
