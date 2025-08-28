## Create Your First Shared Component

Let's add a simple shared component to test the setup:

## Create a Button component in the ui package

cd packages/ui/src

## Create the Button component

mkdir -p components
Create packages/ui/src/components/Button.tsx:

```
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary'
}) => {
  const baseClasses = 'px-4 py-2 rounded font-medium transition-colors';
  const variantClasses = variant === 'primary'
    ? 'bg-blue-600 text-white hover:bg-blue-700'
    : 'bg-gray-200 text-gray-800 hover:bg-gray-300';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses}`}
    >
      {children}
    </button>
  );
};
```

Update packages/ui/src/index.tsx:

export { Button } from './components/Button';

## Use the Shared Component

In apps/todo-web/src/app/page.tsx, import and use your shared component:
import { Button } from '@repo/ui';

export default function Home() {
return (
<main className="p-8">
<h1 className="text-2xl font-bold mb-4">Todo App</h1>
<Button onClick={() => alert('Hello from shared component!')}>
Add Todo
</Button>
</main>
);
}

bash# Build the ui package first
pnpm build --filter=@repo/ui

# Start development

pnpm dev:todo

# Visit http://localhost:3000 and click the button!
