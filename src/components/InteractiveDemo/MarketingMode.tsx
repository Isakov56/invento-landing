import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, Users, DollarSign, Repeat } from 'lucide-react'
import { gsap } from '../../utils/gsapConfig'
import { marketingData, marketingMetrics } from '../../data/mockChartData'
import styles from './InteractiveDemo.module.css'

export default function MarketingMode() {
  const [marketingSpend, setMarketingSpend] = useState(500)
  const [roi, setRoi] = useState(0)

  const newCustomersRef = useRef<HTMLSpanElement>(null)
  const lifetimeValueRef = useRef<HTMLSpanElement>(null)
  const repeatRateRef = useRef<HTMLSpanElement>(null)
  const avgOrderRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Animate counters on mount
    const refs = [
      { ref: newCustomersRef, target: marketingMetrics.newCustomersThisMonth },
      { ref: lifetimeValueRef, target: marketingMetrics.customerLifetimeValue },
      { ref: repeatRateRef, target: marketingMetrics.repeatPurchaseRate },
      { ref: avgOrderRef, target: marketingMetrics.averageOrderValue }
    ]

    refs.forEach(({ ref, target }) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: target < 100 ? 0.01 : 1 },
            onUpdate: function () {
              if (ref.current) {
                const value = gsap.getProperty(ref.current, 'innerText') as number
                ref.current.innerText = target < 100 ? value.toFixed(2) : Math.floor(value).toString()
              }
            }
          }
        )
      }
    })
  }, [])

  useEffect(() => {
    // Calculate ROI: (Revenue Generated - Marketing Spend) / Marketing Spend * 100
    const avgCustomerValue = 150 // Average customer spends $150
    const conversionRate = 0.05 // 5% conversion
    const customersAcquired = marketingSpend * conversionRate
    const revenueGenerated = customersAcquired * avgCustomerValue
    const calculatedRoi = ((revenueGenerated - marketingSpend) / marketingSpend) * 100

    setRoi(calculatedRoi)
  }, [marketingSpend])

  return (
    <div className={styles.marketingMode}>
      <div className={styles.marketingMetrics}>
        <motion.div
          className={styles.marketingCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className={styles.metricIcon} style={{ backgroundColor: '#DBEAFE', color: '#2563EB' }}>
            <Users size={24} />
          </div>
          <div className={styles.metricValue}>
            <span ref={newCustomersRef}>0</span>
            <span className={styles.metricGrowth}>+{marketingMetrics.customerGrowthPercent}%</span>
          </div>
          <div className={styles.metricLabel}>New Customers This Month</div>
        </motion.div>

        <motion.div
          className={styles.marketingCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.metricIcon} style={{ backgroundColor: '#D1FAE5', color: '#10B981' }}>
            <DollarSign size={24} />
          </div>
          <div className={styles.metricValue}>
            $<span ref={lifetimeValueRef}>0</span>
          </div>
          <div className={styles.metricLabel}>Customer Lifetime Value</div>
        </motion.div>

        <motion.div
          className={styles.marketingCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className={styles.metricIcon} style={{ backgroundColor: '#FEE2E2', color: '#EF4444' }}>
            <Repeat size={24} />
          </div>
          <div className={styles.metricValue}>
            <span ref={repeatRateRef}>0</span>%
          </div>
          <div className={styles.metricLabel}>Repeat Purchase Rate</div>
        </motion.div>

        <motion.div
          className={styles.marketingCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className={styles.metricIcon} style={{ backgroundColor: '#FEF3C7', color: '#F59E0B' }}>
            <TrendingUp size={24} />
          </div>
          <div className={styles.metricValue}>
            $<span ref={avgOrderRef}>0</span>
          </div>
          <div className={styles.metricLabel}>Average Order Value</div>
        </motion.div>
      </div>

      <div className={styles.marketingCharts}>
        <div className={styles.chartCard}>
          <h4>Customer Acquisition Trend</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={marketingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="date" stroke="#64748B" />
              <YAxis yAxisId="left" stroke="#64748B" />
              <YAxis yAxisId="right" orientation="right" stroke="#64748B" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="customers"
                stroke="#2563EB"
                strokeWidth={3}
                dot={{ fill: '#2563EB', r: 5 }}
                name="New Customers"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: '#10B981', r: 5 }}
                name="Revenue ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.roiCalculator}>
          <h4>Marketing ROI Calculator</h4>
          <div className={styles.calculatorContent}>
            <div className={styles.sliderGroup}>
              <label>
                <span>Monthly Marketing Spend</span>
                <span className={styles.sliderValue}>${marketingSpend}</span>
              </label>
              <input
                type="range"
                min="100"
                max="5000"
                step="50"
                value={marketingSpend}
                onChange={(e) => setMarketingSpend(Number(e.target.value))}
                className={styles.slider}
              />
            </div>

            <div className={styles.roiResult}>
              <div className={styles.roiLabel}>Projected ROI</div>
              <div className={styles.roiValue} style={{ color: roi > 0 ? '#10B981' : '#EF4444' }}>
                {roi > 0 ? '+' : ''}{roi.toFixed(0)}%
              </div>
              <div className={styles.roiDescription}>
                {roi > 0 ? 'Positive return on investment' : 'Increase spend for better ROI'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
