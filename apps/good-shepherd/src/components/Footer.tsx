import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gradient-to-b from-gray-50 to-gray-100 dark:border-gray-800 dark:from-gray-950 dark:to-gray-900">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <div className="relative h-16 w-16 overflow-hidden rounded-full shadow-md">
                <Image
                  src="/logo.jpg"
                  alt="Good Shepherd Lanka"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                Good Shepherd Lanka
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Building the future together with Care & Compassion.
            </p>
          </div>

          {/* Get in Touch */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
              Get in Touch
            </h3>
            <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
              We would really love to hear from you !!!
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-800 transition-colors hover:bg-rose-800 hover:text-white dark:bg-rose-900/30 dark:text-rose-400 dark:hover:bg-rose-800"
              >
                📧
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-800 transition-colors hover:bg-rose-800 hover:text-white dark:bg-rose-900/30 dark:text-rose-400 dark:hover:bg-rose-800"
              >
                📱
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-800 transition-colors hover:bg-rose-800 hover:text-white dark:bg-rose-900/30 dark:text-rose-400 dark:hover:bg-rose-800"
              >
                📍
              </a>
            </div>
          </div>

          {/* How to Contact */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
              How to Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:Collegegoodshepherd@gmail.com"
                  className="flex items-start gap-2 text-gray-600 transition-colors hover:text-rose-800 dark:text-gray-400 dark:hover:text-rose-400"
                >
                  <span className="mt-0.5">📧</span>
                  <span className="break-all">
                    Collegegoodshepherd@gmail.com
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+4795139300"
                  className="flex items-center gap-2 text-gray-600 transition-colors hover:text-rose-800 dark:text-gray-400 dark:hover:text-rose-400"
                >
                  <span>📞</span>
                  <span>+47 95139300</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+4795881223"
                  className="flex items-center gap-2 text-gray-600 transition-colors hover:text-rose-800 dark:text-gray-400 dark:hover:text-rose-400"
                >
                  <span>📱</span>
                  <span>+47 95881223</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Where to Find Us */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
              Where to Find Us
            </h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p className="font-semibold text-gray-900 dark:text-white">
                Good Shepherd Sri Lanka
              </p>
              <p>Stålfjæra 20</p>
              <p>0975 Oslo</p>
              <p>Norway</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Good Shepherd Lanka. All rights
              reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a
                href="#"
                className="text-gray-500 transition-colors hover:text-rose-800 dark:text-gray-400 dark:hover:text-rose-400"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-500 transition-colors hover:text-rose-800 dark:text-gray-400 dark:hover:text-rose-400"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
