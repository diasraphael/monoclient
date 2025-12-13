import Image from "next/image";

export function AboutUs() {
  return (
    <section className="bg-gray-50 py-24 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/about-us.jpg"
                alt="About Good Shepherd Lanka"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-rose-700 to-rose-900 opacity-10 blur-3xl dark:opacity-20" />
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <div className="mb-4 inline-block rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-800 dark:bg-rose-900/30 dark:text-rose-400">
              Our Story
            </div>

            <h2 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
              About Us
            </h2>

            <div className="space-y-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              <p className="text-xl font-medium text-rose-800 dark:text-rose-400">
                Education is the way out of poverty, but it isn&apos;t provided
                equally.
              </p>

              <p>
                This is the condition for many families in the Srilankan
                Batticaloa region. In 2009 the Good Shepherd College was
                established. The single-mindedness of the college is to afford
                an opportunity for children and youngsters from underprivileged
                families.
              </p>

              <p>
                Education is not just about skills and facts, but also about
                basic values.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-6">
              <div className="rounded-xl border border-gray-200 bg-white p-4 text-center dark:border-gray-800 dark:bg-gray-900">
                <div className="text-3xl font-bold text-rose-800 dark:text-rose-400">
                  2009
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Established
                </div>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4 text-center dark:border-gray-800 dark:bg-gray-900">
                <div className="text-3xl font-bold text-rose-800 dark:text-rose-400">
                  500+
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Children
                </div>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4 text-center dark:border-gray-800 dark:bg-gray-900">
                <div className="text-3xl font-bold text-rose-800 dark:text-rose-400">
                  100%
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Dedication
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
