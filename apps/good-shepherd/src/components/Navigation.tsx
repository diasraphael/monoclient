export function Navigation() {
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
