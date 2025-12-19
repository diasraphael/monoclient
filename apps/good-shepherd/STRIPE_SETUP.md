# 🚀 Stripe Integration Setup Guide

Complete guide to configure Stripe donations for Good Shepherd Lanka.

---

## 📋 Prerequisites

- ✅ Stripe account (you already have this!)
- ✅ Access to Stripe Dashboard
- ✅ Node.js and pnpm installed
- ✅ Next.js app running

---

## Step 1: Get Your Stripe API Keys

### For Testing (Development):

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Make sure you're in **TEST MODE** (toggle in the top right)
3. Copy your keys:
   - **Publishable key**: Starts with `pk_test_...`
   - **Secret key**: Starts with `sk_test_...` (click "Reveal test key")

### For Production (Live):

1. Complete Stripe account verification
2. Switch to **LIVE MODE** in Stripe Dashboard
3. Go to [API Keys](https://dashboard.stripe.com/apikeys)
4. Copy your keys:
   - **Publishable key**: Starts with `pk_live_...`
   - **Secret key**: Starts with `sk_live_...`

---

## Step 2: Configure Environment Variables

### Create `.env.local` file:

In the `apps/good-shepherd/` directory, create a file named `.env.local`:

```bash
# apps/good-shepherd/.env.local

# Stripe API Keys (TEST MODE - for development)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Webhook Secret (optional for now)
# STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
```

### Replace the placeholders:

- Replace `pk_test_YOUR_PUBLISHABLE_KEY_HERE` with your actual publishable key
- Replace `sk_test_YOUR_SECRET_KEY_HERE` with your actual secret key

### Important Notes:

⚠️ **NEVER commit `.env.local` to Git** (it's already in `.gitignore`)
⚠️ **Secret key** should NEVER be exposed in client-side code
✅ **Publishable key** is safe to expose (starts with `NEXT_PUBLIC_`)

---

## Step 3: Restart Your Dev Server

After adding environment variables, restart your Next.js dev server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
pnpm dev:shepherd
```

---

## Step 4: Test the Donation Flow

### Using Test Cards:

Stripe provides test card numbers that won't charge real money:

#### ✅ Successful Payment:

```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

#### ❌ Card Declined:

```
Card Number: 4000 0000 0000 0002
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

#### 🔐 Requires Authentication (3D Secure):

```
Card Number: 4000 0025 0000 3155
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

### Test Flow:

1. Go to your website: `http://localhost:3000`
2. Scroll to the **Contributions** section
3. Click "**Donate Now 🚀**" button
4. Select an amount or enter custom amount
5. Choose One-Time or Monthly
6. Click "**Proceed to Secure Checkout**"
7. You'll be redirected to Stripe Checkout
8. Use test card: `4242 4242 4242 4242`
9. Complete the payment
10. You'll be redirected to the Success page

---

## Step 5: View Payments in Stripe Dashboard

1. Go to [Stripe Dashboard → Payments](https://dashboard.stripe.com/test/payments)
2. You'll see all test payments
3. Click on a payment to see details
4. Test payments show "TEST MODE" badge

---

## Step 6: Going Live (Production)

### When ready for real donations:

1. **Complete Stripe Verification**:
   - Business information
   - Bank account details
   - Identity verification

2. **Get Live API Keys**:
   - Switch to LIVE MODE in Stripe Dashboard
   - Copy live keys (start with `pk_live_` and `sk_live_`)

3. **Update Environment Variables**:

   ```bash
   # Production .env.local (or hosting platform env vars)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
   STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_KEY
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   ```

4. **Deploy Your App**:
   - Push to production
   - Add environment variables in hosting platform (Vercel, etc.)
   - Test with a small real donation

---

## Step 7: Setup Webhooks (Optional but Recommended)

Webhooks allow you to track successful payments server-side.

### Create Webhook Endpoint:

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/test/webhooks)
2. Click "**Add endpoint**"
3. Enter URL: `https://yourdomain.com/api/webhook` (for production)
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `charge.succeeded`
5. Copy the **Signing secret** (starts with `whsec_`)
6. Add to `.env.local`:
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
   ```

### Webhook is already implemented at:

- `apps/good-shepherd/src/app/api/webhook/route.ts`

---

## 📊 Features Included

### ✅ Implemented:

- 💳 Stripe Checkout integration
- 💰 Preset donation amounts (250, 500, 1000, 2500, 5000 NOK)
- ✏️ Custom amount input
- 🔄 One-time and recurring (monthly) donations
- 📱 Mobile-responsive donation modal
- ✅ Success page with thank you message
- ❌ Cancel page for incomplete donations
- 🔒 Secure payment processing (PCI compliant)
- 📧 Automatic email receipts from Stripe
- 🎨 Beautiful UI matching your maroon theme

### 🎯 How It Works:

1. User clicks "Donate Now" button
2. Modal opens with amount selection
3. User chooses one-time or monthly
4. Clicks "Proceed to Secure Checkout"
5. Next.js API creates Stripe checkout session
6. User redirected to Stripe's secure checkout page
7. After payment, redirected back to your site
8. Success or cancel page displayed

---

## 🧪 Testing Checklist

- [ ] Environment variables are set
- [ ] Dev server restarted
- [ ] Donation modal opens
- [ ] Can select preset amounts
- [ ] Can enter custom amount
- [ ] Can toggle one-time/monthly
- [ ] Checkout session creates successfully
- [ ] Redirects to Stripe Checkout
- [ ] Can complete test payment
- [ ] Success page displays
- [ ] Can cancel and return
- [ ] Payment appears in Stripe Dashboard

---

## 🆘 Troubleshooting

### Error: "Stripe is not configured properly"

**Solution**: Check that environment variables are set correctly and dev server was restarted.

### Error: "STRIPE_SECRET_KEY is not set"

**Solution**: Add `STRIPE_SECRET_KEY` to `.env.local` file.

### Redirect not working

**Solution**: Ensure `NEXT_PUBLIC_APP_URL` is set correctly (include http:// or https://).

### Test card not working

**Solution**: Make sure you're in TEST MODE in Stripe Dashboard and using test keys (pk*test* and sk*test*).

### Payment succeeds but no email receipt

**Solution**: Stripe sends receipts to the email entered during checkout. Check spam folder.

---

## 📞 Support

If you need help:

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com/)
- [Stripe Discord Community](https://discord.gg/stripe)

---

## 🎉 You're All Set!

Your Good Shepherd Lanka website now has a professional, secure donation system powered by Stripe!

Test it thoroughly in TEST MODE before switching to LIVE MODE for real donations.

**Good luck and thank you for making a difference!** 🙏✨
