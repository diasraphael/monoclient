### The monorepo problem

- Monorepos have many advantages - but they struggle to scale.
- Turborepo solves your monorepo's scaling problem. Remote Cache stores the result of all your tasks, meaning that your CI never needs to do the same work twice.

### Setting up turbo repo

```
pnpm dlx create-turbo@latest monoclient
cd monoclient
pnpm install
pnpm dev

# deleting sample apps
cd apps
rm -rf docs web
PS C:\raphael\26-Aug-2025\monoclient\apps> Remove-Item -Recurse -Force docs, web
```

### create new projects under apps

```
npx create-next-app@latest todo-web --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
npx create-next-app@latest profile --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
npx create-next-app@latest bible-web --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
npx create-next-app@latest shopify-web --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

### install dependencies(google up)

# Go to root directory

cd /path/to/monoclient

# Install ESLint config package dependencies

pnpm install --filter=@repo/eslint-config

# Install ESLint and Prettier in root and all packages

pnpm add -D eslint prettier @repo/eslint-config

# Install in all apps

pnpm add -D eslint --filter="todo-web"
pnpm add -D eslint --filter="ecommerce-web"
pnpm add -D eslint --filter="profile-web"

# Install in all packages

pnpm add -D eslint --filter="@repo/ui"
pnpm add -D eslint --filter="@repo/todo-ui"
pnpm add -D eslint --filter="@repo/ecommerce-ui"
pnpm add -D eslint --filter="@repo/profile-ui"

# Lint only todo-related packages

pnpm lint --filter=todo-\*

# Format only one app

pnpm format --filter=todo-web

# Files Covered:

Code files: _.js, _.jsx, _.ts, _.tsx → ESLint + Prettier
Other files: _.json, _.css, \*.md → Prettier only

## Setup

1. Setup modern ESLint config, Prettier, and git hooks
2. editorconfig for the repo
3. Turbo repo setup
