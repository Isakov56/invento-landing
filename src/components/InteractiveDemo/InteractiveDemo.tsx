import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingCart, Users, BarChart3, TrendingUp } from 'lucide-react'
import DemoTabs from './DemoTabs'
import POSMode from './POSMode'
import CustomerMode from './CustomerMode'
import ReportsMode from './ReportsMode'
import MarketingMode from './MarketingMode'
import styles from './InteractiveDemo.module.css'

export type DemoMode = 'pos' | 'customers' | 'reports' | 'marketing'

const mobileNavItems = [
  {
    id: 'pos' as DemoMode,
    label: 'POS System',
    icon: ShoppingCart,
    description: 'Point of sale - Add products and checkout'
  },
  {
    id: 'customers' as DemoMode,
    label: 'Customers',
    icon: Users,
    description: 'Manage customers and track debts'
  },
  {
    id: 'reports' as DemoMode,
    label: 'Reports',
    icon: BarChart3,
    description: 'Analytics and downloadable reports'
  },
  {
    id: 'marketing' as DemoMode,
    label: 'Marketing',
    icon: TrendingUp,
    description: 'Growth metrics and ROI calculator'
  }
]

export default function InteractiveDemo() {
  const [activeMode, setActiveMode] = useState<DemoMode>('pos')
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)

  const currentMode = mobileNavItems.find(item => item.id === activeMode)
  const CurrentIcon = currentMode?.icon || ShoppingCart

  const handleModeChange = (mode: DemoMode) => {
    setActiveMode(mode)
    setShowMobileSidebar(false) // Close sidebar after selection
  }

  return (
    <section className={styles.interactiveDemo} id="demo">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.headerContent}>
            {/* Mobile Hamburger Menu */}
            <button
              className={styles.hamburgerBtn}
              onClick={() => setShowMobileSidebar(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={24} />
            </button>

            <div>
              <h2>Experience Invento in Action</h2>
              <p>Interactive demo - try all the features yourself</p>
            </div>
          </div>
        </motion.div>

        <div className={styles.demoContainer}>
          {/* Desktop Tabs - Hidden on mobile */}
          <div className={styles.desktopTabs}>
            <DemoTabs activeMode={activeMode} setActiveMode={setActiveMode} />
          </div>

          {/* Mobile Sidebar Navigation */}
          <AnimatePresence>
            {showMobileSidebar && (
              <>
                {/* Overlay */}
                <motion.div
                  className={styles.sidebarOverlay}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowMobileSidebar(false)}
                />

                {/* Sidebar */}
                <motion.div
                  className={styles.mobileSidebar}
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                >
                  {/* Sidebar Header */}
                  <div className={styles.sidebarHeader}>
                    <h3>Demo Navigation</h3>
                    <button
                      className={styles.closeSidebarBtn}
                      onClick={() => setShowMobileSidebar(false)}
                      aria-label="Close navigation menu"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  {/* Sidebar Menu Items */}
                  <div className={styles.sidebarMenu}>
                    {mobileNavItems.map(item => {
                      const Icon = item.icon
                      const isActive = activeMode === item.id

                      return (
                        <button
                          key={item.id}
                          className={`${styles.sidebarItem} ${isActive ? styles.sidebarItemActive : ''}`}
                          onClick={() => handleModeChange(item.id)}
                        >
                          <Icon size={20} />
                          <span>{item.label}</span>
                          {isActive && (
                            <motion.div
                              className={styles.sidebarActiveIndicator}
                              layoutId="activeSidebarItem"
                            />
                          )}
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <div className={styles.demoContent}>
            {/* Current Mode Indicator */}
            <motion.div
              className={styles.modeIndicator}
              key={activeMode}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.modeIndicatorIcon}>
                <CurrentIcon size={28} />
              </div>
              <div className={styles.modeIndicatorText}>
                <h3>{currentMode?.label}</h3>
                <p>{currentMode?.description}</p>
              </div>
            </motion.div>

            {/* Mode Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMode}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeMode === 'pos' && <POSMode />}
                {activeMode === 'customers' && <CustomerMode />}
                {activeMode === 'reports' && <ReportsMode />}
                {activeMode === 'marketing' && <MarketingMode />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
