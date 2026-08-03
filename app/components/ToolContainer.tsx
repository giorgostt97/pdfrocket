import { ReactNode } from "react";

type ToolContainerProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function ToolContainer({
  title,
  description,
  children,
}: ToolContainerProps) {
  return (
    <main className="min-h-screen py-16">
      <div className="max-w-2xl mx-auto rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl p-10">

        <h1 className="text-5xl font-bold text-center text-white">
          {title}
        </h1>

        <p className="mt-4 text-center text-zinc-400">
          {description}
        </p>

        {children}

      </div>
    </main>
  );
}