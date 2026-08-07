export default function LatestUpdates() {
  return (
    <div className="rounded-3xl border border-zinc-700 bg-zinc-900 p-6 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold text-white">
        🚀 Latest Updates
      </h2>

      <div className="space-y-5">

        <div className="rounded-2xl border border-zinc-700 bg-zinc-800 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              Dashboard Released
            </h3>

            <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
              NEW
            </span>
          </div>

          <p className="mt-2 text-zinc-300">
            Your personal dashboard is now available with credits,
            quick actions and account management.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-700 bg-zinc-800 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              OCR PDF
            </h3>

            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
              Coming Soon
            </span>
          </div>

          <p className="mt-2 text-zinc-300">
            Extract text from scanned PDFs with one click.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-700 bg-zinc-800 p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              AI PDF Tools
            </h3>

            <span className="rounded-full bg-purple-600 px-3 py-1 text-xs font-semibold text-white">
              In Development
            </span>
          </div>

          <p className="mt-2 text-zinc-300">
            Chat with PDFs, summarize documents, translate files,
            and much more.
          </p>
        </div>

      </div>

    </div>
  );
}