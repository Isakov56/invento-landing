import { useEffect, useRef } from 'react'
import { TrendingUp, Users, Store, Zap } from 'lucide-react'
import { gsap } from '../utils/gsapConfig'
import styles from './Stats.module.css'

interface StatItem {
  icon: React.ReactNode
  value: number
  suffix: string
  label: string
}

const stats: StatItem[] = [
  { icon: <Store />, value: 500, suffix: '+', label: 'Active Stores' },
  { icon: <Users />, value: 5000, suffix: '+', label: 'Happy Users' },
  { icon: <TrendingUp />, value: 99, suffix: '%', label: 'Uptime' },
  { icon: <Zap />, value: 10, suffix: 'x', label: 'Faster Checkout' },
]

function AnimatedCounter({ end }: { end: number }) {
  const countRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!countRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        countRef.current,
        { innerText: 0 },
        {
          innerText: end,
          duration: 2.5,
          ease: 'power2.out',
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: countRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          onUpdate: function () {
            if (countRef.current) {
              const value = gsap.getProperty(countRef.current, 'innerText') as number
              countRef.current.innerText = Math.floor(value).toLocaleString()
            }
          }
        }
      )
    })

    return () => ctx.revert()
  }, [end])

  return <span ref={countRef}>0</span>
}

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const cards = containerRef.current.querySelectorAll(`.${styles.statCard}`)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.stats}>
      <div className={styles.container} ref={containerRef}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.iconWrapper}>
              {stat.icon}
            </div>
            <div className={styles.statValue}>
              <AnimatedCounter end={stat.value} />
              {stat.suffix}
            </div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
