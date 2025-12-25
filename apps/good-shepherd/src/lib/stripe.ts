import Stripe from "stripe";

// Validate Stripe key is set (allow dummy values during build)
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";

if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
}

// Initialize Stripe with your secret key
export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-11-17.clover",
  typescript: true,
});

// Donation amount presets in NOK
export const DONATION_PRESETS = {
  single_child: 250,
  two_children: 500,
  four_children: 1000,
  ten_children: 2500,
  twenty_children: 5000,
} as const;

export type DonationPreset = keyof typeof DONATION_PRESETS;
