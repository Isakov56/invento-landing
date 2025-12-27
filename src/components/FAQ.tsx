import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import styles from './FAQ.module.css'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'How long is the free trial?',
    answer: 'You get a full 14-day free trial with access to all Premium features. No credit card required to start. You can cancel anytime during the trial with no charges.'
  },
  {
    question: 'Do I need a credit card to start the free trial?',
    answer: 'No! You can start your 14-day free trial without entering any payment information. We\'ll only ask for payment details if you decide to continue after the trial.'
  },
  {
    question: 'Can I use Invento offline?',
    answer: 'Yes! Invento works offline and automatically syncs when you\'re back online. Your sales data is stored locally and securely synced to the cloud when internet is available.'
  },
  {
    question: 'What hardware do I need?',
    answer: 'Invento works on any modern device - tablet, smartphone, or computer. For barcode scanning, you can use any standard USB or Bluetooth scanner. We also support receipt printers, cash drawers, and card readers.'
  },
  {
    question: 'How do I import my existing inventory?',
    answer: 'You can import your inventory via CSV file or connect to your existing e-commerce platform. We support bulk imports and our support team can help you migrate from your current system for free.'
  },
  {
    question: 'Is there a setup fee?',
    answer: 'No setup fees, ever. The price you see is the price you pay. All features, updates, and customer support are included in your monthly subscription.'
  },
  {
    question: 'Can I switch plans later?',
    answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate the billing automatically.'
  },
  {
    question: 'What kind of support is included?',
    answer: 'All plans include email support. Premium plan customers get priority support with faster response times. We also have a comprehensive knowledge base and video tutorials available 24/7.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes! We use bank-level 256-bit SSL encryption for all data transmission. Your data is stored in secure, redundant servers with daily backups. We\'re PCI DSS compliant and follow all security best practices.'
  },
  {
    question: 'Can I manage multiple store locations?',
    answer: 'Yes, with the Premium plan! You can manage unlimited stores, transfer inventory between locations, and view consolidated reporting across all your locations from a single dashboard.'
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className={styles.faq} id="faq">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about Invento</p>
        </motion.div>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className={styles.faqItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <button
                className={`${styles.faqQuestion} ${openIndex === index ? styles.active : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className={styles.chevron} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    className={styles.faqAnswer}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.answerContent}>
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.footer}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p>Still have questions? <a href="/contact">Contact our team</a></p>
        </motion.div>
      </div>
    </section>
  )
}
