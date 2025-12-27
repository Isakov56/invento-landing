import { useState } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Download, TrendingUp, DollarSign, ShoppingBag, Activity } from 'lucide-react'
import { salesTrendData, categoryRevenueData, topProductsData, keyMetrics } from '../../data/mockChartData'
import styles from './InteractiveDemo.module.css'

export default function ReportsMode() {
  const [downloading, setDownloading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleDownload = () => {
    setDownloading(true)

    setTimeout(() => {
      setDownloading(false)
      setShowSuccess(true)

      // Simulate CSV download
      const csvContent = 'data:text/csv;charset=utf-8,' +
        'Day,Sales,Revenue\n' +
        salesTrendData.map(d => `${d.day},${d.sales},${d.revenue}`).join('\n')

      const encodedUri = encodeURI(csvContent)
      const link = document.createElement('a')
      link.setAttribute('href', encodedUri)
      link.setAttribute('download', 'sales_report.csv')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setTimeout(() => setShowSuccess(false), 3000)
    }, 2000)
  }

  return (
    <div className={styles.reportsMode}>
      <div className={styles.reportsHeader}>
        <h3>Analytics Dashboard</h3>
        <button
          className={styles.downloadBtn}
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloading ? (
            <>
              <div className={styles.spinner}></div>
              Generating...
            </>
          ) : (
            <>
              <Download size={18} />
              Download Report
            </>
          )}
        </button>
      </div>

      {showSuccess && (
        <motion.div
          className={styles.successToast}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          ✓ Report downloaded successfully!
        </motion.div>
      )}

      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricIcon} style={{ backgroundColor: '#DBEAFE', color: '#2563EB' }}>
            <DollarSign size={24} />
          </div>
          <div className={styles.metricValue}>${keyMetrics.totalRevenue.toLocaleString()}</div>
          <div className={styles.metricLabel}>Total Revenue</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon} style={{ backgroundColor: '#D1FAE5', color: '#10B981' }}>
            <ShoppingBag size={24} />
          </div>
          <div className={styles.metricValue}>{keyMetrics.totalTransactions}</div>
          <div className={styles.metricLabel}>Transactions</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon} style={{ backgroundColor: '#FEF3C7', color: '#F59E0B' }}>
            <TrendingUp size={24} />
          </div>
          <div className={styles.metricValue}>${keyMetrics.averageTransaction.toFixed(2)}</div>
          <div className={styles.metricLabel}>Avg Transaction</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon} style={{ backgroundColor: '#E0E7FF', color: '#6366F1' }}>
            <Activity size={24} />
          </div>
          <div className={styles.metricValue}>{keyMetrics.topSellingCategory}</div>
          <div className={styles.metricLabel}>Top Category</div>
        </div>
      </div>

      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <h4>Sales Trend (7 Days)</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="day" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2563EB"
                strokeWidth={3}
                dot={{ fill: '#2563EB', r: 5 }}
                name="Revenue ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartCard}>
          <h4>Revenue by Category</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryRevenueData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={(entry) => `${entry.name}: $${entry.value}`}
              >
                {categoryRevenueData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartCard} style={{ gridColumn: '1 / -1' }}>
          <h4>Top Products</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topProductsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="sales" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
