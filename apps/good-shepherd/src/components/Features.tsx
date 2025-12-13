import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/components";

const features = [
  {
    title: "Discipline",
    description:
      "Choosing a school with a high level of discipline is important to make sure your child imbibes the right values and takes responsibility for his/her actions.",
    icon: "📚",
  },
  {
    title: "Hygiene & Clean",
    description:
      "The Importance of cleanliness in school reaches far beyond the way things look. It can be much more profound and have a real impact on the quality of education.",
    icon: "✨",
  },
  {
    title: "Challenging",
    description:
      "Encourages productivity by providing students with appropriately challenging assignments, to explore new ideas and take academic risks.",
    icon: "🎯",
  },
  {
    title: "Academic & Extra Curricular",
    description:
      "Extra Curricular activities are vital element in any students development, often building on lessons and learnings that begin during school hours.",
    icon: "🏆",
  },
  {
    title: "Teachers & Staffs",
    description:
      "Teachers set the tone of the classrooms, build a warm environment, mentor and nurture students, become role models, listen and look for signs of trouble.",
    icon: "👨‍🏫",
  },
  {
    title: "Proximity",
    description:
      "It's necessary from a safety perspective and to prevent your child from suffering the repeated discomfort of a long journey to and fro from his/her school every day.",
    icon: "🏫",
  },
];

export function Features() {
  return (
    <section className="bg-white py-24 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Why select us?
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            We aim to provide education to the children for the betterment of
            their life.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="transform p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <CardHeader className="space-y-4 pb-4">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-3xl dark:bg-rose-900/30">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
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
