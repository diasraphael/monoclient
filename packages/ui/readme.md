# @repo/ui - Shadcn Component Library

A shared component library for the monoclient monorepo, built with shadcn/ui components and Tailwind CSS v4.

## 📦 What's Included

- **shadcn/ui components**: Button, Card, Input, and more
- **Original components**: Your existing Button, Card, Code components
- **Tailwind CSS v4** integration
- **TypeScript** support
- **Class variance authority** for component variants

## 🚀 Usage in Apps

### 1. Import the CSS (required)

In your app's `globals.css` or main CSS file:

```css
@import "@repo/ui/globals.css";
```

### 2. Import Components

```tsx
import { Button, Card, Input, cn } from "@repo/ui/components";

export default function MyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
        <CardDescription>This uses shadcn components!</CardDescription>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter your name" />
        <Button className={cn("mt-4")}>Submit</Button>
      </CardContent>
    </Card>
  );
}
```

### 3. Tailwind Configuration

Your apps should extend the UI package's Tailwind config:

```ts
// tailwind.config.ts
import baseConfig from "@repo/ui/tailwind.config";
import type { Config } from "tailwindcss";

const config: Config = {
  ...baseConfig,
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}", // Include UI components
  ],
};

export default config;
```

## 🎨 Available Components

### Shadcn Components

- `Button` - Multiple variants (default, destructive, outline, secondary, ghost, link)
- `Card` - Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- `Input` - Form input with consistent styling

### Original Components

- `OriginalButton` - Your existing button component
- `OriginalCard` - Your existing card component
- `Code` - Code display component

### Utilities

- `cn` - Class name utility for merging Tailwind classes

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Type check
pnpm run check-types

# Lint
pnpm run lint
```

## 🎯 Adding New Components

Use the shadcn CLI from the UI package directory:

```bash
cd packages/ui
pnpm dlx shadcn@latest add [component-name]
```

Then export the component in `src/components/index.ts`.
