import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  ShoppingCart,
  Package,
  BarChart3,
  Users,
  Store,
  CreditCard,
  Smartphone,
  Globe,
  Shield,
} from 'lucide-react'
import { gsap } from '../utils/gsapConfig'
import { useFadeScale } from '../hooks/useScrollAnimations'
import styles from './Features.module.css'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

const features: Feature[] = [
  {
    icon: <ShoppingCart />,
    title: 'Lightning-Fast POS',
    description: 'Process sales in seconds with our intuitive point-of-sale interface. Barcode scanning, quick product search, and seamless checkout.',
    color: '#14B8A6',
  },
  {
    icon: <Package />,
    title: 'Smart Inventory',
    description: 'Real-time stock tracking, low-stock alerts, automated reordering, and multi-location inventory management.',
    color: '#3B82F6',
  },
  {
    icon: <BarChart3 />,
    title: 'Advanced Analytics',
    description: 'Comprehensive reports on sales, profit margins, top products, and customer trends. Make data-driven decisions.',
    color: '#A855F7',
  },
  {
    icon: <Users />,
    title: 'Team Management',
    description: 'Role-based access control, staff performance tracking, and shift management. Keep your team organized.',
    color: '#EC4899',
  },
  {
    icon: <Store />,
    title: 'Multi-Store Support',
    description: 'Manage multiple locations from one dashboard. Transfer stock between stores and view consolidated reports.',
    color: '#F59E0B',
  },
  {
    icon: <CreditCard />,
    title: 'Payment Flexibility',
    description: 'Accept cash, cards, and digital payments. Track payment methods and reconcile transactions effortlessly.',
    color: '#10B981',
  },
  {
    icon: <Smartphone />,
    title: 'Mobile Ready',
    description: 'Access your business from anywhere. Fully responsive design works on desktop, tablet, and mobile.',
    color: '#6366F1',
  },
  {
    icon: <Globe />,
    title: 'Multi-Language',
    description: 'Support for multiple languages and currencies. Perfect for international businesses.',
    color: '#8B5CF6',
  },
  {
    icon: <Shield />,
    title: 'Secure & Reliable',
    description: 'Bank-level encryption, automated backups, and 99.9% uptime. Your data is safe with us.',
    color: '#EF4444',
  },
]

export default function Features() {
  const gridRef = useRef<HTMLDivElement>(null)
  const headerRef = useFadeScale<HTMLDivElement>({ scale: 0.9, duration: 1 })

  useEffect(() => {
    if (!gridRef.current) return

    const cards = gridRef.current.querySelectorAll(`.${styles.featureCard}`)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 60,
          scale: 0.8,
          rotateX: -30
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: {
            amount: 0.6,
            from: 'start',
            ease: 'power2.out'
          },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.features} id="features">
      <div className={styles.container}>
        <div className={styles.header} ref={headerRef}>
          <h2>Everything You Need to Run Your Retail Business</h2>
          <p>Powerful features designed to simplify operations and boost your sales</p>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={styles.featureCard}
              style={{ perspective: '1000px' }}
            >
              <div
                className={styles.iconWrapper}
                style={{ background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}dd 100%)` }}
              >
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
