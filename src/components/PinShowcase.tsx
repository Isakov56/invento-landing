import { useEffect, useRef, useState } from 'react'
import { gsap } from '../utils/gsapConfig'
import { Zap, TrendingUp, Shield, Globe } from 'lucide-react'
import styles from './PinShowcase.module.css'

const showcaseSteps = [
  {
    id: 1,
    icon: <Zap size={48} />,
    title: 'Lightning Fast',
    subtitle: 'Process sales in under 3 seconds',
    color: '#14B8A6',
    stat: '3s',
    statLabel: 'Average checkout time'
  },
  {
    id: 2,
    icon: <TrendingUp size={48} />,
    title: 'Boost Revenue',
    subtitle: 'Data-driven insights to grow your business',
    color: '#3B82F6',
    stat: '+42%',
    statLabel: 'Average revenue increase'
  },
  {
    id: 3,
    icon: <Shield size={48} />,
    title: 'Bank-Level Security',
    subtitle: 'Your data is encrypted and protected',
    color: '#A855F7',
    stat: '99.9%',
    statLabel: 'Uptime guarantee'
  },
  {
    id: 4,
    icon: <Globe size={48} />,
    title: 'Global Ready',
    subtitle: 'Multi-currency and multi-language support',
    color: '#F59E0B',
    stat: '50+',
    statLabel: 'Countries supported'
  }
]

export default function PinShowcase() {
  const containerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return

    const steps = showcaseSteps.length
    const ctx = gsap.context(() => {
      // Pin the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${steps * 100}%`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress
            const step = Math.min(Math.floor(progress * steps), steps - 1)
            setCurrentStep(step)
          }
        }
      })

      // Animate each step
      showcaseSteps.forEach((step, index) => {
        const selector = `[data-step="${index}"]`

        if (index === 0) {
          // First step is visible from start
          tl.set(selector, { opacity: 1, scale: 1, y: 0 }, 0)
        } else {
          // Fade out previous, fade in current
          tl.to(`[data-step="${index - 1}"]`, {
            opacity: 0,
            scale: 0.8,
            y: -50,
            duration: 0.5
          }, index)
          .fromTo(selector, {
            opacity: 0,
            scale: 0.8,
            y: 50
          }, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5
          }, index)
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.pinShowcase} ref={containerRef}>
      <div className={styles.background}>
        {showcaseSteps.map((step, index) => (
          <div
            key={step.id}
            className={styles.backgroundGradient}
            style={{
              background: `radial-gradient(circle at 50% 50%, ${step.color}20 0%, transparent 70%)`,
              opacity: currentStep === index ? 1 : 0,
              transition: 'opacity 0.5s ease'
            }}
          />
        ))}
      </div>

      <div className={styles.content} ref={contentRef}>
        {showcaseSteps.map((step, index) => (
          <div
            key={step.id}
            className={styles.step}
            data-step={index}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0
            }}
          >
            <div className={styles.iconWrapper} style={{ color: step.color }}>
              {step.icon}
            </div>
            <h2>{step.title}</h2>
            <p className={styles.subtitle}>{step.subtitle}</p>
            <div className={styles.stat}>
              <div className={styles.statNumber} style={{ color: step.color }}>
                {step.stat}
              </div>
              <div className={styles.statLabel}>{step.statLabel}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.progressBar}>
        {showcaseSteps.map((step, index) => (
          <div
            key={step.id}
            className={`${styles.progressDot} ${currentStep === index ? styles.active : ''} ${currentStep > index ? styles.completed : ''}`}
          />
        ))}
      </div>

      <div className={styles.scrollHint}>
        <div className={styles.scrollText}>Scroll to explore</div>
        <div className={styles.scrollArrow}>↓</div>
      </div>
    </section>
  )
}
