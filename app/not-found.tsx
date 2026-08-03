import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-white">
          404
        </h1>

        <p className="mt-6 text-xl text-zinc-400">
          Page not found.
        </p>

        <Link
          href="/"
          className="mt-10 inline-block rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}