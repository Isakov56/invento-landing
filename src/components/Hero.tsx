import { useEffect, useRef } from 'react'
import { gsap } from '../utils/gsapConfig'
import { useMagneticButton } from '../hooks/useMagneticButton'
import { useTextReveal } from '../hooks/useTextReveal'
import { CreditCard, TrendingUp, Package, DollarSign, ShoppingBag, Users, Clock, Star } from 'lucide-react'
import styles from './Hero.module.css'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const dashboardRef = useRef<HTMLDivElement>(null)
  const ctaRef = useMagneticButton<HTMLAnchorElement>({ strength: 20, speed: 0.3 })
  const secondaryRef = useMagneticButton<HTMLAnchorElement>({ strength: 15, speed: 0.3 })
  const titleRef = useTextReveal<HTMLHeadingElement>({ stagger: 0.03, start: 'top 90%' })

  useEffect(() => {
    if (!dashboardRef.current) return

    const ctx = gsap.context(() => {
      // Animate dashboard on load
      gsap.fromTo(
        dashboardRef.current,
        { opacity: 0, scale: 0.9, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      )

      // Parallax on scroll
      gsap.to(dashboardRef.current, {
        y: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      })

      // Animate stats inside dashboard
      const stats = dashboardRef.current?.querySelectorAll('[data-stat]')
      if (stats) {
        gsap.fromTo(
          stats,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.8, ease: 'power2.out' }
        )
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.hero} id="home" ref={heroRef}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 ref={titleRef}>
            Enterprise-Grade POS System for Modern Retail
          </h1>
          <p>
            Professional point-of-sale and inventory management platform trusted by retail businesses worldwide. Streamline operations, increase efficiency, and scale with confidence.
          </p>
          <div className={styles.buttons}>
            <a href="/register" className={styles.ctaButton} ref={ctaRef}>Start Free Trial</a>
            <a href="#demo" className={styles.secondaryButton} ref={secondaryRef}>Try Interactive Demo</a>
          </div>

          <div className={styles.badges}>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>✓</span>
              <span>14-day free trial</span>
            </div>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>✓</span>
              <span>No credit card required</span>
            </div>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>✓</span>
              <span>Cancel anytime</span>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className={styles.trustIndicators}>
            <div className={styles.indicator}>
              <div className={styles.indicatorValue}>2,500+</div>
              <div className={styles.indicatorLabel}>Active Stores</div>
            </div>
            <div className={styles.indicator}>
              <div className={styles.indicatorValue}>50K+</div>
              <div className={styles.indicatorLabel}>Happy Users</div>
            </div>
            <div className={styles.indicator}>
              <div className={styles.indicatorValue}>99.9%</div>
              <div className={styles.indicatorLabel}>Uptime</div>
            </div>
            <div className={styles.indicator}>
              <div className={styles.indicatorValue}>24/7</div>
              <div className={styles.indicatorLabel}>Support</div>
            </div>
          </div>
        </div>

        <div className={styles.visualContainer}>
          <div className={styles.dashboard} ref={dashboardRef}>
            <div className={styles.dashboardHeader}>
              <div className={styles.dots}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className={styles.headerTitle}>Invento Dashboard</div>
              <div className={styles.headerBadge}>
                <Clock size={14} />
                <span>Live</span>
              </div>
            </div>
            <div className={styles.dashboardContent}>
              <div className={styles.statsGrid}>
                <div className={styles.statCard} data-stat="1">
                  <div className={styles.statIcon} style={{ backgroundColor: '#DBEAFE' }}>
                    <DollarSign size={20} color="#2563EB" />
                  </div>
                  <div className={styles.statValue}>$12,459</div>
                  <div className={styles.statLabel}>Today's Sales</div>
                  <div className={styles.statTrend} style={{ color: '#10B981' }}>↑ 12.5%</div>
                </div>
                <div className={styles.statCard} data-stat="2">
                  <div className={styles.statIcon} style={{ backgroundColor: '#D1FAE5' }}>
                    <TrendingUp size={20} color="#10B981" />
                  </div>
                  <div className={styles.statValue}>+32%</div>
                  <div className={styles.statLabel}>Growth</div>
                  <div className={styles.statTrend} style={{ color: '#10B981' }}>This month</div>
                </div>
                <div className={styles.statCard} data-stat="3">
                  <div className={styles.statIcon} style={{ backgroundColor: '#FEE2E2' }}>
                    <CreditCard size={20} color="#EF4444" />
                  </div>
                  <div className={styles.statValue}>284</div>
                  <div className={styles.statLabel}>Transactions</div>
                  <div className={styles.statTrend} style={{ color: '#10B981' }}>↑ 8.2%</div>
                </div>
                <div className={styles.statCard} data-stat="4">
                  <div className={styles.statIcon} style={{ backgroundColor: '#FEF3C7' }}>
                    <Package size={20} color="#F59E0B" />
                  </div>
                  <div className={styles.statValue}>1,247</div>
                  <div className={styles.statLabel}>Items Sold</div>
                  <div className={styles.statTrend} style={{ color: '#10B981' }}>↑ 15.3%</div>
                </div>
              </div>

              {/* Bottom Grid: Chart and Activity side by side */}
              <div className={styles.bottomGrid}>
                {/* Chart Column */}
                <div className={styles.chartColumn}>
                  {/* Sales Overview Chart */}
                  <div className={styles.chartSection} data-stat="5">
                    <div className={styles.chartHeader}>
                      <h4>Sales Overview</h4>
                      <span className={styles.chartPeriod}>Last 7 days</span>
                    </div>
                    <div className={styles.miniChart}>
                      <div className={styles.chartBar} style={{ height: '40%' }}></div>
                      <div className={styles.chartBar} style={{ height: '65%' }}></div>
                      <div className={styles.chartBar} style={{ height: '45%' }}></div>
                      <div className={styles.chartBar} style={{ height: '80%' }}></div>
                      <div className={styles.chartBar} style={{ height: '60%' }}></div>
                      <div className={styles.chartBar} style={{ height: '90%' }}></div>
                      <div className={styles.chartBar} style={{ height: '100%' }}></div>
                    </div>
                  </div>

                  {/* Product Performance Chart */}
                  <div className={styles.chartSection} data-stat="6" style={{ marginTop: '0.75rem' }}>
                    <div className={styles.chartHeader}>
                      <h4>Top Products</h4>
                      <span className={styles.chartPeriod}>Today</span>
                    </div>
                    <div className={styles.productBars}>
                      <div className={styles.productBar}>
                        <span className={styles.productName}>Coffee</span>
                        <div className={styles.productBarFill} style={{ width: '85%' }}></div>
                      </div>
                      <div className={styles.productBar}>
                        <span className={styles.productName}>Pastries</span>
                        <div className={styles.productBarFill} style={{ width: '70%', backgroundColor: '#10B981' }}></div>
                      </div>
                      <div className={styles.productBar}>
                        <span className={styles.productName}>Sandwiches</span>
                        <div className={styles.productBarFill} style={{ width: '55%', backgroundColor: '#F59E0B' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className={styles.activitySection} data-stat="6">
                  <h4 className={styles.activityTitle}>Recent Activity</h4>
                  <div className={styles.activityList}>
                    <div className={styles.activityItem}>
                      <div className={styles.activityIcon} style={{ backgroundColor: '#DBEAFE' }}>
                        <ShoppingBag size={12} color="#2563EB" />
                      </div>
                      <div className={styles.activityDetails}>
                        <div className={styles.activityText}>Order #1284</div>
                        <div className={styles.activityTime}>2 min ago</div>
                      </div>
                      <div className={styles.activityAmount}>$156</div>
                    </div>
                    <div className={styles.activityItem}>
                      <div className={styles.activityIcon} style={{ backgroundColor: '#D1FAE5' }}>
                        <Users size={12} color="#10B981" />
                      </div>
                      <div className={styles.activityDetails}>
                        <div className={styles.activityText}>New customer</div>
                        <div className={styles.activityTime}>5 min ago</div>
                      </div>
                      <div className={styles.activityBadge}>
                        <Star size={11} fill="#F59E0B" color="#F59E0B" />
                      </div>
                    </div>
                    <div className={styles.activityItem}>
                      <div className={styles.activityIcon} style={{ backgroundColor: '#FEF3C7' }}>
                        <Package size={12} color="#F59E0B" />
                      </div>
                      <div className={styles.activityDetails}>
                        <div className={styles.activityText}>Low stock alert</div>
                        <div className={styles.activityTime}>12 min ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
