import { ReactNode } from "react";
import FavoriteButton from "./FavoriteButton";

type ToolPageProps = {
  title: string;
  description: string;
  tool: string;
  children: ReactNode;
};

export default function ToolPage({
  title,
  description,
  tool,
  children,
}: ToolPageProps) {
  return (
    <main className="min-h-screen bg-gray-50 py-16">

      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-10 shadow-xl">

        <div className="flex items-start justify-between gap-4">

          <div>

            <h1 className="text-5xl font-bold text-zinc-900">
              {title}
            </h1>

            <p className="mt-4 text-gray-500">
              {description}
            </p>

          </div>

          <FavoriteButton tool={tool} />

        </div>

        <div className="mt-10">
          {children}
        </div>

        <div className="mt-10 rounded-2xl border border-green-200 bg-green-50 p-4">

          <p className="text-center text-sm text-green-700">
            🔒 Your files are processed securely and automatically deleted after processing.
          </p>

        </div>

      </div>

    </main>
  );
}