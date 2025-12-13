# 🐑 Good Shepherd App - Getting Started

Welcome to the Good Shepherd app! This guide will help you get started quickly.

---

## 🚀 Quick Start

```bash
# From monorepo root
pnpm dev:shepherd

# Visit http://localhost:3000
```

---

## 📦 What's Included

This app is part of a monorepo and has access to:

### Shared Packages

- **@repo/ui** - shadcn/ui components (Button, Card, Input, etc.)
- **@repo/eslint-config** - Shared linting rules
- **@repo/typescript-config** - Shared TypeScript configuration

### Tech Stack

- **Next.js 16.0.10** - React framework with App Router
- **React 19.2.1** - Latest React
- **TypeScript 5** - Type safety
- **Tailwind CSS v4** - Utility-first CSS
- **Turbopack** - Fast bundler
- **ESLint 9** - Code linting
- **Prettier** - Code formatting

---

## 🎨 Using Shared UI Components

### Import Components

```tsx
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  cn,
} from "@repo/ui/components";
```

### Example Usage

```tsx
// app/page.tsx
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@repo/ui/components";

export default function HomePage() {
  return (
    <div className="container mx-auto p-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Welcome to Good Shepherd</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Start building your app here!</p>
          <Button>Get Started</Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## 📁 Project Structure

```
good-shepherd/
├── src/
│   └── app/
│       ├── page.tsx           # Home page (/)
│       ├── layout.tsx         # Root layout
│       ├── globals.css        # Global styles
│       └── favicon.ico
├── public/                    # Static assets
├── package.json               # Dependencies
├── tsconfig.json             # TypeScript config
├── eslint.config.mjs         # ESLint config
├── postcss.config.mjs        # PostCSS config
└── next.config.ts            # Next.js config
```

---

## 🛠️ Available Commands

```bash
# Development
pnpm dev                       # Start dev server with Turbopack
pnpm build                     # Build for production
pnpm start                     # Start production server

# Code Quality
pnpm lint                      # Check linting
pnpm lint:fix                  # Auto-fix linting issues
pnpm type-check               # TypeScript type checking

# From Monorepo Root
pnpm dev:shepherd             # Start this app only
pnpm build:shepherd           # Build this app only
pnpm lint                     # Lint all packages
pnpm format                   # Format all files
```

---

## 📝 Creating New Pages

### 1. Basic Page

Create `src/app/about/page.tsx`:

```tsx
export default function AboutPage() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">About</h1>
      <p>This is the about page.</p>
    </main>
  );
}
```

Visit: `http://localhost:3000/about`

### 2. Dynamic Route

Create `src/app/posts/[id]/page.tsx`:

```tsx
export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Post {id}</h1>
    </main>
  );
}
```

Visit: `http://localhost:3000/posts/123`

### 3. API Route

Create `src/app/api/hello/route.ts`:

```tsx
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello from Good Shepherd!" });
}
```

Visit: `http://localhost:3000/api/hello`

---

## 🎨 Styling with Tailwind

### Using Tailwind Classes

```tsx
<div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-white p-8 rounded-lg shadow-md">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">Hello World</h1>
  </div>
</div>
```

### Using shadcn/ui Components

```tsx
import { Button } from "@repo/ui/components";

<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

### Custom Styling with cn()

```tsx
import { Button, cn } from "@repo/ui/components";

<Button className={cn("bg-purple-600 hover:bg-purple-700")}>
  Custom Button
</Button>;
```

---

## 🔧 Configuration

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://...
```

Use in code:

```tsx
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

### Tailwind Configuration

The app automatically includes:

- Shared UI package styles
- shadcn/ui design tokens
- Tailwind v4 utilities

Custom configuration is in `postcss.config.mjs`.

---

## 📚 Learn More

### Documentation

- **Monorepo Guide**: See `../../QUICK_START.md`
- **Architecture**: See `../../ARCHITECTURE.md`
- **UI Components**: See `../../SHADCN_INTEGRATION.md`
- **Migration Notes**: See `../../MIGRATION_SUMMARY.md`

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [TypeScript](https://www.typescriptlang.org/docs)

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
pnpm dev -- -p 3001
```

### Module Not Found

```bash
# Reinstall dependencies
pnpm install

# Clear Next.js cache
rm -rf .next
```

### TypeScript Errors

```bash
# Run type check
pnpm type-check

# Restart TS server in VSCode
Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

### Tailwind Classes Not Working

Ensure `postcss.config.mjs` includes the UI package:

```javascript
base: [
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
  "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
];
```

---

## 🎯 Next Steps

1. **Explore the UI Components**
   - Check out `../../packages/ui/src/components/`
   - Try different shadcn/ui components

2. **Build Your First Feature**
   - Create a new page
   - Add some components
   - Style with Tailwind

3. **Add More Components**

   ```bash
   cd ../../packages/ui
   pnpm dlx shadcn@latest add dialog dropdown-menu select
   ```

4. **Set Up Your Database**
   - Add Prisma or Drizzle ORM
   - Configure environment variables
   - Create your schema

5. **Add Authentication**
   - NextAuth.js
   - Clerk
   - Auth0

---

## 💡 Tips

- Use `@repo/ui/components` for all shared components
- Keep app-specific components in `src/components/`
- Use TypeScript for type safety
- Follow the monorepo conventions
- Run `pnpm lint` before committing
- Pre-commit hooks will auto-format your code

---

## 🤝 Contributing

When working on this app:

1. Create a feature branch
2. Make your changes
3. Run quality checks:
   ```bash
   pnpm lint
   pnpm type-check
   pnpm build:shepherd
   ```
4. Commit (pre-commit hooks will run automatically)
5. Push and create a PR

---

**Happy coding! 🚀**

For questions or issues, check the monorepo documentation in the root directory.
