import { motion } from 'framer-motion'
import { ShoppingCart, Users, BarChart3, TrendingUp, Sparkles } from 'lucide-react'
import { DemoMode } from './InteractiveDemo'
import styles from './InteractiveDemo.module.css'

interface DemoTabsProps {
  activeMode: DemoMode
  setActiveMode: (mode: DemoMode) => void
}

const tabs = [
  { id: 'pos' as DemoMode, label: 'POS System', icon: ShoppingCart },
  { id: 'customers' as DemoMode, label: 'Customers', icon: Users },
  { id: 'reports' as DemoMode, label: 'Reports', icon: BarChart3 },
  { id: 'marketing' as DemoMode, label: 'Marketing', icon: TrendingUp }
]

export default function DemoTabs({ activeMode, setActiveMode }: DemoTabsProps) {
  return (
    <div className={styles.tabs}>
      {tabs.map(tab => {
        const Icon = tab.icon
        const isActive = activeMode === tab.id

        return (
          <button
            key={tab.id}
            className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
            onClick={() => setActiveMode(tab.id)}
          >
            <Icon className={styles.tabIcon} />
            <span>{tab.label}</span>
            {isActive && (
              <motion.div
                className={styles.tabIndicator}
                layoutId="activeTab"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        )
      })}

      {/* Book Real Demo CTA */}
      <motion.a
        href="#contact"
        className={styles.bookDemoCta}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className={styles.bookDemoGlow}
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <Sparkles className={styles.bookDemoIcon} size={18} />
        <span className={styles.bookDemoText}>
          <span className={styles.bookDemoTitle}>This is just a preview!</span>
          <span className={styles.bookDemoSubtitle}>See the Full System →</span>
        </span>
      </motion.a>
    </div>
  )
}
