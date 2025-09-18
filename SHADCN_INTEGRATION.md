# 🎨 Shadcn Integration Guide

Your monorepo now has shadcn/ui components fully integrated! Here's how to use them in your apps.

## ✅ What's Set Up

- **Shadcn components** in `packages/ui/src/components/ui/`
- **Tailwind CSS v4** with shadcn design tokens
- **TypeScript support** with proper exports
- **Utility functions** (`cn` for class merging)
- **Both shadcn and original components** available

## 🚀 Using in Your Apps

### 1. Install UI Package Dependency

Each app should already have the UI package as a dependency. If not, add:

```json
// apps/[app-name]/package.json
{
  "dependencies": {
    "@repo/ui": "workspace:*"
  }
}
```

### 2. Import the Global CSS

In your app's main CSS file (e.g., `src/app/globals.css`), add:

```css
@import "@repo/ui/globals.css";

/* Your existing styles */
@import "tailwindcss";
/* ... rest of your app styles */
```

### 3. Update Tailwind Config

Update your app's `tailwind.config.ts`:

```ts
import baseConfig from "@repo/ui/tailwind.config";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}", // Include UI components
  ],
  theme: {
    extend: {
      ...baseConfig.theme?.extend,
      // Add your app-specific customizations here
    },
  },
  plugins: [...(baseConfig.plugins || [])],
};

export default config;
```

### 4. Import and Use Components

```tsx
// Example: apps/todo-web/src/app/page.tsx
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  cn,
} from "@repo/ui/components";

export default function HomePage() {
  return (
    <div className="container mx-auto p-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Welcome to Todo App</CardTitle>
          <CardDescription>Built with shadcn/ui components</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Enter a new todo" />
          <div className="flex gap-2">
            <Button>Add Todo</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="ghost"
            className={cn("w-full", "text-muted-foreground")}
          >
            View All Todos
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
```

## 🧩 Available Components

### Shadcn Components

- `Button` - Multiple variants: default, destructive, outline, secondary, ghost, link
- `Card` - Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- `Input` - Form input with consistent styling

### Original Components (still available)

- `OriginalButton` - Your existing button component
- `OriginalCard` - Your existing card component
- `Code` - Code display component

### Utilities

- `cn()` - Class name utility for merging Tailwind classes

## 🎨 Component Examples

### Button Variants

```tsx
<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

{/* Sizes */}
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">🔍</Button>

{/* Custom styling */}
<Button className={cn("bg-purple-600 hover:bg-purple-700")}>
  Custom Button
</Button>
```

### Form Example

```tsx
<Card>
  <CardHeader>
    <CardTitle>Contact Form</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    <Input placeholder="Your name" />
    <Input type="email" placeholder="your@email.com" />
    <Button className="w-full">Submit</Button>
  </CardContent>
</Card>
```

## 🛠️ Adding More Components

To add more shadcn components:

1. Navigate to the UI package:

   ```bash
   cd packages/ui
   ```

2. Install a new component:

   ```bash
   pnpm dlx shadcn@latest add [component-name]
   ```

3. Export it in `src/components/index.ts`:

   ```ts
   export { NewComponent } from "./ui/new-component";
   ```

4. Use in your apps:
   ```tsx
   import { NewComponent } from "@repo/ui/components";
   ```

## 🔧 Development

- **Type checking**: `pnpm run check-types` (from packages/ui)
- **Linting**: `pnpm run lint` (from packages/ui)
- **Building all**: `pnpm run build` (from root)

## 🎯 Next Steps

1. Import the CSS in each app
2. Update Tailwind configs
3. Start using components in your apps
4. Add more shadcn components as needed

Your shadcn setup is ready to use across all apps in the monorepo! 🎉
