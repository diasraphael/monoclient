# ⚡ Stripe Quick Start (5 Minutes)

Get your donation system running in 5 minutes!

## 1️⃣ Get Stripe Keys (2 min)

1. Go to: https://dashboard.stripe.com/test/apikeys
2. Make sure **TEST MODE** is on (toggle in top right)
3. Copy these two keys:
   - Publishable key: `pk_test_...`
   - Secret key: `sk_test_...` (click "Reveal test key")

## 2️⃣ Add Keys to Your App (1 min)

Create file: `apps/good-shepherd/.env.local`

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Replace `YOUR_KEY_HERE` with your actual keys from step 1.

## 3️⃣ Restart Server (1 min)

```bash
# Stop current server (Ctrl+C)
# Then restart:
pnpm dev:shepherd
```

## 4️⃣ Test Donation (1 min)

1. Go to: http://localhost:3000
2. Scroll to **Contributions** section
3. Click **"Donate Now 🚀"**
4. Select amount or enter custom
5. Click **"Proceed to Secure Checkout"**
6. Use test card:
   ```
   Card: 4242 4242 4242 4242
   Expiry: 12/25
   CVC: 123
   ZIP: 12345
   ```
7. Complete payment → Success! ✅

## ✅ Done!

Your donation system is live! View test payments at:
https://dashboard.stripe.com/test/payments

---

## 🚀 Go Live When Ready

See full guide: [STRIPE_SETUP.md](./STRIPE_SETUP.md)

1. Complete Stripe verification
2. Get LIVE keys (start with `pk_live_` and `sk_live_`)
3. Update `.env.local` with live keys
4. Deploy!

---

## 🆘 Problems?

**Can't find .env.local?**

- Create it in `apps/good-shepherd/` folder
- It should be next to `package.json`

**Server not recognizing keys?**

- Make sure you restarted the server
- Check file is named exactly `.env.local` (with the dot)

**Test card not working?**

- Verify you're in TEST MODE in Stripe Dashboard
- Make sure you're using TEST keys (pk*test*, sk*test*)

---

**Need more help?** See: [STRIPE_SETUP.md](./STRIPE_SETUP.md)
