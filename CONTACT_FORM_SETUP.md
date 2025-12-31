# Contact Form Setup Guide

This guide will help you set up the contact form to receive demo requests via email and SMS.

## 📧 EmailJS Setup (Required)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (100 emails/month free)
3. Verify your email address

### Step 2: Add Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Connect your email account
5. Note your **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template #1 (You receive demo requests)
1. Go to **Email Templates** → **Create New Template**
2. Template Name: "Demo Request Notification"
3. **Subject**: `New Demo Request from {{from_name}}`
4. **Body**:
```
New demo booking request received!

Customer Information:
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{phone}}
- Business: {{business_name}}
- Industry: {{business_type}}

Message:
{{message}}

Reply to: {{from_email}}
```
5. In **Settings**, set:
   - **To Email**: Your email address (where you'll receive requests)
   - **From Name**: Invento Contact Form
6. Click **Save**
7. Note your **Template ID** (e.g., `template_abc123`)

### Step 4: Create Email Template #2 (Customer auto-reply)
1. Create another new template
2. Template Name: "Demo Request Confirmation"
3. **To Email**: `{{to_email}}` (customer's email)
4. **Subject**: `Demo Request Received - Invento`
5. **Body**:
```
Hi {{to_name}},

Thank you for your interest in Invento for {{business_name}}!

We've received your demo request and our team will contact you within 24 hours to schedule your personalized walkthrough.

What happens next?
✅ Our team will review your request
✅ We'll reach out to schedule a convenient time
✅ You'll get a personalized demo tailored to your business needs

In the meantime, feel free to explore our website or reach out if you have any questions.

Best regards,
The Invento Team

---
This is an automated confirmation. Please do not reply to this email.
For questions, contact: support@invento.com
```
6. Click **Save**
7. Note your **Template ID** (e.g., `template_xyz789`)

### Step 5: Get Public Key
1. Go to **Account** → **General**
2. Find **Public Key** section
3. Copy your public key (e.g., `abc123def456`)

### Step 6: Update .env File
1. Copy `.env.example` to `.env`
2. Add your EmailJS credentials:
```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_PUBLIC_KEY=abc123def456
VITE_EMAILJS_TEMPLATE_ID=template_abc123
VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID=template_xyz789
```

### Step 7: Test the Form
1. Run your app: `npm run dev`
2. Go to the Contact section
3. Fill out and submit the form
4. Check:
   - ✅ You receive an email with the form data
   - ✅ Customer receives auto-reply confirmation
   - ✅ Success message appears on screen

---

## 📱 SMS Notifications (Optional)

To send SMS confirmations to customers, you'll need to set up a backend API with Twilio.

### Option 1: Twilio Setup (Recommended)

#### Step 1: Create Twilio Account
1. Go to [https://www.twilio.com/](https://www.twilio.com/)
2. Sign up for a free trial account ($15 credit)
3. Verify your phone number

#### Step 2: Get Credentials
1. In Twilio Console, find:
   - **Account SID**
   - **Auth Token**
2. Get a phone number from **Phone Numbers** → **Buy a Number**

#### Step 3: Create Backend API Endpoint
Create a backend API endpoint at `/api/send-sms`:

**Example using Node.js/Express:**
```javascript
// backend/routes/sms.js
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

app.post('/api/send-sms', async (req, res) => {
  try {
    const { phone, name, businessName } = req.body;

    const message = await client.messages.create({
      body: `Hi ${name}, thank you for requesting a demo of Invento for ${businessName}! We'll contact you within 24 hours to schedule your personalized walkthrough. - Invento Team`,
      from: twilioPhone,
      to: phone
    });

    res.json({ success: true, messageSid: message.sid });
  } catch (error) {
    console.error('SMS error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
```

#### Step 4: Enable SMS in Frontend
Update your `.env`:
```env
VITE_SMS_ENABLED=true
```

### Option 2: Alternative SMS Services
- **Vonage (Nexmo)**: https://www.vonage.com/
- **AWS SNS**: https://aws.amazon.com/sns/
- **Plivo**: https://www.plivo.com/

---

## 🔧 Troubleshooting

### Emails Not Sending
1. Check console for errors
2. Verify all EmailJS IDs in `.env` are correct
3. Check EmailJS dashboard for failed sends
4. Ensure email service is connected properly

### Auto-Reply Not Working
1. Verify `VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID` is set
2. Check template uses `{{to_email}}` in "To Email" field
3. Test template in EmailJS dashboard

### SMS Not Sending
1. Check backend API is running
2. Verify Twilio credentials are correct
3. Check phone number format (E.164: +1234567890)
4. Check Twilio console for error logs

---

## 💰 Pricing

### EmailJS
- Free: 100 emails/month
- Paid: Starting at $7/month for 1,000 emails

### Twilio
- Free trial: $15 credit
- SMS: ~$0.0075 per message (US)
- Phone number: $1/month

---

## 🎯 Best Practices

1. **Test First**: Use your own email/phone for testing
2. **Monitor Usage**: Check EmailJS dashboard regularly
3. **Backup Data**: Log form submissions to your database
4. **Rate Limiting**: Add captcha to prevent spam
5. **Privacy**: Add GDPR-compliant privacy notice

---

## 📞 Support

If you need help:
- EmailJS Docs: https://www.emailjs.com/docs/
- Twilio Docs: https://www.twilio.com/docs/
- GitHub Issues: [Your repo URL]
