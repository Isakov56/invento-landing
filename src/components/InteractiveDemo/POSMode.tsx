import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, X, ShoppingCart } from 'lucide-react'
import { products } from '../../data/products'
import { CartItem } from '../../types/demo'
import ReceiptPrinter from './ReceiptPrinter'
import styles from './InteractiveDemo.module.css'

export default function POSMode() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [editingPrice, setEditingPrice] = useState<number | null>(null)
  const [tempPrice, setTempPrice] = useState<string>('')
  const [showReceipt, setShowReceipt] = useState(false)
  const [showMobileCart, setShowMobileCart] = useState(false)

  const addToCart = (productId: number) => {
    const product = products.find(p => p.id === productId)
    if (!product) return

    const existingItem = cart.find(item => item.id === productId)

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const updateQuantity = (productId: number, delta: number) => {
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ).filter(item => item.quantity > 0))
  }

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const startEditingPrice = (productId: number, currentPrice: number) => {
    setEditingPrice(productId)
    setTempPrice(currentPrice.toString())
  }

  const savePrice = (productId: number) => {
    const newPrice = parseFloat(tempPrice)
    if (!isNaN(newPrice) && newPrice > 0) {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, price: newPrice }
          : item
      ))
    }
    setEditingPrice(null)
  }

  const cancelEditingPrice = () => {
    setEditingPrice(null)
    setTempPrice('')
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleCheckout = () => {
    if (cart.length > 0) {
      setShowReceipt(true)
      setTimeout(() => {
        setShowReceipt(false)
        setCart([])
      }, 5000)
    }
  }

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className={styles.posMode}>
      <div className={styles.posLeft}>
        <h3>Products</h3>
        <div className={styles.productGrid}>
          {products.map(product => (
            <motion.button
              key={product.id}
              className={styles.productCard}
              onClick={() => addToCart(product.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={styles.productIcon}>{product.icon}</div>
              <div className={styles.productName}>{product.name}</div>
              <div className={styles.productPrice}>${product.price.toFixed(2)}</div>
              <div className={styles.productStock}>{product.stock} in stock</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Floating Cart Button for Mobile */}
      <motion.button
        className={styles.floatingCartBtn}
        onClick={() => setShowMobileCart(true)}
        whileTap={{ scale: 0.9 }}
        animate={{ scale: cartItemCount > 0 ? 1 : 0.8 }}
      >
        <ShoppingCart size={24} />
        {cartItemCount > 0 && (
          <motion.div
            className={styles.cartBadge}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={cartItemCount}
          >
            {cartItemCount}
          </motion.div>
        )}
      </motion.button>

      {/* Desktop Cart */}
      <div className={`${styles.posRight} ${styles.desktopCart}`}>
        <div className={styles.cartHeader}>
          <ShoppingCart size={20} />
          <h3>Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</h3>
        </div>

        <div className={styles.cartItems}>
          <AnimatePresence>
            {cart.map(item => (
              <motion.div
                key={item.id}
                className={styles.cartItem}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                layout
              >
                <div className={styles.cartItemInfo}>
                  <div className={styles.cartItemIcon}>{item.icon}</div>
                  <div>
                    <div className={styles.cartItemName}>{item.name}</div>
                    {editingPrice === item.id ? (
                      <div className={styles.priceEdit}>
                        <input
                          type="number"
                          value={tempPrice}
                          onChange={(e) => setTempPrice(e.target.value)}
                          onBlur={() => savePrice(item.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') savePrice(item.id)
                            if (e.key === 'Escape') cancelEditingPrice()
                          }}
                          autoFocus
                          step="0.01"
                          className={styles.priceInput}
                        />
                      </div>
                    ) : (
                      <div
                        className={styles.cartItemPrice}
                        onClick={() => startEditingPrice(item.id, item.price)}
                      >
                        ${item.price.toFixed(2)} <span className={styles.editHint}>(click to edit)</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.cartItemControls}>
                  <button
                    className={styles.quantityBtn}
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    <Minus size={14} />
                  </button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button
                    className={styles.quantityBtn}
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <Plus size={14} />
                  </button>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item.id)}
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className={styles.cartItemTotal}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {cart.length === 0 && (
            <div className={styles.emptyCart}>
              <ShoppingCart size={48} />
              <p>Your cart is empty</p>
              <span>Click products to add them</span>
            </div>
          )}
        </div>

        <div className={styles.cartFooter}>
          <div className={styles.totalRow}>
            <span>Total</span>
            <span className={styles.totalAmount}>${total.toFixed(2)}</span>
          </div>
          <button
            className={styles.checkoutBtn}
            onClick={handleCheckout}
            disabled={cart.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Mobile Cart Drawer */}
      <AnimatePresence>
        {showMobileCart && (
          <>
            <motion.div
              className={styles.cartOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileCart(false)}
            />
            <motion.div
              className={styles.mobileCartDrawer}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <div className={styles.cartHeader}>
                <ShoppingCart size={20} />
                <h3>Cart ({cartItemCount} items)</h3>
                <button className={styles.closeCartBtn} onClick={() => setShowMobileCart(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className={styles.cartItems}>
                <AnimatePresence>
                  {cart.map(item => (
                    <motion.div
                      key={item.id}
                      className={styles.cartItem}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      layout
                    >
                      <div className={styles.cartItemInfo}>
                        <div className={styles.cartItemIcon}>{item.icon}</div>
                        <div>
                          <div className={styles.cartItemName}>{item.name}</div>
                          {editingPrice === item.id ? (
                            <div className={styles.priceEdit}>
                              <input
                                type="number"
                                value={tempPrice}
                                onChange={(e) => setTempPrice(e.target.value)}
                                onBlur={() => savePrice(item.id)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') savePrice(item.id)
                                  if (e.key === 'Escape') cancelEditingPrice()
                                }}
                                autoFocus
                                step="0.01"
                                className={styles.priceInput}
                              />
                            </div>
                          ) : (
                            <div
                              className={styles.cartItemPrice}
                              onClick={() => startEditingPrice(item.id, item.price)}
                            >
                              ${item.price.toFixed(2)} <span className={styles.editHint}>(tap to edit)</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className={styles.cartItemControls}>
                        <button
                          className={styles.quantityBtn}
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus size={14} />
                        </button>
                        <span className={styles.quantity}>{item.quantity}</span>
                        <button
                          className={styles.quantityBtn}
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          className={styles.removeBtn}
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X size={16} />
                        </button>
                      </div>

                      <div className={styles.cartItemTotal}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {cart.length === 0 && (
                  <div className={styles.emptyCart}>
                    <ShoppingCart size={48} />
                    <p>Your cart is empty</p>
                    <span>Tap products to add them</span>
                  </div>
                )}
              </div>

              <div className={styles.cartFooter}>
                <div className={styles.totalRow}>
                  <span>Total</span>
                  <span className={styles.totalAmount}>${total.toFixed(2)}</span>
                </div>
                <button
                  className={styles.checkoutBtn}
                  onClick={() => {
                    handleCheckout()
                    setShowMobileCart(false)
                  }}
                  disabled={cart.length === 0}
                >
                  Checkout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showReceipt && <ReceiptPrinter cart={cart} total={total} />}
      </AnimatePresence>
    </div>
  )
}
