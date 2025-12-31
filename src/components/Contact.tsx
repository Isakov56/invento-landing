import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Calendar, Mail, User, Building2, Phone, MessageSquare, Sparkles, CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import styles from './Contact.module.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // EmailJS configuration from environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing. Please check your environment variables.')
      }

      // Prepare template parameters matching your EmailJS template
      const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        message: formData.message || 'No additional message provided',
        first_name: formData.name.split(' ')[0],
        last_name: formData.name.split(' ').slice(1).join(' ') || '',
        experience: formData.businessType,
        goals: `Demo for ${formData.businessName}`,
        submission_date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      }

      // Send email to yourself (business owner)
      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      )

      // Send auto-reply confirmation email to customer (if you have a second template)
      if (autoReplyTemplateId) {
        const autoReplyParams = {
          name: formData.name,
          email: formData.email,
          first_name: formData.name.split(' ')[0],
          message: `Thank you for requesting a demo for ${formData.businessName}!`,
          submission_date: new Date().toLocaleDateString(),
        }

        await emailjs.send(
          serviceId,
          autoReplyTemplateId,
          autoReplyParams,
          publicKey
        )
      }

      // Optional: Send SMS via backend API (requires Twilio setup)
      if (formData.phone && import.meta.env.VITE_SMS_ENABLED === 'true') {
        try {
          await fetch('/api/send-sms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              phone: formData.phone,
              name: formData.name,
              businessName: formData.businessName
            })
          })
        } catch (smsError) {
          console.warn('SMS notification failed:', smsError)
          // Don't fail the whole form if SMS fails
        }
      }

      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset form after 5 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          businessName: '',
          businessType: '',
          message: ''
        })
        setIsSuccess(false)
      }, 5000)

    } catch (err) {
      console.error('Form submission error:', err)
      setError(err instanceof Error ? err.message : 'Failed to submit form. Please try again or contact us directly.')
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.headerBadge}>
            <Sparkles size={16} />
            <span>Book Your Live Demo</span>
          </div>
          <h2>See the Full Power of Invento</h2>
          <p>Get a personalized walkthrough with our team and discover how Invento can transform your retail business</p>
        </motion.div>

        <div className={styles.content}>
          {/* Left side - Benefits */}
          <motion.div
            className={styles.benefits}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>What You'll Get:</h3>
            <ul className={styles.benefitList}>
              <li>
                <div className={styles.benefitIcon}>
                  <Calendar size={20} />
                </div>
                <div>
                  <strong>30-Minute Personalized Demo</strong>
                  <p>See Invento in action with data relevant to your business</p>
                </div>
              </li>
              <li>
                <div className={styles.benefitIcon}>
                  <Sparkles size={20} />
                </div>
                <div>
                  <strong>Discover Hidden Features</strong>
                  <p>10x more powerful than the preview - automation, integrations, and advanced analytics</p>
                </div>
              </li>
              <li>
                <div className={styles.benefitIcon}>
                  <MessageSquare size={20} />
                </div>
                <div>
                  <strong>Ask Anything</strong>
                  <p>Get answers to your specific questions and use cases</p>
                </div>
              </li>
              <li>
                <div className={styles.benefitIcon}>
                  <CheckCircle size={20} />
                </div>
                <div>
                  <strong>Custom Pricing Quote</strong>
                  <p>Tailored plan based on your business size and needs</p>
                </div>
              </li>
            </ul>

            <div className={styles.trustBadges}>
              <div className={styles.trustBadge}>⚡ No sales pressure</div>
              <div className={styles.trustBadge}>🎯 Industry-specific demo</div>
              <div className={styles.trustBadge}>🚀 Same-day setup available</div>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            className={styles.formWrapper}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {isSuccess ? (
              <motion.div
                className={styles.successMessage}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <CheckCircle size={64} />
                <h3>Request Received!</h3>
                <p>Check your email for confirmation. We'll reach out within 24 hours to schedule your personalized demo.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                {error && (
                  <div className={styles.errorMessage}>
                    <AlertCircle size={20} />
                    <span>{error}</span>
                  </div>
                )}

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">
                      <User size={18} />
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">
                      <Mail size={18} />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone">
                      <Phone size={18} />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="businessName">
                      <Building2 size={18} />
                      Business Name *
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      required
                      placeholder="Your Store Name"
                    />
                  </div>

                  <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                    <label htmlFor="businessType">
                      <Sparkles size={18} />
                      Business Type *
                    </label>
                    <select
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select your industry</option>
                      <option value="pharmacy">Pharmacy & Drug Store</option>
                      <option value="cafe">Café & Coffee Shop</option>
                      <option value="fashion">Fashion & Apparel</option>
                      <option value="grocery">Grocery & Convenience</option>
                      <option value="cosmetics">Cosmetics & Beauty</option>
                      <option value="electronics">Electronics</option>
                      <option value="hardware">Hardware & Tools</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                    <label htmlFor="message">
                      <MessageSquare size={18} />
                      What would you like to see in the demo?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about your specific needs or questions..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className={styles.spinner} />
                      Sending Request...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Book My Live Demo
                    </>
                  )}
                </button>

                <p className={styles.formFooter}>
                  By submitting, you agree to receive communications from Invento.
                  We respect your privacy and never share your data.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
