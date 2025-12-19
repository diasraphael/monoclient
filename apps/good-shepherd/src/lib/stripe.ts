import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
}

// Initialize Stripe with your secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
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
