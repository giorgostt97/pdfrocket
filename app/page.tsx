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
    name: "Compress PDF",
    href: "#",
    icon: "🗜️",
    description: "Reduce PDF file size.",
  },
  {
    name: "JPG to PDF",
    href: "#",
    icon: "🖼️",
    description: "Convert images into PDFs.",
  },
  {
    name: "PDF to JPG",
    href: "#",
    icon: "📷",
    description: "Convert PDF pages into images.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">

      <section className="max-w-6xl mx-auto px-6 py-20 text-center">

        <h1 className="text-6xl font-bold">
          🚀 PDFRocket
        </h1>

        <p className="text-xl text-gray-500 mt-6">
          Free online PDF tools.
          Fast. Secure. Simple.
        </p>
        <div className="grid grid-cols-3 gap-6 mt-16">

  <div className="rounded-xl bg-white p-6 shadow text-center">
    <h2 className="text-3xl font-bold">5</h2>
    <p className="text-gray-500">PDF Tools</p>
  </div>

  <div className="rounded-xl bg-white p-6 shadow text-center">
    <h2 className="text-3xl font-bold">100%</h2>
    <p className="text-gray-500">Free</p>
  </div>

  <div className="rounded-xl bg-white p-6 shadow text-center">
    <h2 className="text-3xl font-bold">🔒</h2>
    <p className="text-gray-500">Secure</p>
  </div>

</div>
        <div className="grid md:grid-cols-3 gap-6 mt-16">

          {tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="rounded-2xl bg-white p-8 shadow hover:shadow-xl transition"
            >
              <div className="text-5xl">
                {tool.icon}
              </div>

              <h2 className="text-2xl font-bold mt-4">
                {tool.name}
              </h2>

              <p className="text-gray-500 mt-3">
                {tool.description}
              </p>
            </Link>
          ))}

        </div>

      </section>

    </main>
  );
}