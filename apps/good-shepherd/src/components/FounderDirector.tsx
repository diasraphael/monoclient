import Image from "next/image";

export function FounderDirector() {
  return (
    <section className="bg-gray-50 py-24 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white animate-slide-up">
            Founder & Director
          </h2>
          <p className="mx-auto max-w-3xl text-xl italic text-gray-600 dark:text-gray-300 animate-slide-up delay-100">
            It&apos;s a journey that we must learn to savour, cherish and
            treasure.
          </p>
        </div>

        {/* Main Content */}
        <div className="relative mx-auto max-w-6xl animate-fade-in delay-200">
          {/* Decorative background gradient */}
          <div className="absolute -inset-8 -z-10 rounded-3xl bg-gradient-to-r from-rose-700 to-rose-900 opacity-5 blur-3xl dark:opacity-10 animate-float" />

          {/* Content Card */}
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900 hover-lift">
            <div className="grid items-center gap-12 lg:grid-cols-5">
              {/* Left: Founder Image */}
              <div className="lg:col-span-2">
                <div className="relative aspect-[3/4] w-full lg:aspect-auto lg:h-full lg:min-h-[600px]">
                  <Image
                    src="/father.jpg"
                    alt="Anton Sinnathamby - Founder"
                    fill
                    className="object-cover hover-brightness"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  {/* Gradient overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent lg:hidden" />
                </div>
              </div>

              {/* Right: Content */}
              <div className="space-y-8 p-8 lg:col-span-3 lg:p-12">
                {/* Quote Mark */}
                <div className="text-6xl font-serif text-rose-800 opacity-30 dark:text-rose-400">
                  &ldquo;
                </div>

                {/* Message */}
                <div className="space-y-6 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                  <p>
                    The past 12 years of our college&apos;s journey indeed make
                    me all proud. However, I am determined to achieve even
                    greater heights in the future, by way of both quantitative
                    and qualitative growth through the educational curriculum.
                  </p>

                  <p>
                    From the place where singing fish sings of the grace and
                    mighty, Good Shepherd College, an institution with a great
                    tradition, always have been instituting in the character
                    formation of our young people especially in schools which
                    create the leaders of tomorrow and presently this school is
                    with the international studies and leading one in the
                    Batticaloa District.
                  </p>

                  <p>
                    An academic scholar said that &quot;Opening schools
                    everywhere which give a path to close prisons for the
                    betterment of the society&quot;. When I started this Good
                    Shepherd college-international studies; there were more
                    obstacles and difficulties to overcome and find solutions
                    before start this college.
                  </p>
                </div>

                {/* Founder Info */}
                <div className="border-t border-gray-200 pt-8 dark:border-gray-700">
                  <div className="flex items-center gap-6">
                    {/* Decorative line */}
                    <div className="h-px w-12 bg-gradient-to-r from-rose-700 to-rose-900" />

                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Anton Sinnathamby
                      </h3>
                      <p className="mt-1 text-sm font-medium text-rose-800 dark:text-rose-400">
                        Founder, Norway
                      </p>
                    </div>
                  </div>

                  {/* Stats or Achievement Badges */}
                  <div className="mt-8 grid grid-cols-3 gap-4">
                    <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-rose-50 to-white p-4 dark:border-gray-700 dark:from-rose-900/20 dark:to-gray-800 hover-scale">
                      <div className="text-2xl font-bold text-rose-800 dark:text-rose-400">
                        2009
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Founded
                      </div>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-rose-50 to-white p-4 dark:border-gray-700 dark:from-rose-900/20 dark:to-gray-800 hover-scale">
                      <div className="text-2xl font-bold text-rose-800 dark:text-rose-400">
                        12+
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Years
                      </div>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-rose-50 to-white p-4 dark:border-gray-700 dark:from-rose-900/20 dark:to-gray-800 hover-scale">
                      <div className="text-2xl font-bold text-rose-800 dark:text-rose-400">
                        #1
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        District
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
