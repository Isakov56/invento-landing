import { motion } from 'framer-motion'
import { ShoppingCart, Users, BarChart3, TrendingUp } from 'lucide-react'
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
    </div>
  )
}
