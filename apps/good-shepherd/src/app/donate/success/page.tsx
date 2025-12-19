import Link from "next/link";

export default function DonationSuccess() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4 dark:from-gray-900 dark:to-gray-950">
      <div className="mx-auto max-w-2xl text-center">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-rose-700 to-rose-900 text-5xl text-white shadow-2xl">
            ✓
          </div>
        </div>

        {/* Heading */}
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
          Thank You for Your Generosity!
        </h1>

        {/* Message */}
        <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
          <p>
            Your donation to Good Shepherd Lanka has been successfully
            processed. You will receive a confirmation email shortly.
          </p>
          <p className="text-xl font-semibold text-rose-800 dark:text-rose-400">
            Your support will directly impact the lives of children in
            Batticaloa, Sri Lanka.
          </p>
          <p>
            With your help, we can continue to provide quality education and
            care to children from underprivileged families, building a brighter
            future for the next generation.
          </p>
        </div>

        {/* Stats */}
        <div className="my-12 grid grid-cols-3 gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-gray-900">
          <div>
            <div className="text-3xl font-bold text-rose-800 dark:text-rose-400">
              500+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Children Helped
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-rose-800 dark:text-rose-400">
              2009
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Since
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-rose-800 dark:text-rose-400">
              100%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Transparency
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-lg bg-gradient-to-r from-rose-700 to-rose-900 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            Return to Homepage
          </Link>
          <Link
            href="/#gallery"
            className="rounded-lg border border-gray-300 bg-white px-8 py-3 font-semibold text-gray-700 transition-all hover:border-rose-800 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-rose-400"
          >
            View Our Work
          </Link>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Questions about your donation?{" "}
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
