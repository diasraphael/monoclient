import Image from "next/image";

import { CallToAction } from "./CallToAction";
import { Features } from "./Features";
import { Hero } from "./Hero";

function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <span className="text-lg font-bold text-gray-900 dark:text-white">
          Good Shepherd Lanka
        </span>

        <nav className="flex gap-8">
          {["Home", "About", "Services", "Contact"].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-rose-800 dark:text-gray-300 dark:hover:text-rose-400"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-12 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="relative h-16 w-16 overflow-hidden rounded-full grayscale">
              <Image
                src="/logo.jpg"
                alt="Good Shepherd Lanka"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-base font-semibold text-gray-900 dark:text-white">
              Good Shepherd Lanka
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Good Shepherd Lanka. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
      <Navigation />
      <main className="flex-1">
        <Hero />
        <Features />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
