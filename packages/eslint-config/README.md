# `@repo/eslint-config`

Collection of internal ESLint configurations using modern flat config format.

## Available Configurations:

- **`base.js`** - Core rules for TypeScript with import ordering and Turbo support
- **`next.js`** - Complete Next.js setup with React, hooks, and accessibility rules
- **`react-internal.js`** - React library rules for shared packages and components

## Usage:

```js
// For Next.js apps
import { nextJsConfig } from "@repo/eslint-config/next-js";

// For React libraries/packages
import { config as reactInternalConfig } from "@repo/eslint-config/react-internal";

// For base TypeScript projects
import { config as baseConfig } from "@repo/eslint-config/base";
```
