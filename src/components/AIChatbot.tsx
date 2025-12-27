import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Calendar, Phone, Video } from 'lucide-react'
import { getAIResponse } from '../services/aiService'
import styles from './AIChatbot.module.css'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

interface ConversationMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

const QUICK_ACTIONS = [
  { icon: Calendar, label: 'Schedule Demo', action: 'demo' },
  { icon: Phone, label: 'Call Sales', action: 'contact' },
  { icon: Video, label: 'Watch Video', action: 'video' }
]

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! 👋 I'm your Invento assistant. I can help you with pricing, features, scheduling a demo, or answer any questions!",
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = input
    setInput('')
    setIsTyping(true)

    try {
      // Build conversation history for context
      const conversationHistory: ConversationMessage[] = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }))

      // Add current message
      conversationHistory.push({
        role: 'user',
        content: currentInput
      })

      // Get AI response (uses OpenAI/Claude API or fallback)
      const aiText = await getAIResponse(conversationHistory)

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiText,
        sender: 'ai',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    } catch (error) {
      console.error('Error getting AI response:', error)

      // Fallback error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now. Please try again or contact us directly at sales@invento.com or +1 (555) 123-4567.",
        sender: 'ai',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorMessage])
      setIsTyping(false)
    }
  }

  const handleQuickAction = (action: string) => {
    let message = ''
    if (action === 'demo') {
      message = 'I want to schedule a demo'
    } else if (action === 'contact') {
      message = 'What is your contact information?'
    } else if (action === 'video') {
      message = 'Do you have a video demo?'
    }
    setInput(message)
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        className={styles.chatButton}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ scale: isOpen ? 0 : 1 }}
      >
        <MessageCircle size={28} />
        <div className={styles.chatPulse} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.chatWindow}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            {/* Header */}
            <div className={styles.chatHeader}>
              <div className={styles.chatHeaderInfo}>
                <div className={styles.aiAvatar}>🤖</div>
                <div>
                  <div className={styles.chatTitle}>Invento Assistant</div>
                  <div className={styles.chatStatus}>
                    <span className={styles.statusDot} />
                    Online
                  </div>
                </div>
              </div>
              <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* Quick Actions */}
            <div className={styles.quickActions}>
              {QUICK_ACTIONS.map(action => {
                const Icon = action.icon
                return (
                  <button
                    key={action.action}
                    className={styles.quickActionBtn}
                    onClick={() => handleQuickAction(action.action)}
                  >
                    <Icon size={16} />
                    {action.label}
                  </button>
                )
              })}
            </div>

            {/* Messages */}
            <div className={styles.chatMessages}>
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  className={`${styles.message} ${message.sender === 'user' ? styles.userMessage : styles.aiMessage}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {message.sender === 'ai' && <div className={styles.messageAvatar}>🤖</div>}
                  <div className={styles.messageBubble}>
                    <div className={styles.messageText}>{message.text}</div>
                    <div className={styles.messageTime}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className={`${styles.message} ${styles.aiMessage}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className={styles.messageAvatar}>🤖</div>
                  <div className={styles.typingIndicator}>
                    <span />
                    <span />
                    <span />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={styles.chatInput}>
              <input
                type="text"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                className={styles.sendButton}
                onClick={handleSend}
                disabled={!input.trim()}
              >
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
