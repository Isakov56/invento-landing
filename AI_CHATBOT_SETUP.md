# AI Chatbot Integration Guide

The landing page includes an intelligent AI chatbot that can answer customer questions in real-time. You can integrate it with **real AI providers** like OpenAI (ChatGPT) or Anthropic (Claude).

## 🚀 Quick Start

### Option 1: Use Without AI API (Default)
The chatbot works out-of-the-box with smart fallback responses. No setup needed!

### Option 2: Integrate with OpenAI (ChatGPT) - Recommended

**Step 1: Get an OpenAI API Key**
1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy your API key (starts with `sk-...`)

**Step 2: Configure Your Environment**
1. Copy `.env.example` to `.env` in the `landing` folder:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your API key:
   ```env
   VITE_OPENAI_API_KEY=sk-your-actual-key-here
   ```

**Step 3: Restart the Development Server**
```bash
npm run dev
```

That's it! The chatbot now uses real ChatGPT AI! 🎉

### Option 3: Integrate with Anthropic Claude (Alternative)

**Step 1: Get an Anthropic API Key**
1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Create an API key
4. Copy your API key

**Step 2: Configure Your Environment**
1. Copy `.env.example` to `.env`
2. Add your Anthropic API key:
   ```env
   VITE_ANTHROPIC_API_KEY=your-anthropic-key-here
   ```

3. Restart the dev server:
   ```bash
   npm run dev
   ```

## 💰 Pricing & Costs

### OpenAI (ChatGPT-3.5-turbo)
- **Cost:** ~$0.002 per conversation (extremely cheap)
- **Example:** 1,000 customer conversations = ~$2
- **Free tier:** $5 credit for new accounts

### Anthropic (Claude Haiku)
- **Cost:** ~$0.001 per conversation
- **Example:** 1,000 customer conversations = ~$1
- **Free tier:** Available for testing

### No API (Fallback)
- **Cost:** FREE
- Uses pattern-matching responses
- Still very effective for common questions

## 🎯 How It Works

### With AI API (OpenAI/Claude):
1. User asks: "What are your features?"
2. Chatbot sends question + context to OpenAI/Claude
3. AI generates intelligent, contextual response
4. Response appears instantly in chat
5. **Maintains conversation context** for natural dialogue

### Without AI API (Fallback):
1. User asks: "What are your features?"
2. Chatbot matches keywords in question
3. Returns pre-written smart response
4. Still very helpful and instant

## 📝 What the AI Knows

The AI is trained with information about Invento:

- **Pricing:** Basic $15/month, Premium $20/month
- **Features:** POS, Inventory, Analytics, Multi-store, etc.
- **Contact:** Phone: +1 (555) 123-4567, Email: sales@invento.com
- **Free Trial:** 14 days, no credit card
- **Integrations:** Stripe, QuickBooks, Shopify, etc.

You can customize this in `src/services/aiService.ts` (SYSTEM_PROMPT)

## 🛡️ Security Best Practices

1. **Never commit your .env file to git**
   - Already in `.gitignore`
   - Only share API keys securely

2. **Use environment variables in production**
   ```bash
   # In your hosting platform (Vercel, Netlify, etc.)
   VITE_OPENAI_API_KEY=your-key
   ```

3. **Set up rate limiting**
   - The chatbot already limits to 200 tokens per response
   - Consider adding rate limiting for abuse prevention

4. **Monitor usage**
   - Check OpenAI/Anthropic dashboard for costs
   - Set up billing alerts

## 🎨 Customization

### Change AI Personality
Edit `src/services/aiService.ts`:

```typescript
const SYSTEM_PROMPT = `You are a friendly assistant...`
```

### Change Model
For OpenAI, in `aiService.ts`:
```typescript
model: 'gpt-4', // More intelligent but more expensive
// or
model: 'gpt-3.5-turbo', // Fast and cheap (default)
```

### Add Custom Responses
Edit the `getFallbackResponse` function in `aiService.ts`

## 📊 Testing

### Test with AI:
1. Set up API key
2. Open chatbot
3. Ask: "What features do you have?"
4. AI should give detailed, contextual answer

### Test without AI:
1. Don't set API key (or use invalid key)
2. Open chatbot
3. Ask: "What features do you have?"
4. Should get smart fallback response

## 🐛 Troubleshooting

**Chatbot uses fallback responses even with API key:**
- Check `.env` file exists in `landing` folder
- Verify API key starts with `sk-` (OpenAI)
- Restart dev server after adding API key
- Check browser console for errors

**"API error" in console:**
- Verify API key is correct and active
- Check you have credits in OpenAI/Anthropic account
- Ensure API endpoint is accessible (not blocked by firewall)

**Slow responses:**
- Normal for first response (AI needs to process)
- Subsequent responses should be faster
- Consider upgrading model or provider

## 🚀 Production Deployment

### Vercel:
```bash
vercel env add VITE_OPENAI_API_KEY
```

### Netlify:
```bash
netlify env:set VITE_OPENAI_API_KEY your-key
```

### Other platforms:
Add environment variable in your hosting dashboard

## 📈 Analytics

Track chatbot performance:
- Messages sent
- Response time
- API costs
- User satisfaction

Add tracking in `AIChatbot.tsx` component.

## 🔄 Updates

The chatbot automatically:
- Falls back to pattern matching if API fails
- Handles errors gracefully
- Maintains conversation context
- Provides helpful responses always

## 💡 Tips

1. **Start with fallback mode** - Test the chatbot without API first
2. **Monitor costs** - Set up billing alerts in OpenAI/Anthropic
3. **Customize prompts** - Tailor the AI personality to your brand
4. **Test thoroughly** - Try various customer questions
5. **Use GPT-3.5** - Much cheaper than GPT-4, still excellent

## 📞 Support

Need help? The chatbot itself can help users reach you!
- Phone: +1 (555) 123-4567
- Email: sales@invento.com

---

**Current Status:** ✅ Chatbot is working with smart fallback responses
**To activate AI:** Add API key to `.env` file and restart server
