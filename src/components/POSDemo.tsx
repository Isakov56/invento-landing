import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Sparkles } from 'lucide-react'
import styles from './POSDemo.module.css'

interface Product {
  name: string
  icon: string
  price: number
  sku: string
}

const products: Product[] = [
  { name: 'Premium Coffee', icon: '☕', price: 4.50, sku: 'COF-001' },
  { name: 'Fresh Croissant', icon: '🥐', price: 3.00, sku: 'CRO-002' },
  { name: 'Orange Juice', icon: '🧃', price: 5.00, sku: 'JUI-003' },
]

export default function POSDemo() {
  const [cart, setCart] = useState<Product[]>([])
  const [showConfetti, setShowConfetti] = useState(false)

  const total = cart.reduce((sum, item) => sum + item.price, 0)
  const itemCount = cart.length

  const scanProduct = (product: Product) => {
    setCart([...cart, product])

    // Show success animation
    if (cart.length + 1 >= 3) {
      setTimeout(() => {
        setShowConfetti(true)
        setTimeout(() => {
          alert(`🎉 Checkout Complete!\n\nTotal: $${(total + product.price).toFixed(2)}\nItems: ${itemCount + 1}\n\nThat was fast! Imagine doing this all day.`)
          setCart([])
          setShowConfetti(false)
        }, 500)
      }, 300)
    }
  }

  return (
    <div className={styles.posDemo}>
      <div className={styles.header}>
        <h3>🎮 Try Our POS - Scan Items!</h3>
        <p className={styles.subtitle}>Click products to add them to cart</p>
      </div>

      <div className={styles.screen}>
        {products.map((product) => (
          <motion.div
            key={product.sku}
            className={styles.product}
            onClick={() => scanProduct(product)}
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={styles.productIcon}>{product.icon}</div>
            <div className={styles.productInfo}>
              <div className={styles.productName}>{product.name}</div>
              <div className={styles.productSku}>SKU: {product.sku}</div>
            </div>
            <div className={styles.productPrice}>${product.price.toFixed(2)}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className={styles.total}
        animate={{ scale: itemCount > 0 ? [1, 1.05, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.totalRow}>
          <ShoppingCart className={styles.cartIcon} />
          <span>Total: ${total.toFixed(2)}</span>
        </div>
        <div className={styles.itemCount}>Items: {itemCount}</div>
      </motion.div>

      <AnimatePresence>
        {showConfetti && (
          <motion.div
            className={styles.confetti}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <Sparkles size={48} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
