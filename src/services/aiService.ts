// AI Service - Supports multiple AI providers
// Configure your API key in .env file

interface AIMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

const SYSTEM_PROMPT = `You are an intelligent sales assistant for Invento POS - a point-of-sale and inventory management system for retail businesses.

Your role is to:
- Answer questions about Invento's features, pricing, and benefits
- Help users schedule demos and get in touch with the sales team
- Be friendly, professional, and helpful
- Keep responses concise (2-3 sentences when possible)

Key Information:
- Pricing: Basic $15/month, Premium $20/month
- 14-day free trial, no credit card required
- Key features: Fast POS, Inventory tracking, Analytics, Multi-store, Team management
- Contact: Phone: +1 (555) 123-4567, Email: sales@invento.com
- Integrations: Stripe, Square, QuickBooks, Xero, Shopify, WooCommerce

When users want to:
- Schedule a demo: Encourage them and provide contact details
- Get pricing: Share both plans and emphasize free trial
- Ask about features: Highlight relevant features based on their needs
- Contact sales: Provide phone/email immediately`

// OpenAI API Integration
export async function getOpenAIResponse(messages: AIMessage[]): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY

  if (!apiKey) {
    console.warn('OpenAI API key not found. Using fallback responses.')
    return getFallbackResponse(messages[messages.length - 1].content)
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0]?.message?.content || getFallbackResponse(messages[messages.length - 1].content)
  } catch (error) {
    console.error('Error calling OpenAI API:', error)
    return getFallbackResponse(messages[messages.length - 1].content)
  }
}

// Anthropic Claude API Integration (Alternative)
export async function getClaudeResponse(messages: AIMessage[]): Promise<string> {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

  if (!apiKey) {
    console.warn('Anthropic API key not found. Using fallback responses.')
    return getFallbackResponse(messages[messages.length - 1].content)
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 200,
        system: SYSTEM_PROMPT,
        messages: messages.map(msg => ({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.content
        }))
      })
    })

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`)
    }

    const data = await response.json()
    return data.content[0]?.text || getFallbackResponse(messages[messages.length - 1].content)
  } catch (error) {
    console.error('Error calling Anthropic API:', error)
    return getFallbackResponse(messages[messages.length - 1].content)
  }
}

// Fallback responses when API is not configured
export function getFallbackResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase()

  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
    return "Our pricing starts at $15/month for the Basic plan and $20/month for Premium. Both include a 14-day free trial with no credit card required! Which plan interests you?"
  } else if (lowerMessage.includes('feature') || lowerMessage.includes('what can') || lowerMessage.includes('capabilities')) {
    return "Invento POS includes: Lightning-fast checkout, real-time inventory tracking, advanced analytics, multi-store management, team permissions, and 24/7 support. What specific feature would you like to know more about?"
  } else if (lowerMessage.includes('demo') || lowerMessage.includes('schedule') || lowerMessage.includes('meeting')) {
    return "I'd love to schedule a demo for you! Our demos are 30 minutes and show you everything Invento can do. Call us at +1 (555) 123-4567 or email sales@invento.com to book a time!"
  } else if (lowerMessage.includes('support') || lowerMessage.includes('help')) {
    return "We offer 24/7 email support for all plans, and Priority Support with live chat for Premium customers. Need help with something specific?"
  } else if (lowerMessage.includes('trial') || lowerMessage.includes('free')) {
    return "Yes! All plans include a 14-day free trial. No credit card required. You can start right now and explore all features. Ready to get started?"
  } else if (lowerMessage.includes('integrat') || lowerMessage.includes('connect')) {
    return "Invento integrates seamlessly with Stripe, Square, QuickBooks, Xero, Shopify, WooCommerce, Mailchimp, and more. Which integration do you need?"
  } else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('call') || lowerMessage.includes('email')) {
    return "You can reach us at:\n📞 Phone: +1 (555) 123-4567\n📧 Email: sales@invento.com\n\nWe typically respond within minutes during business hours!"
  } else {
    return "Great question! I'm here to help you learn about Invento POS. I can tell you about our pricing, features, integrations, or help you schedule a demo. What would you like to know?"
  }
}

// Main AI service - automatically uses configured provider
export async function getAIResponse(conversationHistory: AIMessage[]): Promise<string> {
  // Check which API is configured
  const hasOpenAI = !!import.meta.env.VITE_OPENAI_API_KEY
  const hasClaude = !!import.meta.env.VITE_ANTHROPIC_API_KEY

  if (hasOpenAI) {
    return getOpenAIResponse(conversationHistory)
  } else if (hasClaude) {
    return getClaudeResponse(conversationHistory)
  } else {
    // Use fallback if no API is configured
    return getFallbackResponse(conversationHistory[conversationHistory.length - 1].content)
  }
}
