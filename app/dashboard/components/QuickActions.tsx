import Link from "next/link";

const actions = [
  {
    name: "Merge PDF",
    href: "/merge",
  },
  {
    name: "Split PDF",
    href: "/split",
  },
  {
    name: "Rotate PDF",
    href: "/rotate",
  },
  {
    name: "PDF to JPG",
    href: "/pdf-to-jpg",
  },
  {
    name: "JPG to PDF",
    href: "/jpg-to-pdf",
  },
  {
    name: "OCR PDF",
    href: "/ocr",
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-3xl border border-zinc-700 bg-zinc-900 p-6 shadow-lg">

      <h2 className="text-2xl font-bold text-white">
        ⚡ Quick Actions
      </h2>

      <div className="mt-6 grid grid-cols-2 gap-4">

        {actions.map((action) => (
          <Link
            key={action.name}
            href={action.href}
            className="rounded-2xl bg-blue-600 p-4 text-center font-semibold text-white transition hover:bg-blue-700"
          >
            {action.name}
          </Link>
        ))}

      </div>

    </div>
  );
}