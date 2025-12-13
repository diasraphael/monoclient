import Image from "next/image";

export function Welcome() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-16 lg:py-24 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left Content */}
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-4">
              <div className="relative h-24 w-24 overflow-hidden rounded-full shadow-md ring-2 ring-rose-50 dark:ring-rose-900">
                <Image
                  src="/logo.jpg"
                  alt="Good Shepherd Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="rounded-full bg-rose-50 px-3 py-1 text-sm font-semibold text-rose-800 dark:bg-rose-900/30 dark:text-rose-400">
                Welcome to Good Shepherd
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
              Building the future together <br />
              <span className="bg-gradient-to-r from-rose-700 to-rose-900 bg-clip-text text-transparent">
                with Care & Compassion
              </span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Our foundation is to build these basic values based on christian
              values. The college depends on external funding. Our profile does
              not allow for fees and tuitions that would exclude the kind of
              students we aim to assist.
            </p>

            <div className="mt-10 flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"
                    />
                  ))}
                </div>
                <span>Caring more than 500+ children</span>
              </div>
              <div className="h-4 w-px bg-gray-300 dark:bg-gray-700" />
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★★★★★</span>
                <span>5.0 Rating</span>
              </div>
            </div>
          </div>

          {/* Right Image - Fully Visible */}
          <div className="relative lg:h-[600px]">
            {/* Decorative blob behind image - soft natural fade */}
            <div className="absolute -inset-8 rounded-3xl bg-gradient-to-r from-rose-700 to-rose-900 opacity-15 blur-3xl dark:opacity-30" />

            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-800">
              <Image
                src="/welcome.jpg"
                alt="Welcome to Good Shepherd Lanka"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
