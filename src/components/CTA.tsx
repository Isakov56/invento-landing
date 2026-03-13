import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Download, Monitor } from 'lucide-react'
import styles from './CTA.module.css'

export default function CTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.sparkles}>
            <Sparkles className={styles.sparkle1} />
            <Sparkles className={styles.sparkle2} />
            <Sparkles className={styles.sparkle3} />
          </div>

          <h2>Ready to Transform Your Retail Business?</h2>
          <p>
            Join hundreds of successful retailers using Invento to streamline operations,
            boost sales, and delight customers. Start your free 14-day trial today.
          </p>

          <div className={styles.buttons}>
            <a href="/register" className={styles.primaryButton}>
              Start Free Trial
              <ArrowRight className={styles.arrow} />
            </a>
            <a href="#demo" className={styles.secondaryButton}>
              Try the Demo
            </a>
          </div>

          <div className={styles.downloadRow}>
            <a
              href="https://github.com/Isakov56/retail-desktop/releases/download/v0.3.0/Invento.POS_0.3.0_x64-setup.exe"
              className={styles.downloadButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Monitor size={18} />
              Download Desktop App
              <Download size={15} />
            </a>
            <span className={styles.downloadNote}>Windows 10/11 &middot; Free</span>
          </div>

          <div className={styles.badges}>
            <div className={styles.badge}>✓ No credit card required</div>
            <div className={styles.badge}>✓ 14-day free trial</div>
            <div className={styles.badge}>✓ Cancel anytime</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
