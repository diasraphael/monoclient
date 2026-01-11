import Link from "next/link";

export default function RecurringSuccessPage({
  searchParams,
}: {
  searchParams: { agreementId?: string };
}) {
  const agreementId = searchParams.agreementId;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 to-white px-4 dark:from-gray-900 dark:to-gray-950">
      <div className="w-full max-w-2xl rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-2xl dark:border-gray-800 dark:bg-gray-900 md:p-12">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 text-5xl dark:bg-orange-900/30">
            🎉
          </div>
        </div>

        {/* Thank You Message */}
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          Monthly Support Activated! 💙
        </h1>

        <p className="mb-6 text-xl text-gray-600 dark:text-gray-300">
          Your recurring donation has been successfully set up with Vipps.
        </p>

        <div className="mb-8 rounded-2xl bg-gradient-to-br from-orange-50 to-white p-6 dark:bg-gray-800">
          <p className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
            You&apos;re now a monthly supporter! 🇳🇴
          </p>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>✅ First payment processed successfully</p>
            <p>✅ AvtaleGiro activated for automatic monthly payments</p>
            <p>✅ Confirmation email sent</p>
          </div>
          {agreementId && (
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Agreement ID: <span className="font-mono">{agreementId}</span>
            </p>
          )}
        </div>

        {/* What Happens Next */}
        <div className="mb-8 rounded-2xl border-2 border-orange-500 bg-white p-6 text-left dark:border-orange-600 dark:bg-gray-900">
          <h2 className="mb-4 text-center text-xl font-bold text-gray-900 dark:text-white">
            What Happens Next?
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-2xl">📅</span>
              <span>
                <strong>Automatic Monthly Charges:</strong> Your donation will
                be automatically processed each month via AvtaleGiro
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">📧</span>
              <span>
                <strong>Monthly Receipts:</strong> You&apos;ll receive a receipt
                after each donation
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🛑</span>
              <span>
                <strong>Cancel Anytime:</strong> Manage or cancel your
                subscription in the Vipps app
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">💌</span>
              <span>
                <strong>Impact Updates:</strong> We&apos;ll keep you informed
                about how your support is making a difference
              </span>
            </li>
          </ul>
        </div>

        {/* Impact Statement */}
        <div className="mb-8 rounded-2xl bg-gradient-to-br from-rose-700 to-rose-900 p-6 text-white">
          <p className="mb-2 text-2xl font-bold">
            You&apos;re Changing Lives! 🌟
          </p>
          <p className="text-rose-100">
            Your monthly support provides consistent education opportunities for
            children at Good Shepherd Lanka
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
            href="/#gallery"
            className="rounded-xl border-2 border-rose-700 bg-white px-8 py-4 text-lg font-bold text-rose-700 shadow-lg transition-all hover:bg-rose-50 dark:border-rose-600 dark:bg-gray-900 dark:text-rose-400 dark:hover:bg-gray-800"
          >
            See Our Impact
          </Link>
        </div>

        {/* Manage Subscription Info */}
        <div className="mt-8 rounded-xl bg-gray-50 p-4 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-400">
          <p>
            <strong>To manage or cancel your subscription:</strong>
            <br />
            Open the Vipps app → Profile → Agreements → Good Shepherd Lanka
          </p>
        </div>
      </div>
    </div>
  );
}
