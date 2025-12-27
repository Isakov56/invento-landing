import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, UserPlus } from 'lucide-react'
import { mockCustomers } from '../../data/mockChartData'
import { Customer } from '../../types/demo'
import styles from './InteractiveDemo.module.css'

export default function CustomerMode() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    balance: 0
  })

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const getBalanceColor = (balance: number) => {
    if (balance < 0) return '#EF4444' // Debt - red
    if (balance > 0) return '#10B981' // Credit - green
    return '#64748B' // Neutral - gray
  }

  const getBalanceLabel = (balance: number) => {
    if (balance < 0) return 'Debt'
    if (balance > 0) return 'Credit'
    return 'Balanced'
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.name && formData.email && formData.phone) {
      const newCustomer: Customer = {
        id: Date.now().toString(),
        ...formData,
        joinDate: new Date().toISOString().split('T')[0]
      }

      setCustomers([newCustomer, ...customers])

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        balance: 0
      })
    }
  }

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className={styles.customerMode}>
      <div className={styles.customerLeft}>
        <h3>Register New Customer</h3>
        <form className={styles.customerForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Smith"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="555-0100"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Initial Balance</label>
            <input
              type="number"
              value={formData.balance}
              onChange={(e) => setFormData({ ...formData, balance: parseFloat(e.target.value) || 0 })}
              placeholder="0.00"
              step="0.01"
            />
            <small>Negative for debt, positive for credit</small>
          </div>

          <button type="submit" className={styles.addCustomerBtn}>
            <UserPlus size={18} />
            Add Customer
          </button>
        </form>
      </div>

      <div className={styles.customerRight}>
        <div className={styles.customerListHeader}>
          <h3>Customers ({customers.length})</h3>
          <div className={styles.searchBox}>
            <Search size={18} />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.customerList}>
          <AnimatePresence>
            {filteredCustomers.map((customer) => (
              <motion.div
                key={customer.id}
                className={styles.customerCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                layout
              >
                <div className={styles.customerAvatar}>
                  {getInitials(customer.name)}
                </div>

                <div className={styles.customerInfo}>
                  <div className={styles.customerName}>{customer.name}</div>
                  <div className={styles.customerEmail}>{customer.email}</div>
                  <div className={styles.customerPhone}>{customer.phone}</div>
                  <div className={styles.customerJoinDate}>
                    Joined {new Date(customer.joinDate).toLocaleDateString()}
                  </div>
                </div>

                <div className={styles.customerBalance}>
                  <div
                    className={styles.balanceAmount}
                    style={{ color: getBalanceColor(customer.balance) }}
                  >
                    ${Math.abs(customer.balance).toFixed(2)}
                  </div>
                  <div
                    className={styles.balanceLabel}
                    style={{ color: getBalanceColor(customer.balance) }}
                  >
                    {getBalanceLabel(customer.balance)}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredCustomers.length === 0 && (
            <div className={styles.emptyState}>
              <p>No customers found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
