# 🚀 Quick Start Guide

## Prerequisites

- **Node.js** ≥18
- **pnpm** 9.0.0 (will be auto-installed via packageManager field)

## Setup

```bash
# Install dependencies
pnpm install

# Verify setup
pnpm lint
pnpm check-types
```

## Development

### Start Todo App

```bash
# Start only todo-web
pnpm dev:todo

# Or start all apps
pnpm dev
```

Visit: http://localhost:3000

### Available Commands

```bash
# Development
pnpm dev                    # Start all apps in dev mode
pnpm dev:todo              # Start only todo-web

# Building
pnpm build                 # Build all apps and packages
pnpm build:todo           # Build only todo-related

# Code Quality
pnpm lint                  # Lint all packages
pnpm lint:fix             # Auto-fix linting issues
pnpm format               # Format all files
pnpm format:check         # Check formatting
pnpm check-types          # TypeScript type checking

# Package Management
pnpm install              # Install dependencies
pnpm add <pkg> --filter=<workspace>  # Add dependency to workspace
```

## Project Structure

```
monoclient/
├── apps/
│   └── todo-web/          # Next.js todo application
├── packages/
│   ├── ui/                # Shared UI components (shadcn/ui)
│   ├── eslint-config/     # Shared ESLint configs
│   └── typescript-config/ # Shared TypeScript configs
└── [config files]
```

## Using Shared UI Components

### 1. Import components

```tsx
// In apps/todo-web/src/app/page.tsx
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@repo/ui/components";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello World</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

### 2. Import global styles

```css
/* In apps/todo-web/src/app/globals.css */
@import "@repo/ui/globals.css";
```

### 3. Extend Tailwind config (optional)

```ts
// In apps/todo-web/tailwind.config.ts
import baseConfig from "@repo/ui/tailwind.config";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [baseConfig],
};

export default config;
```

## Adding New Components

### Add shadcn/ui component

```bash
# Navigate to UI package
cd packages/ui

# Add component
pnpm dlx shadcn@latest add dialog

# Export it
# Add to packages/ui/src/components/index.ts:
export { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
```

### Create custom component

```bash
# Create file
packages/ui/src/components/ui/my-component.tsx

# Export it
# Add to packages/ui/src/components/index.ts
export { MyComponent } from "./ui/my-component";
```

## Working with Multiple Apps

### Filter by app

```bash
# Run commands for specific app
pnpm dev --filter=todo-web
pnpm build --filter=todo-web
pnpm lint --filter=todo-web
```

### Add dependency to specific app

```bash
# Add regular dependency
pnpm add axios --filter=todo-web

# Add dev dependency
pnpm add -D vitest --filter=todo-web

# Add workspace package
pnpm add @repo/ui --filter=todo-web
```

## Troubleshooting

### Cache issues

```bash
# Clear Turborepo cache
rm -rf .turbo

# Clear Next.js cache
rm -rf apps/*/. next

# Clear node_modules and reinstall
rm -rf node_modules apps/*/node_modules packages/*/node_modules
pnpm install
```

### TypeScript errors

```bash
# Check types
pnpm check-types

# If using VSCode, restart TS server
Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

### Linting errors

```bash
# Auto-fix
pnpm lint:fix

# Check specific app
pnpm lint --filter=todo-web
```

## Git Workflow

### Commits are automatically checked

When you commit, Husky runs:

1. ESLint on staged files
2. Prettier on staged files

If there are errors, the commit will be blocked.

### Fix pre-commit errors

```bash
# Auto-fix linting issues
pnpm lint:fix

# Format files
pnpm format

# Try commit again
git commit -m "your message"
```

## Best Practices

### 1. Always use workspace packages

```typescript
// ✅ Good
import { Button } from "@repo/ui/components";

// ❌ Bad - relative imports across packages
import { Button } from "../../../packages/ui/src/components/ui/button";
```

### 2. Run checks before pushing

```bash
pnpm format:check && pnpm lint && pnpm check-types && pnpm build
```

### 3. Use filters for faster iteration

```bash
# Instead of building everything
pnpm build  # Slow

# Build only what you need
pnpm build --filter=todo-web  # Faster
```

### 4. Keep dependencies updated

```bash
# Check for updates
pnpm outdated

# Update specific package
pnpm update <package-name>

# Update all
pnpm update -r
```

## Next Steps

- [ ] Read [MONOREPO_ANALYSIS.md](./MONOREPO_ANALYSIS.md) for complete overview
- [ ] Read [ARCHITECTURE.md](./ARCHITECTURE.md) for visual diagrams
- [ ] Read [SHADCN_INTEGRATION.md](./SHADCN_INTEGRATION.md) for UI component guide
- [ ] Add tests (see MONOREPO_ANALYSIS.md recommendations)
- [ ] Set up CI/CD (GitHub Actions workflow provided)
- [ ] Add more apps as needed

## Resources

- [Turborepo Docs](https://turbo.build/repo/docs)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [shadcn/ui](https://ui.shadcn.com)
- [Next.js 15](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
