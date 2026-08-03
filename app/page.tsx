import Link from "next/link";

const tools = [
  {
    name: "Merge PDF",
    href: "/merge",
    icon: "📄",
    description: "Combine multiple PDFs into one.",
  },
  {
    name: "Split PDF",
    href: "/split",
    icon: "✂️",
    description: "Split a PDF into separate pages.",
  },
  {
    name: "Rotate PDF",
    href: "/rotate",
    icon: "🔄",
    description: "Rotate every page in your PDF.",
  },
  {
    name: "JPG to PDF",
    href: "/jpg-to-pdf",
    icon: "🖼️",
    description: "Convert images into PDFs.",
  },
  {
    name: "Delete Pages",
    href: "/delete-pages",
    icon: "🗑️",
    description: "Remove pages from a PDF.",
  },
  {
    name: "PDF to JPG",
    href: "#",
    icon: "📷",
    description: "Coming Soon",
  },
  {
    name: "Compress PDF",
    href: "#",
    icon: "🗜️",
    description: "Coming Soon",
  },
  {
  name: "Extract Pages",
  href: "/extract-pages",
  icon: "📑",
  description: "Extract selected pages into a new PDF.",
},
{
  name: "Watermark PDF",
  href: "/watermark",
  icon: "💧",
  description: "Add a custom watermark to every page.",
},
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <section className="mx-auto max-w-7xl px-6 py-20 text-center">

        <h1 className="text-6xl font-extrabold text-white md:text-7xl">
          Work Smarter With
          <span className="block text-blue-500">
            PDF Files
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-xl text-zinc-400">
          Merge, Split, Rotate and Convert PDFs in seconds.
          <br />
          Free to Start • Secure • No Registration Required
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <Link
            href="/merge"
            className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
          >
            🚀 Start Editing
          </Link>

          <Link
            href="#tools"
            className="rounded-xl border border-zinc-700 px-8 py-4 font-semibold text-white transition hover:bg-zinc-900"
          >
            View Tools
          </Link>

        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
            <h2 className="text-5xl font-bold text-blue-500">
              7
            </h2>

            <p className="mt-2 text-zinc-400">
              Working Tools
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
            <h2 className="text-5xl font-bold text-green-500">
              Free
            </h2>

            <p className="mt-2 text-zinc-400">
              To Start
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
            <h2 className="text-5xl">
              🔒
            </h2>

            <p className="mt-2 text-zinc-400">
              Secure Processing
            </p>
          </div>

        </div>

        <div
          id="tools"
          className="mt-24"
        >

          <h2 className="text-4xl font-bold text-white">
            PDF Tools
          </h2>

          <p className="mt-4 text-zinc-400">
            Fast, secure and easy-to-use PDF tools.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {tools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl"
              >
                <div className="text-5xl">
                  {tool.icon}
                </div>

                <h3 className="mt-6 text-2xl font-bold text-white">
                  {tool.name}
                </h3>

                <p className="mt-3 text-zinc-400">
                  {tool.description}
                </p>
              </Link>
            ))}

          </div>

        </div>

        <div className="mt-24 rounded-3xl border border-zinc-800 bg-zinc-900 p-12">

          <h2 className="text-4xl font-bold text-white">
            Why PDFRocket?
          </h2>

          <div className="mt-10 grid gap-8 md:grid-cols-4">

            <div>
              <h3 className="text-3xl">⚡</h3>
              <p className="mt-3 text-zinc-400">
                Lightning fast processing.
              </p>
            </div>

            <div>
              <h3 className="text-3xl">🔒</h3>
              <p className="mt-3 text-zinc-400">
                Files are automatically deleted.
              </p>
            </div>

            <div>
              <h3 className="text-3xl">💎</h3>
              <p className="mt-3 text-zinc-400">
                Free plan with optional Pro features.
              </p>
            </div>

            <div>
              <h3 className="text-3xl">🌍</h3>
              <p className="mt-3 text-zinc-400">
                Works on desktop, tablet and mobile.
              </p>
            </div>

          </div>

        </div>

      </section>
    </main>
  );
}