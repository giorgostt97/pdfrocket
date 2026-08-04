import Link from "next/link";
import {
  FileText,
  Scissors,
  RotateCw,
  Image,
  Images,
  Trash2,
  Droplets,
  ArrowUpDown,
  Zap,
  Shield,
  Gem,
  Globe,
} from "lucide-react";

const tools = [
  {
    name: "Merge PDF",
    href: "/merge",
    icon: <FileText className="h-12 w-12 text-blue-500" />,
    description: "Combine multiple PDFs into one.",
  },
  {
    name: "Split PDF",
    href: "/split",
    icon: <Scissors className="h-12 w-12 text-green-500" />,
    description: "Split a PDF into separate pages.",
  },
  {
    name: "Rotate PDF",
    href: "/rotate",
    icon: <RotateCw className="h-12 w-12 text-orange-500" />,
    description: "Rotate every page in your PDF.",
  },
  {
    name: "JPG to PDF",
    href: "/jpg-to-pdf",
    icon: <Image className="h-12 w-12 text-pink-500" />,
    description: "Convert images into PDFs.",
  },
  {
    name: "Delete Pages",
    href: "/delete-pages",
    icon: <Trash2 className="h-12 w-12 text-red-500" />,
    description: "Remove pages from a PDF.",
  },
  {
    name: "Extract Pages",
    href: "/extract-pages",
    icon: <Images className="h-12 w-12 text-cyan-500" />,
    description: "Extract selected pages into a new PDF.",
  },
  {
    name: "Watermark PDF",
    href: "/watermark",
    icon: <Droplets className="h-12 w-12 text-sky-500" />,
    description: "Add a custom watermark.",
  },
  {
    name: "Reorder Pages",
    href: "/reorder",
    icon: <ArrowUpDown className="h-12 w-12 text-violet-500" />,
    description: "Rearrange pages in any order.",
  },
  {
  name: "Page Numbers",
  href: "/page-numbers",
  icon: <FileText className="h-12 w-12 text-emerald-500" />,
  description: "Add page numbers to every page.",
},
{
  name: "Duplicate Pages",
  href: "/duplicate-pages",
  icon: <FileText className="h-12 w-12 text-purple-500" />,
  description: "Duplicate selected pages in a PDF.",
},
{
  name: "Reverse Pages",
  href: "/reverse-pages",
  icon: <RotateCw className="h-12 w-12 text-indigo-500" />,
  description: "Reverse the order of pages in a PDF.",
},
{
  name: "PDF Information",
  href: "/pdf-info",
  icon: <FileText className="h-12 w-12 text-yellow-500" />,
  description: "View PDF metadata and document information.",
},
{
  name: "Edit Metadata",
  href: "/edit-metadata",
  icon: <FileText className="h-12 w-12 text-emerald-500" />,
  description: "Edit PDF title, author, subject and more.",
},
{
  name: "Remove Metadata",
  href: "/remove-metadata",
  icon: <FileText className="h-12 w-12 text-red-500" />,
  description: "Remove metadata from a PDF document.",
},
{
  name: "PDF Thumbnails",
  href: "/pdf-thumbnails",
  icon: <Images className="h-12 w-12 text-indigo-500" />,
  description: "Preview every page of your PDF.",
},
{
  name: "PDF to JPG",
  href: "/pdf-to-jpg",
  icon: <Image className="h-12 w-12 text-yellow-500" />,
  description: "Convert every PDF page into JPG images.",
},
{
  name: "PDF to PNG",
  href: "/pdf-to-png",
  icon: <Image className="h-12 w-12 text-emerald-500" />,
  description: "Convert every PDF page into PNG images.",
},
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      <section className="relative mx-auto max-w-7xl overflow-hidden px-6 py-28 text-center">
        <div className="absolute left-1/2 top-10 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[150px]" />
<div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
  🚀 Trusted PDF Tools
</div>
        <h1 className="mt-8 text-6xl font-extrabold leading-tight text-white md:text-7xl">
          Powerful PDF Tools
          <span className="block text-blue-500">
            Fast. Secure. Simple.
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-xl leading-8 text-zinc-400">
  Merge, split, rotate, extract, watermark and organize PDF files directly in your browser.
  <br />
  No installation. No registration. Start free.
</p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <Link
            href="/merge"
            className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
          >
            Start Free →
          </Link>

          <Link
            href="/pricing"
            className="rounded-xl border border-zinc-700 px-8 py-4 font-semibold text-white transition hover:bg-zinc-900"
          >
            View Pricing
          </Link>

        </div>

        {/* Hero Video */}

<div className="mx-auto mt-10 max-w-md">
  <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl">

    <video
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="w-full"
    >
      <source src="/hero-video.mp4" type="video/mp4" />
    </video>

  </div>
</div>

<div className="mt-20 grid gap-6 md:grid-cols-4">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
            <h2 className="text-5xl font-bold text-blue-500">
              17
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
  <Shield className="mx-auto h-12 w-12 text-green-500" />

  <p className="mt-4 text-zinc-400">
    Secure Processing
  </p>
</div>

<div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
  <Globe className="mx-auto h-12 w-12 text-cyan-500" />

  <p className="mt-4 text-zinc-400">
    Works Everywhere
  </p>
</div>

        </div>

        <div
          id="tools"
          className="mt-24"
        >

          <h2 className="text-4xl font-bold text-white">
            Explore Our PDF Tools
          </h2>

          <p className="mt-4 text-zinc-400">
            Everything you need to edit, organize and convert PDF files in one place.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-4">

            {tools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="group rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.35)]"
              >
                <div className="flex justify-center transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6">
  {tool.icon}
</div>

                <h3 className="mt-6 text-2xl font-bold text-white transition-colors group-hover:text-blue-400">
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

  Why PDFRocket

</div>

{/* FAQ GOES HERE */}

<div className="mt-36">

  <div className="mx-auto max-w-4xl">

    <h2 className="text-center text-5xl font-extrabold text-white">
      Frequently Asked Questions
    </h2>

    <p className="mt-6 text-center text-xl text-zinc-400">
      Everything you need to know about PDFRocket.
    </p>

    <div className="mt-14 space-y-6">

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <h3 className="text-xl font-bold text-white">
          Is PDFRocket free?
        </h3>

        <p className="mt-3 text-zinc-400">
          Yes. Start free. Upgrade to Pro anytime.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <h3 className="text-xl font-bold text-white">
          Are my files secure?
        </h3>

        <p className="mt-3 text-zinc-400">
          Yes. Files are processed securely and automatically deleted after processing.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <h3 className="text-xl font-bold text-white">
          Do I need an account?
        </h3>

        <p className="mt-3 text-zinc-400">
          No. The free tools work without an account.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <h3 className="text-xl font-bold text-white">
          Which devices are supported?
        </h3>

        <p className="mt-3 text-zinc-400">
          Windows, macOS, Linux, Android and iPhone.
        </p>
      </div>

    </div>

  </div>

</div>

<div className="mt-24 rounded-3xl border border-blue-500/30 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-14 text-center">

  Ready to edit PDFs?

</div>
      
      </section>
    </main>
  );
}