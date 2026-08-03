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
];

export default function Home() {
  return (
    <main className="min-h-screen py-20">
      <section className="mx-auto max-w-6xl px-6 text-center">

        <h1 className="text-6xl font-bold text-white">
          🚀 PDFRocket
        </h1>

        <p className="mt-6 text-xl text-zinc-400">
          Fast. Secure. Simple PDF tools.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
            <h2 className="text-4xl font-bold text-white">4</h2>
            <p className="mt-2 text-zinc-400">
              Working Tools
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
            <h2 className="text-4xl font-bold text-white">100%</h2>
            <p className="mt-2 text-zinc-400">
              Free
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
            <h2 className="text-4xl">🔒</h2>
            <p className="mt-2 text-zinc-400">
              Secure
            </p>
          </div>

        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">

          {tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-2xl"
            >
              <div className="text-5xl">
                {tool.icon}
              </div>

              <h2 className="mt-5 text-2xl font-bold text-white">
                {tool.name}
              </h2>

              <p className="mt-3 text-zinc-400">
                {tool.description}
              </p>
            </Link>
          ))}

        </div>

      </section>
    </main>
  );
}