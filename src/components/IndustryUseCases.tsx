import { useEffect, useRef } from 'react'
import { gsap } from '../utils/gsapConfig'
import styles from './IndustryUseCases.module.css'

const industries = [
  {
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=300&fit=crop&q=80',
    name: 'Pharmacy & Drug Store',
    description: 'Specialized system for pharmaceutical retail',
    features: [
      'Prescription management and tracking',
      'Drug expiration alerts and batch tracking',
      'Insurance claim processing integration',
      'Controlled substance monitoring and compliance'
    ],
    color: '#00A86B'
  },
  {
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop&q=80',
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
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&q=80',
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
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=300&fit=crop&q=80',
    name: 'Grocery & Convenience',
    description: 'Built for everyday essentials',
    features: [
      'Barcode scanning for rapid checkout',
      'Weight-based pricing for produce',
      'Expiration date tracking',
      'Age verification for restricted items'
    ],
    color: '#4CAF50'
  },
  {
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop&q=80',
    name: 'Cosmetics & Beauty',
    description: 'Premium solution for beauty retail',
    features: [
      'Shade and variant management',
      'Customer profile and purchase history',
      'Product recommendations engine',
      'Tester inventory tracking'
    ],
    color: '#9C27B0'
  },
  {
    image: 'https://images.unsplash.com/photo-1601524909162-ae8725290836?w=400&h=300&fit=crop&q=80',
    name: 'Electronics Store',
    description: 'Advanced features for tech retail',
    features: [
      'Serial number and warranty tracking',
      'Trade-in and buyback management',
      'Technical specifications database',
      'Extended warranty sales'
    ],
    color: '#2196F3'
  },
  {
    image: 'https://images.unsplash.com/photo-1534237886190-ced735ca4b73?w=400&h=300&fit=crop&q=80',
    name: 'Hardware & Tools',
    description: 'Built for construction supply stores',
    features: [
      'Bulk pricing and contractor accounts',
      'Bin location tracking',
      'Rental equipment management',
      'Special order handling'
    ],
    color: '#FF5722'
  }
]

export default function IndustryUseCases() {
  const gridRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current || !headerRef.current) return

    const cards = gridRef.current.querySelectorAll(`.${styles.industryCard}`)

    const ctx = gsap.context(() => {
      // Animate header
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Professional staggered cards animation - rise from bottom
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: {
            each: 0.12,
            from: 'start',
            ease: 'power2.out'
          },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Add subtle shadow animation on scroll
      gsap.to(
        cards,
        {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          duration: 0.6,
          stagger: {
            each: 0.15,
            from: 'start'
          },
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.industries}>
      <div className={styles.container}>
        <div className={styles.header} ref={headerRef}>
          <h2>Built for Every Type of Retail</h2>
          <p>Tailored features for your specific industry needs</p>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {industries.map((industry) => (
            <div
              key={industry.name}
              className={styles.industryCard}
            >
              <div className={styles.imageWrapper}>
                <img src={industry.image} alt={industry.name} className={styles.industryImage} />
                <div className={styles.imageOverlay} style={{ background: `linear-gradient(to bottom, transparent, ${industry.color}40)` }}></div>
              </div>
              <div className={styles.cardContent}>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
