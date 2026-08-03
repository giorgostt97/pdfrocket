import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

        <Link
          href="/"
          className="text-2xl font-bold text-white transition hover:text-blue-500"
        >
          🚀 PDFRocket
        </Link>

        <div className="flex items-center gap-6">

          <Link
            href="/merge"
            className="text-zinc-300 transition hover:text-white"
          >
            Merge
          </Link>

          <Link
            href="/split"
            className="text-zinc-300 transition hover:text-white"
          >
            Split
          </Link>

          <Link
            href="/rotate"
            className="text-zinc-300 transition hover:text-white"
          >
            Rotate
          </Link>

          <Link
            href="/jpg-to-pdf"
            className="text-zinc-300 transition hover:text-white"
          >
            JPG → PDF
          </Link>
          <Link href="/delete-pages">
  Delete Pages
</Link>
<Link href="/extract-pages">
  Extract Pages
</Link>
<Link href="/watermark">
  Watermark
</Link>
          <button className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700">
            Go Pro
          </button>

        </div>
      </div>
    </nav>
  );
}