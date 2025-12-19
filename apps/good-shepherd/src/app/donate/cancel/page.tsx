import Link from "next/link";

export default function DonationCancel() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4 dark:from-gray-900 dark:to-gray-950">
      <div className="mx-auto max-w-2xl text-center">
        {/* Cancel Icon */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 text-5xl text-gray-600 shadow-lg dark:bg-gray-800 dark:text-gray-400">
            ↩
          </div>
        </div>

        {/* Heading */}
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
          Donation Cancelled
        </h1>

        {/* Message */}
        <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
          <p>Your donation was not completed. No charges have been made.</p>
          <p>
            We understand that circumstances change. If you&apos;d like to try
            again or have any questions, we&apos;re here to help.
          </p>
        </div>

        {/* Info Box */}
        <div className="my-12 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900">
          <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Every Contribution Matters
          </h3>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Just{" "}
            <span className="font-bold text-rose-800 dark:text-rose-400">
              NOK 250
            </span>{" "}
            can provide educational support for one child for a year.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your support helps us provide quality education and care to children
            from underprivileged families in Batticaloa, Sri Lanka.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/#contributions"
            className="rounded-lg bg-gradient-to-r from-rose-700 to-rose-900 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-gray-300 bg-white px-8 py-3 font-semibold text-gray-700 transition-all hover:border-rose-800 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-rose-400"
          >
            Return to Homepage
          </Link>
        </div>

        {/* Contact */}
        <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Need assistance?{" "}
            <a
              href="mailto:Collegegoodshepherd@gmail.com"
              className="text-rose-800 hover:underline dark:text-rose-400"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
