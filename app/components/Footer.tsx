import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-4">

          {/* Logo */}

          <div>

            <h2 className="text-2xl font-bold text-white">
              PDFRocket
            </h2>

            <p className="mt-4 text-zinc-400">
              Fast, secure and simple PDF tools for everyone.
            </p>

          </div>

          {/* Tools */}

          <div>

            <h3 className="font-semibold text-white">
              Tools
            </h3>

            <div className="mt-4 flex flex-col gap-2">

              <Link href="/merge" className="text-zinc-400 hover:text-white">
                Merge PDF
              </Link>

              <Link href="/split" className="text-zinc-400 hover:text-white">
                Split PDF
              </Link>

              <Link href="/rotate" className="text-zinc-400 hover:text-white">
                Rotate PDF
              </Link>

              <Link href="/jpg-to-pdf" className="text-zinc-400 hover:text-white">
                JPG to PDF
              </Link>

              <Link href="/delete-pages" className="text-zinc-400 hover:text-white">
                Delete Pages
              </Link>

              <Link href="/extract-pages" className="text-zinc-400 hover:text-white">
                Extract Pages
              </Link>

            </div>

          </div>

          {/* Company */}

          <div>

            <h3 className="font-semibold text-white">
              Company
            </h3>

            <div className="mt-4 flex flex-col gap-2">

              <Link href="/about" className="text-zinc-400 hover:text-white">
                About
              </Link>

              <Link href="/pricing" className="text-zinc-400 hover:text-white">
                Pricing
              </Link>

              <Link href="/contact" className="text-zinc-400 hover:text-white">
                Contact
              </Link>

            </div>

          </div>

          {/* Legal */}

          <div>

            <h3 className="font-semibold text-white">
              Legal
            </h3>

            <div className="mt-4 flex flex-col gap-2">

              <Link href="/privacy" className="text-zinc-400 hover:text-white">
                Privacy Policy
              </Link>

              <Link href="/terms" className="text-zinc-400 hover:text-white">
                Terms of Service
              </Link>

            </div>

          </div>

        </div>

        <div className="mt-12 border-t border-zinc-800 pt-8 text-center text-zinc-500">

          © 2026 PDFRocket. All rights reserved.

        </div>

      </div>
    </footer>
  );
}