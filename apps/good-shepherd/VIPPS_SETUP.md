# Vipps Integration Setup Guide

## 🎯 Overview

This guide helps you set up **Vipps** payment integration for Good Shepherd Lanka's donation system. Vipps supports:

- ✅ **One-time donations** (instant payments)
- ✅ **Recurring donations** (monthly with AvtaleGiro)
- ✅ Low fees (~1% vs Stripe's 2.9%)
- ✅ Trusted by 85%+ of Norwegians

---

## 📋 Prerequisites

1. **Norwegian Business Registration** (Org number)
2. **Vipps Merchant Account** - Sign up at [portal.vipps.no](https://portal.vipps.no)
3. **Norwegian Bank Account** - For receiving payments

---

## 🔑 Step 1: Get Vipps Credentials

### Register at Vipps Portal

1. Go to [portal.vipps.no](https://portal.vipps.no)
2. Sign up with your Norwegian org number
3. Complete verification process (may take 1-2 business days)

### Get API Credentials

Once approved, go to **Developer** section and note down:

```env
VIPPS_MERCHANT_SERIAL_NUMBER=123456
VIPPS_CLIENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
VIPPS_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VIPPS_SUBSCRIPTION_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 🛠️ Step 2: Configure Environment Variables

### Create `.env.local` file

```bash
# apps/good-shepherd/.env.local

# ==================================
# VIPPS CREDENTIALS
# ==================================
VIPPS_MERCHANT_SERIAL_NUMBER=your_msn_here
VIPPS_CLIENT_ID=your_client_id_here
VIPPS_CLIENT_SECRET=your_client_secret_here
VIPPS_SUBSCRIPTION_KEY=your_subscription_key_here

# ==================================
# STRIPE CREDENTIALS (keep existing)
# ==================================
STRIPE_SECRET_KEY=sk_test_your_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key

# ==================================
# APPLICATION URL
# ==================================
# Development:
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Production:
# NEXT_PUBLIC_APP_URL=https://goodshepherdlanka.no
```

### For Vercel Deployment

Add these environment variables in **Vercel Dashboard**:

1. Go to your project → Settings → Environment Variables
2. Add each variable (VIPPS*\*, STRIPE*\*, NEXT_PUBLIC_APP_URL)
3. Redeploy your application

---

## 🧪 Step 3: Test Mode Setup

### Using Vipps Test Environment

1. In Vipps Portal, create **test credentials**
2. Download **Vipps Test App** on your phone
3. Create test user account
4. Use test credentials in `.env.local`

### Test the Integration

```bash
# Start development server
pnpm dev:shepherd

# Open http://localhost:3000
# Navigate to Donations section
# Try both one-time and recurring donations
```

#### Test Card Numbers (Stripe fallback)

- **Success:** 4242 4242 4242 4242
- **Decline:** 4000 0000 0000 0002

---

## 🚀 Step 4: Production Deployment

### Switch to Production Credentials

1. In Vipps Portal, switch to **Production** environment
2. Get production credentials
3. Update Vercel environment variables:

```env
# Production Vipps credentials
VIPPS_MERCHANT_SERIAL_NUMBER=your_production_msn
VIPPS_CLIENT_ID=your_production_client_id
VIPPS_CLIENT_SECRET=your_production_client_secret
VIPPS_SUBSCRIPTION_KEY=your_production_subscription_key

# Production Stripe credentials
STRIPE_SECRET_KEY=sk_live_your_live_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key

# Production URL
NEXT_PUBLIC_APP_URL=https://goodshepherdlanka.no
```

4. Redeploy on Vercel

---

## 🔔 Step 5: Configure Webhooks (Optional but Recommended)

### Setup Webhook URL in Vipps Portal

1. Go to Vipps Portal → Webhooks
2. Add webhook URL:

   ```
   https://goodshepherdlanka.no/api/vipps-webhook
   ```

3. Select events to receive:
   - ✅ Payment Completed
   - ✅ Payment Failed
   - ✅ Recurring Charge Successful
   - ✅ Recurring Charge Failed
   - ✅ Agreement Stopped

### Webhook Events You'll Receive

The webhook handler (`/api/vipps-webhook/route.ts`) will log:

- Payment completions
- Failed payments
- Monthly charge successes
- Monthly charge failures
- Cancelled subscriptions

**TODO:** Connect to your database to store donation records.

---

## 💰 Pricing Comparison

| Provider   | One-Time Fee     | Recurring Fee | Notes                     |
| ---------- | ---------------- | ------------- | ------------------------- |
| **Vipps**  | ~1.5% + 0.30 NOK | ~2 NOK/month  | Best for Norwegian donors |
| **Stripe** | 2.9% + 1.80 NOK  | ~8 NOK/month  | Good for international    |

### Example: NOK 250 donation

- Vipps: ~4.05 NOK fee (saves ~5 NOK vs Stripe)
- Stripe: ~9.05 NOK fee

**Annual savings with Vipps:** ~60 NOK per donor per year!

---

## 🎨 How It Looks to Donors

### One-Time Donation Flow

1. Donor clicks **"Pay with Vipps"** 🇳🇴
2. Redirects to Vipps (mobile app or web)
3. Donor approves payment
4. Returns to success page
5. Receipt sent via email

### Monthly Donation Flow (AvtaleGiro)

1. Donor clicks **"Set Up Monthly with Vipps"**
2. Redirects to Vipps to create agreement
3. Donor approves monthly payments
4. **First payment processed immediately**
5. **Subsequent payments automatic each month**
6. Donor can cancel anytime in Vipps app

---

## 🛠️ Files Created

### API Routes

- ✅ `/api/create-vipps-payment/route.ts` - One-time payments
- ✅ `/api/create-vipps-recurring/route.ts` - Monthly donations
- ✅ `/api/vipps-webhook/route.ts` - Payment notifications

### Configuration

- ✅ `src/lib/vipps.ts` - Vipps client setup

### Success Pages

- ✅ `/donate/success/page.tsx` - One-time donation success
- ✅ `/donate/recurring-success/page.tsx` - Monthly setup success

### Updated Components

- ✅ `Contributions.tsx` - Added Vipps payment buttons

---

## 🐛 Troubleshooting

### "Failed to create Vipps payment"

**Cause:** Missing or invalid credentials

**Fix:**

1. Check `.env.local` has all 4 Vipps variables
2. Verify credentials in Vipps Portal
3. Ensure you're using test credentials in development
4. Check console logs for detailed error

### "Vipps is not configured properly"

**Cause:** Environment variables not loaded

**Fix:**

```bash
# Restart development server
pnpm dev:shepherd
```

### Redirect Loop

**Cause:** Incorrect `NEXT_PUBLIC_APP_URL`

**Fix:**

```env
# Development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Production
NEXT_PUBLIC_APP_URL=https://your-actual-domain.com
```

### Webhook Not Receiving Events

**Cause:** Webhook URL not configured or incorrect

**Fix:**

1. Verify URL in Vipps Portal matches: `https://your-domain.com/api/vipps-webhook`
2. Ensure your app is deployed (webhooks won't work on localhost)
3. Check Vercel logs for incoming webhook requests

---

## 📞 Support

### Vipps Support

- Developer Portal: [developer.vippsmobilepay.com](https://developer.vippsmobilepay.com)
- Email: integration@vipps.no
- Slack: [Vipps Technical Community](https://vipps.slack.com)

### SDK Documentation

- GitHub: [github.com/vippsas/vipps-sdk-node](https://github.com/vippsas/vipps-sdk-node)
- API Docs: [developer.vippsmobilepay.com/docs](https://developer.vippsmobilepay.com/docs)

---

## ✅ Checklist

Before going live, ensure:

- [ ] Vipps production credentials added to Vercel
- [ ] Test one-time donation in production
- [ ] Test recurring donation in production
- [ ] Webhook URL configured in Vipps Portal
- [ ] Confirmed first webhook received
- [ ] Stripe still works as fallback
- [ ] Success pages display correctly
- [ ] Email receipts configured (Vipps auto-sends)
- [ ] Terms & Conditions updated (mention Vipps)

---

## 🎉 You're Done!

Your donors can now use:

- 🇳🇴 **Vipps** (one-time & monthly) - Lower fees, familiar to Norwegians
- 💳 **Stripe** (one-time & monthly) - International supporters

**AvtaleGiro is automatic with Vipps Recurring!** No extra setup needed. 🎊
