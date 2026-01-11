import Link from "next/link";

export default function DonateSuccessPage({
  searchParams,
}: {
  searchParams: { reference?: string; provider?: string };
}) {
  const reference = searchParams.reference;
  const provider = searchParams.provider || "stripe";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 to-white px-4 dark:from-gray-900 dark:to-gray-950">
      <div className="w-full max-w-2xl rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-2xl dark:border-gray-800 dark:bg-gray-900 md:p-12">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-5xl dark:bg-green-900/30">
            ✅
          </div>
        </div>

        {/* Thank You Message */}
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          Thank You! 🙏
        </h1>

        <p className="mb-6 text-xl text-gray-600 dark:text-gray-300">
          Your donation has been successfully processed.
        </p>

        <div className="mb-8 rounded-2xl bg-gray-50 p-6 dark:bg-gray-800">
          <p className="mb-2 text-lg text-gray-900 dark:text-white">
            Your generosity will help educate children at Good Shepherd Lanka.
          </p>
          {reference && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Reference: <span className="font-mono">{reference}</span>
            </p>
          )}
          {provider === "vipps" && (
            <p className="mt-2 text-sm text-orange-600 dark:text-orange-400">
              Paid with Vipps 🇳🇴
            </p>
          )}
        </div>

        {/* Impact Statement */}
        <div className="mb-8 rounded-2xl border-2 border-rose-800 bg-gradient-to-br from-rose-50 to-white p-6 dark:border-rose-700 dark:from-rose-900/20 dark:to-gray-900">
          <p className="text-lg font-medium text-gray-900 dark:text-white">
            You&apos;re making a real difference! 💙
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            A receipt has been sent to your email.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-xl bg-gradient-to-r from-rose-700 to-rose-900 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            Return to Home
          </Link>

          <Link
            href="/#contributions"
            className="rounded-xl border-2 border-rose-700 bg-white px-8 py-4 text-lg font-bold text-rose-700 shadow-lg transition-all hover:bg-rose-50 dark:border-rose-600 dark:bg-gray-900 dark:text-rose-400 dark:hover:bg-gray-800"
          >
            Make Another Donation
          </Link>
        </div>

        {/* Social Sharing (Optional) */}
        <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-700">
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Help us spread the word:
          </p>
          <div className="flex justify-center gap-4">
            <button className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700">
              Share on Facebook
            </button>
            <button className="rounded-lg bg-sky-500 px-6 py-2 text-sm font-medium text-white transition-all hover:bg-sky-600">
              Share on Twitter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
