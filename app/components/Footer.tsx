import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">

        <div>
          <h2 className="text-xl font-bold text-white">
            🚀 PDFRocket
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            Fast. Secure. Simple PDF tools.
          </p>
        </div>

        <div className="flex gap-6 text-sm">

          <Link
            href="/merge"
            className="text-zinc-400 transition hover:text-white"
          >
            Merge PDF
          </Link>

          <Link
            href="/split"
            className="text-zinc-400 transition hover:text-white"
          >
            Split PDF
          </Link>

          <Link
            href="/rotate"
            className="text-zinc-400 transition hover:text-white"
          >
            Rotate PDF
          </Link>

          <Link
            href="/jpg-to-pdf"
            className="text-zinc-400 transition hover:text-white"
          >
            JPG → PDF
          </Link>

        </div>
      </div>

      <div className="border-t border-zinc-800 py-6 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} PDFRocket. All rights reserved.
      </div>
    </footer>
  );
}