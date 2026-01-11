import { Client } from "@vippsmobilepay/sdk";

// Vipps credentials validation
if (typeof window === "undefined" && process.env.NODE_ENV !== "production") {
  if (!process.env.VIPPS_CLIENT_ID) {
    console.warn("VIPPS_CLIENT_ID is not set. Vipps payments will not work.");
  }
  if (!process.env.VIPPS_CLIENT_SECRET) {
    console.warn(
      "VIPPS_CLIENT_SECRET is not set. Vipps payments will not work."
    );
  }
  if (!process.env.VIPPS_MERCHANT_SERIAL_NUMBER) {
    console.warn(
      "VIPPS_MERCHANT_SERIAL_NUMBER is not set. Vipps payments will not work."
    );
  }
  if (!process.env.VIPPS_SUBSCRIPTION_KEY) {
    console.warn(
      "VIPPS_SUBSCRIPTION_KEY is not set. Vipps payments will not work."
    );
  }
}

// Create Vipps SDK client instance
// This client has properties: checkout, recurring.agreement, recurring.charge, etc.
const vippsClient = Client({
  clientId: process.env.VIPPS_CLIENT_ID || "dummy_client_id_for_build",
  clientSecret:
    process.env.VIPPS_CLIENT_SECRET || "dummy_client_secret_for_build",
  merchantSerialNumber: process.env.VIPPS_MERCHANT_SERIAL_NUMBER || "123456",
  subscriptionKey:
    process.env.VIPPS_SUBSCRIPTION_KEY || "dummy_subscription_key",
  useTestMode: process.env.NODE_ENV !== "production", // Use test environment for development
  retryRequests: true,
  systemName: "Good Shepherd Lanka",
  systemVersion: "1.0.0",
});

// Export the client APIs
export const authAPI = vippsClient.auth;
export const checkoutAPI = vippsClient.checkout;
export const recurringAPI = vippsClient.recurring;

// Donation presets (same as Stripe for consistency)
export const VIPPS_DONATION_PRESETS = {
  single_child: 250,
  two_children: 500,
  four_children: 1000,
  ten_children: 2500,
  twenty_children: 5000,
} as const;

export type VippsDonationPreset = keyof typeof VIPPS_DONATION_PRESETS;
