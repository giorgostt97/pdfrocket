export default function BillingPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">

      <h1 className="text-5xl font-bold text-zinc-900">
        PDFRocket Pro
      </h1>

      <p className="mt-4 text-lg text-zinc-600">
        Upgrade to unlimited PDF processing.
      </p>

      <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-10 shadow-lg">

        <h2 className="text-3xl font-bold">
          Pro Plan
        </h2>

        <p className="mt-3 text-zinc-600">
          Unlimited credits, priority support and future AI tools.
        </p>

        <div className="mt-8 text-5xl font-bold">
          €4.99
          <span className="text-lg font-normal">
            /month
          </span>
        </div>

        <button className="mt-10 rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700">
          Upgrade Soon
        </button>

      </div>

    </main>
  );
}