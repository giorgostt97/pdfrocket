import { Check, X } from "lucide-react";

const freeFeatures = [
  "Merge PDF",
  "Split PDF",
  "Rotate PDF",
  "JPG to PDF",
  "Delete Pages",
  "Extract Pages",
  "Watermark PDF",
  "Reorder Pages",
  "Up to 10MB per file",
  "10 files per day",
];

const proFeatures = [
  "Everything in Free",
  "Unlimited file size",
  "Unlimited conversions",
  "Priority processing",
  "Compress PDF",
  "PDF to JPG",
  "Word to PDF",
  "Excel to PDF",
  "OCR (Coming Soon)",
  "AI PDF Assistant (Coming Soon)",
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black py-20">
      <div className="mx-auto max-w-6xl px-6">

        <h1 className="text-center text-6xl font-bold text-white">
          Pricing
        </h1>

        <p className="mt-6 text-center text-xl text-zinc-400">
          Start for free and upgrade whenever you need more power.
        </p>

        <div className="mt-20 grid gap-8 md:grid-cols-2">

          {/* FREE */}

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10">

            <h2 className="text-3xl font-bold text-white">
              Free
            </h2>

            <p className="mt-2 text-zinc-400">
              Perfect for occasional use.
            </p>

            <h3 className="mt-8 text-5xl font-bold text-white">
              €0
            </h3>

            <p className="text-zinc-500">
              Forever
            </p>

            <div className="mt-8 space-y-4">

              {freeFeatures.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3"
                >
                  <Check className="h-5 w-5 text-green-500" />

                  <span className="text-zinc-300">
                    {feature}
                  </span>
                </div>
              ))}

            </div>

          </div>

          {/* PRO */}

          <div className="rounded-3xl border-2 border-blue-500 bg-zinc-900 p-10 shadow-2xl">

            <div className="mb-4 inline-block rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
              MOST POPULAR
            </div>

            <h2 className="text-3xl font-bold text-white">
              PDFRocket Pro
            </h2>

            <p className="mt-2 text-zinc-400">
              For professionals and businesses.
            </p>

            <h3 className="mt-8 text-5xl font-bold text-white">
              €4.99
            </h3>

            <p className="text-zinc-500">
              per month
            </p>

            <button className="mt-8 w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700">
              Upgrade to Pro
            </button>

            <div className="mt-8 space-y-4">

              {proFeatures.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3"
                >
                  <Check className="h-5 w-5 text-green-500" />

                  <span className="text-zinc-300">
                    {feature}
                  </span>
                </div>
              ))}

            </div>

          </div>

        </div>

        <div className="mt-20 rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">

          <h2 className="text-3xl font-bold text-white">
            Frequently Asked Questions
          </h2>

          <div className="mt-10 space-y-8">

            <div>
              <h3 className="text-xl font-semibold text-white">
                Can I use PDFRocket for free?
              </h3>

              <p className="mt-2 text-zinc-400">
                Yes. You can use our core PDF tools completely free with reasonable daily limits.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white">
                When should I upgrade?
              </h3>

              <p className="mt-2 text-zinc-400">
                Upgrade when you need unlimited usage, larger files and advanced tools.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white">
                Can I cancel anytime?
              </h3>

              <p className="mt-2 text-zinc-400">
                Yes. Your subscription can be cancelled at any time.
              </p>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}