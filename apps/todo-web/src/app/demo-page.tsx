/**
 * Demo page showing shadcn components integration
 * To use this: import and render in your page.tsx
 */

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

export default function DemoPage() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold">Shadcn Components Demo</h1>

      {/* Button Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Button Variants</CardTitle>
          <CardDescription>All available button styles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>

            {/* Sizes */}
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">🔍</Button>
          </div>
        </CardContent>
      </Card>

      {/* Form Example */}
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Todo Form</CardTitle>
          <CardDescription>
            Add a new todo item using shadcn components
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Enter todo description" />
          <Input type="date" />
          <div className="flex gap-2">
            <Button className="flex-1">Add Todo</Button>
            <Button variant="outline" className="flex-1">
              Cancel
            </Button>
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

      {/* Custom Styling Example */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Styling with cn()</CardTitle>
          <CardDescription>
            Using the cn utility for custom classes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              className={cn(
                "bg-gradient-to-r from-purple-600 to-pink-600",
                "hover:from-purple-700 hover:to-pink-700",
                "text-white font-bold"
              )}
            >
              Gradient Button
            </Button>

            <Button
              variant="outline"
              className={cn(
                "border-green-500 text-green-600 hover:bg-green-50"
              )}
            >
              Green Outline
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
