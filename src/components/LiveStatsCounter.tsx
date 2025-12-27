import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Activity, Users, DollarSign, Zap } from 'lucide-react'
import { gsap } from '../utils/gsapConfig'
import styles from './LiveStatsCounter.module.css'

const stats = [
  {
    icon: Zap,
    label: 'Transactions Today',
    value: 1247,
    suffix: '',
    color: '#F59E0B'
  },
  {
    icon: Users,
    label: 'Active Users',
    value: 8432,
    suffix: '',
    color: '#10B981'
  },
  {
    icon: DollarSign,
    label: 'Revenue Processed',
    value: 2840000,
    prefix: '$',
    suffix: '',
    color: '#8B5CF6'
  },
  {
    icon: Activity,
    label: 'System Uptime',
    value: 99.98,
    suffix: '%',
    color: '#06B6D4'
  }
]

export default function LiveStatsCounter() {
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    counterRefs.current.forEach((counter, index) => {
      if (counter) {
        const stat = stats[index]
        const targetValue = stat.value

        gsap.fromTo(
          counter,
          { innerText: 0 },
          {
            innerText: targetValue,
            duration: 2.5,
            ease: 'power2.out',
            snap: { innerText: stat.suffix === '%' ? 0.01 : 1 },
            scrollTrigger: {
              trigger: counter,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            },
            onUpdate: function () {
              const value = gsap.getProperty(counter, 'innerText') as number
              if (stat.prefix) {
                counter.innerText = stat.prefix + formatNumber(value, stat.suffix === '%')
              } else {
                counter.innerText = formatNumber(value, stat.suffix === '%') + stat.suffix
              }
            }
          }
        )
      }
    })
  }, [])

  const formatNumber = (num: number, isPercentage: boolean) => {
    if (isPercentage) {
      return num.toFixed(2)
    }
    return Math.floor(num).toLocaleString()
  }

  return (
    <section className={styles.liveStats}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.badge}>
            <Activity className={styles.badgeIcon} />
            <span>Real-Time Analytics</span>
          </div>
          <h2>Live Performance Metrics</h2>
          <p>Watch your business thrive in real-time across our platform</p>
        </motion.div>

        <div className={styles.statsGrid}>
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                className={styles.statCard}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={styles.iconWrapper} style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                  <Icon className={styles.icon} />
                </div>
                <div className={styles.statValue}>
                  <span ref={el => counterRefs.current[index] = el} className={styles.number}>
                    0
                  </span>
                </div>
                <div className={styles.statLabel}>{stat.label}</div>
                <div className={styles.pulse} style={{ backgroundColor: stat.color }}></div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
