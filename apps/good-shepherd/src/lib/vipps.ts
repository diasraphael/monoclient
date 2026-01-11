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

// Simplified type definitions for the APIs we use
// This avoids the TypeScript stack overflow from the SDK's complex recursive types
interface VippsAuthAPI {
  getToken: (
    clientId: string,
    clientSecret: string
  ) => Promise<{ access_token: string }>;
}

interface VippsCheckoutAPI {
  create: (
    clientId: string,
    clientSecret: string,
    payload: unknown
  ) => Promise<
    | { ok: true; data: { checkoutFrontendUrl: string } }
    | { ok: false; data?: unknown }
  >;
}

interface VippsRecurringAgreementAPI {
  create: (
    accessToken: string,
    payload: unknown
  ) => Promise<{
    vippsConfirmationUrl: string;
    agreementId: string;
  }>;
}

interface VippsRecurringAPI {
  agreement: VippsRecurringAgreementAPI;
  charge: unknown;
}

// Vipps client configuration
interface VippsConfig {
  clientId: string;
  clientSecret: string;
  merchantSerialNumber: string;
  subscriptionKey: string;
  useTestMode: boolean;
  retryRequests: boolean;
  systemName: string;
  systemVersion: string;
}

const vippsConfig: VippsConfig = {
  clientId: process.env.VIPPS_CLIENT_ID || "dummy_client_id_for_build",
  clientSecret:
    process.env.VIPPS_CLIENT_SECRET || "dummy_client_secret_for_build",
  merchantSerialNumber: process.env.VIPPS_MERCHANT_SERIAL_NUMBER || "123456",
  subscriptionKey:
    process.env.VIPPS_SUBSCRIPTION_KEY || "dummy_subscription_key",
  useTestMode: process.env.NODE_ENV !== "production",
  retryRequests: true,
  systemName: "Good Shepherd Lanka",
  systemVersion: "1.0.0",
};

// Create Vipps SDK client instance
// Use unknown to avoid TypeScript stack overflow, then cast to our simplified types
const vippsClient = Client(vippsConfig as never) as unknown as {
  auth: VippsAuthAPI;
  checkout: VippsCheckoutAPI;
  recurring: VippsRecurringAPI;
};

// Export the client APIs with proper types
export const authAPI: VippsAuthAPI = vippsClient.auth;
export const checkoutAPI: VippsCheckoutAPI = vippsClient.checkout;
export const recurringAPI: VippsRecurringAPI = vippsClient.recurring;

// Donation presets (same as Stripe for consistency)
export const VIPPS_DONATION_PRESETS = {
  single_child: 250,
  two_children: 500,
  four_children: 1000,
  ten_children: 2500,
  twenty_children: 5000,
} as const;

export type VippsDonationPreset = keyof typeof VIPPS_DONATION_PRESETS;
