### The monorepo problem

- Monorepos have many advantages - but they struggle to scale.
- Turborepo solves your monorepo's scaling problem. Remote Cache stores the result of all your tasks, meaning that your CI never needs to do the same work twice.


### Setting up turbo repo

````
pnpm dlx create-turbo@latest monoclient
cd monoclient 
pnpm install
pnpm dev

# deleting sample apps
cd apps
rm -rf docs web
PS C:\raphael\26-Aug-2025\monoclient\apps> Remove-Item -Recurse -Force docs, web
````

### create new projects under apps

````
npx create-next-app@latest todo-web --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
npx create-next-app@latest profile --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
````