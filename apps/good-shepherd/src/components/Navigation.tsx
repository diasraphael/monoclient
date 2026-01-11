"use client";

import { useEffect, useState } from "react";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Donate", href: "#contributions" },
    { name: "Contact", href: "#contact" },
  ];

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Trigger animation when menu opens
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Small delay to ensure DOM is ready
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    }
  }, [isMobileMenuOpen]);

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
    }, 300); // Match the transition duration
  };

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    // Close mobile menu after navigation
    closeMobileMenu();
  };

  const handleDonateClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Trigger the donation modal by clicking the hidden donate button in Contributions section
    const donateButton = document.querySelector(
      "[data-donate-trigger]"
    ) as HTMLButtonElement;
    if (donateButton) {
      donateButton.click();
    }
    // Close mobile menu after opening donate modal
    closeMobileMenu();
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a
            href="#home"
            onClick={e => handleScroll(e, "#home")}
            className="text-lg font-bold text-gray-900 transition-colors hover:text-rose-800 dark:text-white dark:hover:text-rose-400"
          >
            Good Shepherd Lanka
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                onClick={e => handleScroll(e, link.href)}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-rose-800 dark:text-gray-300 dark:hover:text-rose-400"
              >
                {link.name}
              </a>
            ))}

            {/* Donate Button - Prominent CTA */}
            <a
              href="#donate"
              onClick={handleDonateClick}
              className="rounded-full bg-rose-800 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-rose-900 hover:shadow-lg dark:bg-rose-700 dark:hover:bg-rose-800"
            >
              Donate Now
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={openMobileMenu}
            className="md:hidden relative z-50 rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-rose-800 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-rose-400"
            aria-label="Open menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
              isAnimating ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          {/* Mobile Menu Panel */}
          <div
            className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:bg-gray-900 md:hidden ${
              isAnimating ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                Menu
              </span>
              <button
                onClick={closeMobileMenu}
                className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-rose-800 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-rose-400"
                aria-label="Close menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Links */}
            <nav className="flex flex-col px-6 py-8">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={e => handleScroll(e, link.href)}
                  className="group flex items-center justify-between border-b border-gray-100 py-4 text-lg font-medium text-gray-900 transition-all hover:text-rose-800 dark:border-gray-800 dark:text-white dark:hover:text-rose-400"
                  style={{
                    animation: `slideInRight 0.3s ease-out ${index * 0.05}s both`,
                  }}
                >
                  <span>{link.name}</span>
                  <svg
                    className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-rose-800 dark:group-hover:text-rose-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              ))}
            </nav>

            {/* Mobile Donate Button */}
            <div className="border-t border-gray-200 px-6 py-6 dark:border-gray-800">
              <a
                href="#donate"
                onClick={handleDonateClick}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-700 to-rose-900 px-6 py-4 text-lg font-bold text-white shadow-lg transition-all hover:shadow-xl dark:from-rose-800 dark:to-rose-950"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Donate Now
              </a>
            </div>

            {/* Mobile Menu Footer */}
            <div className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
              <p>Good Shepherd Lanka</p>
              <p className="mt-1">Building futures with care</p>
            </div>
          </div>
        </>
      )}

      {/* CSS Animation for slide-in effect */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
