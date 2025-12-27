import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { UserPlus, Package, TrendingUp, Sparkles } from 'lucide-react'
import { gsap } from '../utils/gsapConfig'
import styles from './HowItWorks.module.css'

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Sign Up',
    description: 'Create your account in 2 minutes. No credit card required for 14-day trial.'
  },
  {
    number: '02',
    icon: Package,
    title: 'Set Up Products',
    description: 'Import your inventory or add products manually. Customize categories and pricing.'
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Start Selling',
    description: 'Begin processing sales immediately. Accept all payment types with ease.'
  },
  {
    number: '04',
    icon: Sparkles,
    title: 'Grow Business',
    description: 'Track analytics, optimize inventory, and scale across multiple locations.'
  }
]

export default function HowItWorks() {
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (pathRef.current) {
      // SVG path drawing animation
      gsap.fromTo(
        pathRef.current,
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: pathRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }
  }, [])

  return (
    <section className={styles.howItWorks}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Get Started in Minutes</h2>
          <p>Four simple steps to transform your retail operations</p>
        </motion.div>

        <div className={styles.stepsContainer}>
          {/* SVG connecting line */}
          <svg className={styles.connectionLine} viewBox="0 0 1200 100" preserveAspectRatio="none">
            <path
              ref={pathRef}
              d="M 0 50 Q 300 10, 400 50 T 800 50 Q 1000 90, 1200 50"
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              strokeDasharray="1000"
              strokeDashoffset="1000"
            />
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--royal-blue)" stopOpacity="0.3" />
                <stop offset="50%" stopColor="var(--royal-blue)" stopOpacity="1" />
                <stop offset="100%" stopColor="var(--royal-blue)" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>

          <div className={styles.steps}>
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  className={styles.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className={styles.stepNumber}>{step.number}</div>
                  <div className={styles.stepIcon}>
                    <Icon />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a href="/register" className={styles.ctaButton}>
            Start Your Free Trial
          </a>
        </motion.div>
      </div>
    </section>
  )
}
