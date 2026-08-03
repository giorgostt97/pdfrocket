import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto h-16 px-6 flex items-center justify-between">

        <Link
          href="/"
          className="text-2xl font-bold"
        >
          🚀 PDFRocket
        </Link>

        <div className="flex items-center gap-6">

          <Link href="/merge">
            Merge
          </Link>

          <Link href="/split">
            Split
          </Link>

          <button className="rounded-lg bg-black text-white px-5 py-2 hover:bg-gray-800">
            Go Pro
          </button>

        </div>

      </div>
    </nav>
  );
}