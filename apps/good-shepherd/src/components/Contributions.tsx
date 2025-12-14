"use client";

import { useState } from "react";

export function Contributions() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-24 dark:from-gray-900 dark:to-gray-950">
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
    </section>
  );
}
