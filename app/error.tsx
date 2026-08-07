"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6">

      <div className="max-w-xl text-center">

        <h1 className="text-7xl font-black text-red-500">
          Oops!
        </h1>

        <h2 className="mt-6 text-3xl font-bold text-white">
          Something went wrong
        </h2>

        <p className="mt-4 text-zinc-400">
          An unexpected error occurred. Please try again.
        </p>

        <button
          onClick={() => reset()}
          className="mt-10 rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
        >
          Try Again
        </button>

      </div>

    </main>
  );
}