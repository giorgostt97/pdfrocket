import { ReactNode } from "react";

type ToolPageProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function ToolPage({
  title,
  description,
  children,
}: ToolPageProps) {
  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-5xl font-bold text-center">
          {title}
        </h1>

        <p className="text-center text-gray-500 mt-4">
          {description}
        </p>

        {children}

        <p className="mt-6 text-center text-sm text-gray-500">
          🔒 Your files are processed securely and deleted after processing.
        </p>

      </div>
    </main>
  );
}