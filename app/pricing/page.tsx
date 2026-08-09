"use client";

import { Check, ShieldCheck, Zap } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const freeFeatures = [
  "20 lifetime credits",
  "Merge PDF",
  "Split PDF",
  "Rotate PDF",
  "JPG to PDF",
  "Delete Pages",
  "Extract Pages",
  "Watermark PDF",
  "Reorder Pages",
  "Up to 10MB per file",
];

const proFeatures = [
  "Everything in Free",
  "Unlimited credits",
  "Unlimited file size",
  "All available PDF tools",
  "Priority processing",
];

export default function PricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function checkout() {
    try {
      setLoading(true);

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong.");
        return;
      }

      router.push(data.url);
    } catch (error) {
      console.error(error);
      toast.error("Unable to start checkout.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen w-full bg-black px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
            <Zap className="h-4 w-4" />
            Simple pricing. No complicated plans.
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Choose the plan that works for you
          </h1>

          <p className="mt-6 text-lg text-zinc-400 sm:text-xl">
            Start with 20 free lifetime credits. Upgrade to Pro when you
            need unlimited PDF processing.
          </p>
        </div>

        {/* Pricing */}

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* FREE */}

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-10">
            <h2 className="text-3xl font-bold text-white">
              Free
            </h2>

            <p className="mt-2 text-zinc-400">
              Perfect for occasional PDF tasks.
            </p>

            <div className="mt-8">
              <span className="text-5xl font-bold text-white">
                €0
              </span>

              <span className="ml-2 text-zinc-500">
                forever
              </span>
            </div>

            <p className="mt-2 text-sm text-zinc-500">
              20 lifetime credits included
            </p>

            <div className="mt-8 space-y-4">
              {freeFeatures.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />

                  <span className="text-zinc-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* PRO */}

          <div className="relative rounded-3xl border-2 border-blue-500 bg-zinc-900 p-6 shadow-2xl shadow-blue-500/10 sm:p-10">
            <div className="absolute -top-4 left-6 rounded-full bg-blue-600 px-4 py-1.5 text-sm font-bold text-white shadow-lg">
              MOST POPULAR
            </div>

            <h2 className="text-3xl font-bold text-white">
              PDFRocket Pro
            </h2>

            <p className="mt-2 text-zinc-400">
              For people who use PDF tools regularly.
            </p>

            <div className="mt-8">
              <span className="text-5xl font-bold text-white">
                €4.99
              </span>

              <span className="ml-2 text-zinc-500">
                / month
              </span>
            </div>

            <p className="mt-2 text-sm text-zinc-500">
              Cancel anytime
            </p>

            <button
              onClick={checkout}
              disabled={loading}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 text-lg font-bold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Redirecting..." : "Upgrade to Pro"}
              {!loading && <Zap className="h-5 w-5" />}
            </button>

            <div className="mt-8 space-y-4">
              {proFeatures.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />

                  <span className="text-zinc-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust */}

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 text-center">
            <ShieldCheck className="mx-auto h-6 w-6 text-green-500" />

            <p className="mt-2 font-semibold text-white">
              Secure payments
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              Payments securely processed by Stripe.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 text-center">
            <Zap className="mx-auto h-6 w-6 text-blue-500" />

            <p className="mt-2 font-semibold text-white">
              Fast processing
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              Process your PDFs quickly and easily.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 text-center">
            <Check className="mx-auto h-6 w-6 text-green-500" />

            <p className="mt-2 font-semibold text-white">
              Cancel anytime
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              No long-term commitment.
            </p>
          </div>
        </div>

        {/* FAQ */}

        <div className="mt-16 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-10">
          <h2 className="text-center text-3xl font-bold text-white">
            Frequently Asked Questions
          </h2>

          <div className="mx-auto mt-10 max-w-3xl space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-white">
                Can I use PDFRocket for free?
              </h3>

              <p className="mt-2 text-zinc-400">
                Yes. Every account receives{" "}
                <strong className="text-white">
                  20 lifetime credits
                </strong>{" "}
                when you sign up. Each PDF tool usage consumes one
                credit.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white">
                What do I get with Pro?
              </h3>

              <p className="mt-2 text-zinc-400">
                Pro removes the credit limit and gives you unlimited
                access to the available PDF tools, with no 20-credit
                restriction.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white">
                Can I cancel anytime?
              </h3>

              <p className="mt-2 text-zinc-400">
                Yes. You can cancel your subscription at any time.
                Your Pro benefits remain active until the end of your
                current billing period.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white">
                Is my payment secure?
              </h3>

              <p className="mt-2 text-zinc-400">
                Yes. PDFRocket uses Stripe to securely process
                subscription payments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}