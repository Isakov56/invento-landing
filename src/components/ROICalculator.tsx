import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Clock, DollarSign, TrendingUp } from 'lucide-react'
import styles from './ROICalculator.module.css'

export default function ROICalculator() {
  const [dailyTransactions, setDailyTransactions] = useState(100)
  const [avgCheckoutTime, setAvgCheckoutTime] = useState(3) // minutes
  const [hourlyRate, setHourlyRate] = useState(15) // dollars

  // Calculate savings
  const timePerTransaction = avgCheckoutTime - 0.5 // Invento saves ~2.5 minutes per transaction
  const dailyTimeSaved = (dailyTransactions * timePerTransaction) / 60 // hours
  const monthlyTimeSaved = dailyTimeSaved * 30
  const yearlyCostSaved = monthlyTimeSaved * 12 * hourlyRate

  const monthlySubscription = 20 // Premium plan
  const yearlySubscriptionCost = monthlySubscription * 12
  const netYearlySavings = yearlyCostSaved - yearlySubscriptionCost

  return (
    <section className={styles.calculator}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Calculator className={styles.headerIcon} />
          <h2>Calculate Your Savings</h2>
          <p>See how much time and money Invento can save your business</p>
        </motion.div>

        <div className={styles.content}>
          <motion.div
            className={styles.inputs}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.inputGroup}>
              <label>
                <span>Daily Transactions</span>
                <span className={styles.value}>{dailyTransactions}</span>
              </label>
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={dailyTransactions}
                onChange={(e) => setDailyTransactions(Number(e.target.value))}
                className={styles.slider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>
                <span>Avg. Checkout Time (minutes)</span>
                <span className={styles.value}>{avgCheckoutTime}</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={avgCheckoutTime}
                onChange={(e) => setAvgCheckoutTime(Number(e.target.value))}
                className={styles.slider}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>
                <span>Staff Hourly Rate ($)</span>
                <span className={styles.value}>${hourlyRate}</span>
              </label>
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className={styles.slider}
              />
            </div>
          </motion.div>

          <motion.div
            className={styles.results}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.resultCard}>
              <div className={styles.resultIcon}>
                <Clock />
              </div>
              <div className={styles.resultValue}>
                {monthlyTimeSaved.toFixed(0)} <span>hours/month</span>
              </div>
              <div className={styles.resultLabel}>Time Saved</div>
            </div>

            <div className={styles.resultCard}>
              <div className={styles.resultIcon}>
                <DollarSign />
              </div>
              <div className={styles.resultValue}>
                ${yearlyCostSaved.toFixed(0)} <span>/year</span>
              </div>
              <div className={styles.resultLabel}>Labor Cost Saved</div>
            </div>

            <div className={styles.resultCard + ' ' + styles.highlight}>
              <div className={styles.resultIcon}>
                <TrendingUp />
              </div>
              <div className={styles.resultValue}>
                ${netYearlySavings.toFixed(0)} <span>/year</span>
              </div>
              <div className={styles.resultLabel}>Net Savings (After Subscription)</div>
            </div>

            <div className={styles.cta}>
              <p className={styles.ctaText}>
                That's a <strong>{((netYearlySavings / yearlySubscriptionCost) * 100).toFixed(0)}x</strong> return on investment!
              </p>
              <a href="/register" className={styles.ctaButton}>Start Saving Today</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
