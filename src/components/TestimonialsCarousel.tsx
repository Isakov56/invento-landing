import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { gsap } from '../utils/gsapConfig'
import { testimonials } from '../data/testimonials'
import styles from './TestimonialsCarousel.module.css'

export default function TestimonialsCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (carouselRef.current) {
      const carousel = carouselRef.current
      const cards = Array.from(carousel.children) as HTMLElement[]

      // Create seamless infinite loop
      const totalWidth = cards.reduce((acc, card) => acc + card.offsetWidth + 32, 0) // 32 = gap

      const animation = gsap.to(carousel, {
        x: -totalWidth / 2,
        duration: 60,
        ease: 'none',
        repeat: -1
      })

      // Pause on hover
      const handleMouseEnter = () => {
        gsap.to(animation, { timeScale: 0.3, duration: 0.5 })
      }

      const handleMouseLeave = () => {
        gsap.to(animation, { timeScale: 1, duration: 0.5 })
      }

      carousel.addEventListener('mouseenter', handleMouseEnter)
      carousel.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        carousel.removeEventListener('mouseenter', handleMouseEnter)
        carousel.removeEventListener('mouseleave', handleMouseLeave)
        animation.kill()
      }
    }
  }, [])

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={styles.star}
        fill={index < rating ? '#F59E0B' : 'none'}
        color={index < rating ? '#F59E0B' : '#D1D5DB'}
        size={16}
      />
    ))
  }

  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Loved by Retailers Worldwide</h2>
          <p>See what our customers have to say about Invento</p>
        </motion.div>

        <div className={styles.carouselWrapper}>
          <div className={styles.carousel} ref={carouselRef}>
            {/* Duplicate testimonials for seamless loop */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className={styles.testimonialCard}
              >
                <div className={styles.rating}>{renderStars(testimonial.rating)}</div>

                <p className={styles.quote}>"{testimonial.quote}"</p>

                {testimonial.results && (
                  <div className={styles.results}>
                    <div className={styles.resultMetric}>{testimonial.results.metric}</div>
                    <div className={styles.resultValue}>{testimonial.results.value}</div>
                  </div>
                )}

                <div className={styles.author}>
                  <div className={styles.avatar}>
                    {getInitials(testimonial.name)}
                  </div>
                  <div className={styles.authorInfo}>
                    <div className={styles.authorName}>{testimonial.name}</div>
                    <div className={styles.authorRole}>{testimonial.role}, {testimonial.business}</div>
                    <div className={styles.businessType}>{testimonial.businessType}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className={styles.footer}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p>Join 500+ successful retailers using Invento</p>
        </motion.div>
      </div>
    </section>
  )
}
