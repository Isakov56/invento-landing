import { motion } from 'framer-motion'
import { CartItem } from '../../types/demo'
import styles from './InteractiveDemo.module.css'

interface ReceiptPrinterProps {
  cart: CartItem[]
  total: number
}

export default function ReceiptPrinter({ cart, total }: ReceiptPrinterProps) {
  const currentDate = new Date().toLocaleString()

  return (
    <motion.div
      className={styles.receiptOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={styles.receiptPrinter}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25 }}
      >
        <div className={styles.receiptPaper}>
          <motion.div
            className={styles.receiptContent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className={styles.receiptHeader}>
              <h3>INVENTO POS</h3>
              <p>Thank you for your purchase!</p>
              <p className={styles.receiptDate}>{currentDate}</p>
            </div>

            <div className={styles.receiptDivider}></div>

            <div className={styles.receiptItems}>
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={styles.receiptItem}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className={styles.receiptItemName}>
                    {item.name} x{item.quantity}
                  </div>
                  <div className={styles.receiptItemPrice}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className={styles.receiptDivider}></div>

            <motion.div
              className={styles.receiptTotal}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span>TOTAL</span>
              <span className={styles.receiptTotalAmount}>${total.toFixed(2)}</span>
            </motion.div>

            <motion.div
              className={styles.receiptFooter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p>Powered by Invento</p>
              <p>Visit us at invento.com</p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className={styles.confetti}
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: [0, 1.5, 1], rotate: [0, 180, 360] }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          🎉
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
