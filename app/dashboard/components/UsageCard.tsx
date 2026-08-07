export default function UsageCard() {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="text-xl font-semibold">
        Today's Usage
      </h2>

      <p className="mt-4 text-4xl font-bold">
        0 / 10
      </p>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-zinc-800">

        <div className="h-full w-0 rounded-full bg-blue-600" />

      </div>

      <p className="mt-3 text-sm text-zinc-400">
        Free users can process 10 PDFs each day.
      </p>

    </div>
  );
}