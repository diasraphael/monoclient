import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/components";

const features = [
  {
    title: "Expert Guidance",
    description:
      "Our experienced team provides professional guidance tailored to your needs.",
    icon: "🎯",
  },
  {
    title: "24/7 Support",
    description:
      "Round-the-clock assistance ensuring you're never alone on your journey.",
    icon: "🛟",
  },
  {
    title: "Proven Results",
    description:
      "Track record of success with measurable outcomes and satisfied clients.",
    icon: "📈",
  },
  {
    title: "Community Focus",
    description:
      "Building strong connections and fostering a supportive environment.",
    icon: "🤝",
  },
  {
    title: "Innovation",
    description:
      "Cutting-edge solutions that adapt to your evolving requirements.",
    icon: "💡",
  },
  {
    title: "Trust & Integrity",
    description:
      "Transparent practices and ethical standards in everything we do.",
    icon: "⭐",
  },
];

export function Features() {
  return (
    <section className="bg-white py-24 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Why Choose Good Shepherd?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Discover the features that make us stand out from the rest
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <CardHeader>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl dark:bg-blue-900">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
