import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Image from "next/image";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function DocsPage() {
  // Read the markdown file
  const markdownPath = path.join(process.cwd(), "src/app/docs/flow.md");

  let markdownContent: string;
  try {
    markdownContent = fs.readFileSync(markdownPath, "utf8");
  } catch (error) {
    notFound();
  }

  // Simple markdown to JSX conversion for basic elements
  const convertMarkdownToJSX = (content: string) => {
    return content.split("\n").map((line, index) => {
      // Handle headers
      if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="text-xl font-bold mt-6 mb-3">
            {line.slice(4)}
          </h3>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
            {line.slice(3)}
          </h2>
        );
      }
      if (line.startsWith("# ")) {
        return (
          <h1 key={index} className="text-3xl font-bold mt-10 mb-6">
            {line.slice(2)}
          </h1>
        );
      }

      // Handle images
      if (line.startsWith("![")) {
        const match = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
        if (match) {
          const [, alt, src] = match;
          // Convert relative paths to absolute paths for Next.js Image component
          const imageSrc = src.startsWith("/") ? src : `/${src}`;
          return (
            <div key={index} className="my-6">
              <Image
                src={imageSrc}
                alt={alt}
                width={800}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          );
        }
      }

      // Handle code blocks
      if (line.startsWith("```")) {
        return (
          <div
            key={index}
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 font-mono text-sm overflow-x-auto"
          />
        );
      }

      // Handle regular text
      if (line.trim() === "") {
        return <br key={index} />;
      }

      if (line.startsWith("- ")) {
        return (
          <li key={index} className="ml-4 mb-1">
            {line.slice(2)}
          </li>
        );
      }

      if (
        line.startsWith("┌") ||
        line.startsWith("│") ||
        line.startsWith("└")
      ) {
        return (
          <pre
            key={index}
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 font-mono text-sm overflow-x-auto whitespace-pre"
          >
            {line}
          </pre>
        );
      }

      if (line.startsWith("=")) {
        return (
          <hr
            key={index}
            className="my-8 border-gray-300 dark:border-gray-600"
          />
        );
      }

      return (
        <p key={index} className="mb-2">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="prose prose-lg max-w-none">
        {convertMarkdownToJSX(markdownContent)}
      </div>
    </div>
  );
}
