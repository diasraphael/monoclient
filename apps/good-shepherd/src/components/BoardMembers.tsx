import Image from "next/image";

const boardMembers = [
  {
    id: 1,
    name: "Jan M Birkeland",
    title: "Lawyer",
    organization: "",
    image: "/1.png",
  },
  {
    id: 2,
    name: "Arild Harvik",
    title: "President European",
    organization: "Baptist mission International",
    image: "/2.png",
  },
  {
    id: 3,
    name: "Robert Erlandsen",
    title: "Chairman of the board",
    organization: "skapekraft",
    image: "/3.png",
  },
  {
    id: 4,
    name: "Regis Holt",
    title: "Health Nurse",
    organization: "",
    image: "/4.png",
  },
];

export function BoardMembers() {
  return (
    <section id="team" className="bg-white py-24 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white animate-slide-up">
            Board Members
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300 animate-slide-up delay-100">
            Group of people who jointly supervise the activities of the
            organization.
          </p>
        </div>

        {/* Board Members Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {boardMembers.map((member, index) => (
            <div
              key={member.id}
              className={`group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900 animate-scale-in delay-${Math.min((index + 2) * 100, 400)}`}
            >
              {/* Decorative gradient on hover */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-700 to-rose-900 opacity-0 transition-opacity group-hover:opacity-100" />

              {/* Member Photo */}
              <div className="relative mx-auto mb-6 aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Member Info */}
              <div className="text-center">
                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="mb-1 text-sm font-medium text-rose-800 dark:text-rose-400">
                  {member.title}
                </p>
                {member.organization && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {member.organization}
                  </p>
                )}
              </div>

              {/* Connect Button on Hover */}
              <div className="mt-4 opacity-0 transition-opacity group-hover:opacity-100">
                <button className="w-full rounded-lg border border-rose-800 py-2 text-sm font-medium text-rose-800 transition-colors hover:bg-rose-800 hover:text-white dark:border-rose-400 dark:text-rose-400 dark:hover:bg-rose-400 dark:hover:text-gray-900">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
