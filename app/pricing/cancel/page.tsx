import Link from "next/link";
import { XCircle } from "lucide-react";

export default function CancelPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="w-full max-w-xl rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">

        <XCircle className="mx-auto h-20 w-20 text-red-500" />

        <h1 className="mt-6 text-4xl font-bold text-white">
          Payment Cancelled
        </h1>

        <p className="mt-4 text-lg text-zinc-400">
          No worries! Your subscription wasn't created and you haven't been charged.
        </p>

        <Link
          href="/pricing"
          className="mt-8 inline-block rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
        >
          Back to Pricing
        </Link>

      </div>
    </main>
  );
}