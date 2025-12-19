"use client";

import { useState } from "react";

import { getStripe } from "@/lib/stripe-client";

type DonationPreset = {
  amount: number;
  label: string;
  description: string;
};

const DONATION_PRESETS: DonationPreset[] = [
  { amount: 250, label: "NOK 250", description: "Support 1 child" },
  { amount: 500, label: "NOK 500", description: "Support 2 children" },
  { amount: 1000, label: "NOK 1,000", description: "Support 4 children" },
  { amount: 2500, label: "NOK 2,500", description: "Support 10 children" },
  { amount: 5000, label: "NOK 5,000", description: "Support 20 children" },
];

export function Contributions() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(250);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDonate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const amount = customAmount ? parseFloat(customAmount) : selectedAmount;

      if (isNaN(amount) || amount < 50) {
        setError("Please enter an amount of at least NOK 50");
        setIsLoading(false);
        return;
      }

      // Call API to create checkout session
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          isRecurring,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe Checkout
      const stripe = await getStripe();
      if (stripe && data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Stripe is not configured properly");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contributions"
      className="bg-gradient-to-b from-white to-gray-50 py-24 dark:from-gray-900 dark:to-gray-950"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Contributions
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            We are requesting your support.
          </p>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-5xl space-y-12">
          {/* Introduction Card */}
          <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900 md:p-12">
            <div className="absolute right-0 top-0 h-64 w-64 -translate-y-32 translate-x-32 rounded-full bg-gradient-to-br from-rose-700 to-rose-900 opacity-10 blur-3xl" />

            <div className="relative space-y-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              <p>
                External funding is necessary to meet current and future
                financial responsibilities and challenges to fulfill the dreams
                of the emerging young generation. Your support will be channeled
                through the norwegian registered foundation{" "}
                <span className="font-semibold text-rose-800 dark:text-rose-400">
                  &quot;Good Shepherd Srilanka&quot;
                </span>
              </p>

              <p>
                The foundation is answerable for maintaining regular contact
                with the college in Batticola, for guaranteeing financial
                transparency and bookkeeping in accordance with Norwegian
                standards. The foundation is also responsible for giving our
                supporters regular and updated information from our friends in
                Batticola.
              </p>

              <p className="text-xl font-medium text-gray-900 dark:text-white">
                We hope you will lend your benevolent hands to build the dreams
                of the new generation. Be one of our supporters.
              </p>
            </div>
          </div>

          {/* Donate Online Section */}
          <div className="relative overflow-hidden rounded-3xl border-2 border-rose-800 bg-gradient-to-br from-rose-50 to-white p-8 shadow-2xl dark:border-rose-700 dark:from-rose-900/20 dark:to-gray-900 md:p-12">
            <div className="absolute right-0 top-0 h-64 w-64 -translate-y-16 translate-x-16 rounded-full bg-gradient-to-br from-rose-700 to-rose-900 opacity-20 blur-3xl" />

            <div className="relative text-center">
              <div className="mb-6 text-6xl">💳</div>
              <h3 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                Donate Online with Stripe
              </h3>
              <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
                Quick, secure, and easy online donations. Support children in
                Sri Lanka with just a few clicks.
              </p>
              <button
                onClick={() => setShowDonateModal(true)}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-rose-700 to-rose-900 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl"
              >
                <span className="relative z-10">Donate Now 🚀</span>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-800 to-rose-950 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Secured by Stripe • SSL Encrypted • Instant Receipt
              </p>
            </div>
          </div>

          {/* Impact Statement */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* Need Card */}
            <div className="group rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 shadow-md transition-all hover:shadow-xl dark:border-gray-800 dark:from-gray-900 dark:to-gray-800">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-3xl transition-transform group-hover:scale-110 dark:bg-rose-900/30">
                🤝
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                The Need
              </h3>
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                Due to poverty these families cannot afford to send their
                children to a school of a good standard. We are close with the
                parents of these unprivileged children to provide a better
                future for the children.
              </p>
            </div>

            {/* Impact Card */}
            <div className="group rounded-2xl border border-rose-800 bg-gradient-to-br from-rose-700 to-rose-900 p-8 shadow-md transition-all hover:shadow-xl dark:border-rose-700">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl backdrop-blur-sm transition-transform group-hover:scale-110">
                ✨
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">
                Your Impact
              </h3>
              <p className="mb-4 leading-relaxed text-rose-50">
                Join hands to uplift a generation. A kid requires{" "}
                <span className="text-2xl font-bold text-white">NOK 250</span>{" "}
                to bright up his/her future.
              </p>
              <div className="inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                Make a difference today
              </div>
            </div>
          </div>

          {/* Banking Details */}
          <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900 md:p-12">
            <div className="absolute left-0 top-0 h-64 w-64 -translate-x-32 -translate-y-32 rounded-full bg-gradient-to-br from-rose-700 to-rose-900 opacity-10 blur-3xl" />

            <div className="relative">
              <h3 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
                Banking Details
              </h3>

              <div className="mx-auto max-w-md space-y-4">
                {/* Account Number */}
                <div className="group rounded-xl border border-gray-200 bg-gray-50 p-6 transition-all hover:border-rose-800 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-rose-400">
                  <div className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Account Number
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="font-mono text-xl font-bold text-gray-900 dark:text-white">
                      3000.65.25713
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard("3000.65.25713", "account")
                      }
                      className="rounded-lg bg-rose-100 px-3 py-2 text-sm font-medium text-rose-800 transition-colors hover:bg-rose-800 hover:text-white dark:bg-rose-900/30 dark:text-rose-400 dark:hover:bg-rose-800 dark:hover:text-white"
                    >
                      {copiedField === "account" ? "✓ Copied" : "Copy"}
                    </button>
                  </div>
                </div>

                {/* IBAN Number */}
                <div className="group rounded-xl border border-gray-200 bg-gray-50 p-6 transition-all hover:border-rose-800 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-rose-400">
                  <div className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    IBAN Number
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="font-mono text-xl font-bold text-gray-900 dark:text-white">
                      NO6230006525713
                    </div>
                    <button
                      onClick={() => copyToClipboard("NO6230006525713", "iban")}
                      className="rounded-lg bg-rose-100 px-3 py-2 text-sm font-medium text-rose-800 transition-colors hover:bg-rose-800 hover:text-white dark:bg-rose-900/30 dark:text-rose-400 dark:hover:bg-rose-800 dark:hover:text-white"
                    >
                      {copiedField === "iban" ? "✓ Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 border-t border-gray-200 pt-8 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🔒</span>
                  <span>Secure Transfer</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">📊</span>
                  <span>Full Transparency</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🇳🇴</span>
                  <span>Norwegian Registered</span>
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <p className="text-lg italic text-gray-600 dark:text-gray-400">
              Every contribution, no matter the size, brings hope and
              opportunity to a child in need.
            </p>
          </div>
        </div>
      </div>

      {/* Donation Modal */}
      {showDonateModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setShowDonateModal(false)}
          onKeyDown={e => e.key === "Escape" && setShowDonateModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="donation-modal-title"
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl dark:border-gray-800 dark:bg-gray-900"
            onClick={e => e.stopPropagation()}
            role="document"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowDonateModal(false)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-2xl text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              ×
            </button>

            {/* Modal Header */}
            <div className="mb-8 text-center">
              <div className="mb-4 text-5xl">❤️</div>
              <h2
                id="donation-modal-title"
                className="mb-2 text-3xl font-bold text-gray-900 dark:text-white"
              >
                Make a Donation
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Your support changes lives
              </p>
            </div>

            {/* Donation Type Toggle */}
            <div className="mb-8">
              <div className="flex gap-2 rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
                <button
                  onClick={() => setIsRecurring(false)}
                  className={`flex-1 rounded-lg px-6 py-3 text-sm font-semibold transition-all ${
                    !isRecurring
                      ? "bg-white text-rose-800 shadow-md dark:bg-gray-700 dark:text-rose-400"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                  }`}
                >
                  One-Time
                </button>
                <button
                  onClick={() => setIsRecurring(true)}
                  className={`flex-1 rounded-lg px-6 py-3 text-sm font-semibold transition-all ${
                    isRecurring
                      ? "bg-white text-rose-800 shadow-md dark:bg-gray-700 dark:text-rose-400"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>

            {/* Preset Amounts */}
            <div className="mb-6">
              <div className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Select Amount
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {DONATION_PRESETS.map(preset => (
                  <button
                    key={preset.amount}
                    onClick={() => {
                      setSelectedAmount(preset.amount);
                      setCustomAmount("");
                    }}
                    className={`rounded-xl border-2 p-4 text-left transition-all ${
                      selectedAmount === preset.amount && !customAmount
                        ? "border-rose-800 bg-rose-50 dark:border-rose-700 dark:bg-rose-900/30"
                        : "border-gray-200 hover:border-rose-400 dark:border-gray-700 dark:hover:border-rose-600"
                    }`}
                  >
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {preset.label}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {preset.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="mb-8">
              <label
                htmlFor="custom-amount"
                className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Or Enter Custom Amount (NOK)
              </label>
              <input
                id="custom-amount"
                type="number"
                min="50"
                step="10"
                placeholder="Enter amount (min. NOK 50)"
                value={customAmount}
                onChange={e => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(0);
                }}
                className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-lg font-semibold text-gray-900 transition-colors focus:border-rose-800 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-rose-400"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/30 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Summary */}
            <div className="mb-8 rounded-xl bg-gray-50 p-6 dark:bg-gray-800">
              <div className="mb-2 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Donation Type:</span>
                <span className="font-semibold">
                  {isRecurring ? "Monthly Recurring" : "One-Time"}
                </span>
              </div>
              <div className="flex items-baseline justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  Total:
                </span>
                <span className="text-3xl font-bold text-rose-800 dark:text-rose-400">
                  NOK {customAmount || selectedAmount}
                  {isRecurring && (
                    <span className="text-base font-normal">/month</span>
                  )}
                </span>
              </div>
            </div>

            {/* Donate Button */}
            <button
              onClick={handleDonate}
              disabled={isLoading}
              className="w-full rounded-xl bg-gradient-to-r from-rose-700 to-rose-900 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Processing...
                </span>
              ) : (
                <>Proceed to Secure Checkout</>
              )}
            </button>

            {/* Trust Badges */}
            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <span>🔒</span>
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-1">
                <span>💳</span>
                <span>Stripe</span>
              </div>
              <div className="flex items-center gap-1">
                <span>📧</span>
                <span>Instant Receipt</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
