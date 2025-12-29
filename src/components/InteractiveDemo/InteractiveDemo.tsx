import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingCart, Users, BarChart3, TrendingUp, Coffee, Shirt, ShoppingBag, Sparkles, Smartphone, Hammer, ChevronDown } from 'lucide-react'
import DemoTabs from './DemoTabs'
import POSMode from './POSMode'
import CustomerMode from './CustomerMode'
import ReportsMode from './ReportsMode'
import MarketingMode from './MarketingMode'
import { BusinessType } from '../../data/products'
import styles from './InteractiveDemo.module.css'

export type DemoMode = 'pos' | 'customers' | 'reports' | 'marketing'

const businessTypes = [
  { id: 'cafe' as BusinessType, label: 'Café', icon: Coffee },
  { id: 'fashion' as BusinessType, label: 'Fashion', icon: Shirt },
  { id: 'grocery' as BusinessType, label: 'Grocery', icon: ShoppingBag },
  { id: 'cosmetics' as BusinessType, label: 'Cosmetics', icon: Sparkles },
  { id: 'electronics' as BusinessType, label: 'Electronics', icon: Smartphone },
  { id: 'hardware' as BusinessType, label: 'Hardware', icon: Hammer }
]

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

interface InteractiveDemoProps {
  showDemoSidebar: boolean
  setShowDemoSidebar: (show: boolean) => void
}

export default function InteractiveDemo({ showDemoSidebar, setShowDemoSidebar }: InteractiveDemoProps) {
  const [activeMode, setActiveMode] = useState<DemoMode>('pos')
  const [businessType, setBusinessType] = useState<BusinessType>('cafe')
  const [showModeDropdown, setShowModeDropdown] = useState(false)

  const currentMode = mobileNavItems.find(item => item.id === activeMode)
  const CurrentIcon = currentMode?.icon || ShoppingCart

  const handleModeChange = (mode: DemoMode) => {
    setActiveMode(mode)
    setShowDemoSidebar(false) // Close sidebar after selection
    setShowModeDropdown(false) // Close dropdown after selection
  }

  return (
    <section className={styles.interactiveDemo} id="demo">
      <div className={styles.container}>
        {/* Section Header - Outside demo app */}
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Experience Invento in Action</h2>
          <p>Interactive demo - try all the features yourself</p>
        </motion.div>

        {/* Business Type Selector - Desktop */}
        <motion.div
          className={styles.businessSelectorDesktop}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <span className={styles.businessLabel}>Choose your business:</span>
          <div className={styles.businessButtons}>
            {businessTypes.map((business) => {
              const Icon = business.icon
              return (
                <button
                  key={business.id}
                  className={`${styles.businessButton} ${businessType === business.id ? styles.businessButtonActive : ''}`}
                  onClick={() => setBusinessType(business.id)}
                >
                  <Icon size={18} />
                  <span>{business.label}</span>
                </button>
              )
            })}
          </div>
        </motion.div>

        <div className={styles.demoContainer}>
          {/* Business Type Selector - Mobile (inside demo app) */}
          <div className={styles.businessSelectorMobile}>
            <span className={styles.businessLabel}>Choose your business:</span>
            <div className={styles.businessButtons}>
              {businessTypes.map((business) => {
                const Icon = business.icon
                return (
                  <button
                    key={business.id}
                    className={`${styles.businessButton} ${businessType === business.id ? styles.businessButtonActive : ''}`}
                    onClick={() => setBusinessType(business.id)}
                  >
                    <Icon size={16} />
                    <span>{business.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
          {/* Desktop Tabs - Hidden on mobile */}
          <div className={styles.desktopTabs}>
            <DemoTabs activeMode={activeMode} setActiveMode={setActiveMode} />
          </div>

          {/* Mobile Sidebar Navigation */}
          <AnimatePresence>
            {showDemoSidebar && (
              <>
                {/* Overlay */}
                <motion.div
                  className={styles.sidebarOverlay}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowDemoSidebar(false)}
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
                      onClick={() => setShowDemoSidebar(false)}
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
            {/* Current Mode Indicator - Clickable on mobile */}
            <div className={styles.modeIndicatorWrapper}>
              <motion.button
                className={styles.modeIndicator}
                key={activeMode}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                  // Only toggle on mobile (window width <= 768px)
                  if (window.innerWidth <= 768) {
                    setShowModeDropdown(!showModeDropdown)
                  }
                }}
              >
                <div className={styles.modeIndicatorIcon}>
                  <CurrentIcon size={28} />
                </div>
                <div className={styles.modeIndicatorText}>
                  <h3>{currentMode?.label}</h3>
                  <p>{currentMode?.description}</p>
                </div>
                <motion.div
                  className={`${styles.modeIndicatorChevron} ${showModeDropdown ? styles.modeIndicatorChevronActive : ''}`}
                  animate={{ rotate: showModeDropdown ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={24} />
                </motion.div>
              </motion.button>

              {/* Mode Dropdown Menu */}
              <AnimatePresence>
                {showModeDropdown && (
                  <>
                    <motion.div
                      className={styles.modeDropdownOverlay}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setShowModeDropdown(false)}
                    />
                    <motion.div
                      className={styles.modeDropdown}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {mobileNavItems.map((item) => {
                        const Icon = item.icon
                        const isActive = activeMode === item.id
                        return (
                          <button
                            key={item.id}
                            className={`${styles.modeDropdownItem} ${isActive ? styles.modeDropdownItemActive : ''}`}
                            onClick={() => handleModeChange(item.id)}
                          >
                            <div className={styles.modeDropdownIcon}>
                              <Icon size={20} />
                            </div>
                            <div className={styles.modeDropdownText}>
                              <div className={styles.modeDropdownLabel}>{item.label}</div>
                              <div className={styles.modeDropdownDescription}>{item.description}</div>
                            </div>
                            {isActive && (
                              <motion.div
                                className={styles.modeDropdownCheck}
                                layoutId="activeMode"
                              >
                                ✓
                              </motion.div>
                            )}
                          </button>
                        )
                      })}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Mode Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMode}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeMode === 'pos' && <POSMode businessType={businessType} />}
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
