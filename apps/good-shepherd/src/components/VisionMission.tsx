import { Button } from "@repo/ui/components";

export function VisionMission() {
  return (
    <section id="vision" className="bg-gray-50 py-24 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white animate-slide-up">
            Vision & Mission
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300 animate-slide-up delay-100">
            To provide a statement of the institution&apos;s purposes, goals and
            values.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Vision Card */}
          <div className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900 animate-scale-in delay-200 hover-lift">
            {/* Decorative gradient */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 opacity-10 blur-3xl transition-opacity group-hover:opacity-20" />

            <div className="relative">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-3xl dark:bg-rose-900/30">
                🎯
              </div>

              <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Vision
              </h3>

              <div className="mb-6 space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  To afford educational opportunities for emerging generation of
                  East Srilanka.
                </p>
                <p>
                  To organize our students to face future challenges with valor
                  and intelligence and to afford academic education.
                </p>
              </div>

              <Button
                variant="outline"
                className="w-full border-rose-800 text-rose-800 hover:bg-rose-800 hover:text-white dark:border-rose-400 dark:text-rose-400 dark:hover:bg-rose-400 dark:hover:text-gray-900"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Mission Card - Highlighted */}
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-700 to-rose-900 p-8 shadow-2xl transition-all duration-300 hover:shadow-rose-900/50 animate-scale-in delay-300 hover-lift">
            {/* Decorative pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />

            <div className="relative">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl backdrop-blur-sm">
                💡
              </div>

              <h3 className="mb-4 text-2xl font-bold text-white">Mission</h3>

              <div className="mb-6 space-y-4 text-rose-50">
                <p className="font-medium">
                  Our mission is to Inspire, Integrate and Innovate.
                </p>
                <p>
                  Empower students to become passionate learners through
                  dedicated and inspiring teachers.
                </p>
              </div>

              <Button className="w-full bg-white text-rose-900 hover:bg-rose-50">
                Get Started
              </Button>
            </div>
          </div>

          {/* Innovate Card */}
          <div className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900 animate-scale-in delay-400 hover-lift">
            {/* Decorative gradient */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 opacity-10 blur-3xl transition-opacity group-hover:opacity-20" />

            <div className="relative">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-3xl dark:bg-rose-900/30">
                🚀
              </div>

              <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Innovate
              </h3>

              <div className="mb-6 space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Innovate and use inventive teaching methods for better
                  learning.
                </p>
                <p>
                  Nurture supportive and constructive student centered learning
                  and influential process.
                </p>
              </div>

              <Button
                variant="outline"
                className="w-full border-rose-800 text-rose-800 hover:bg-rose-800 hover:text-white dark:border-rose-400 dark:text-rose-400 dark:hover:bg-rose-400 dark:hover:text-gray-900"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
