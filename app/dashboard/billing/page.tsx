"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function BillingPage() {
  const [loading, setLoading] = useState(false);

  async function openBillingPortal() {
    try {
      setLoading(true);

      const response = await fetch("/api/stripe/portal", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to open billing portal."
        );
      }

      window.location.href = data.url;
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );

      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-4xl font-bold text-white">
        💳 Billing
      </h1>

      <p className="mt-4 text-zinc-300">
        Manage your PDFRocket subscription and billing.
      </p>

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="text-2xl font-bold text-white">
          Pro Subscription
        </h2>

        <p className="mt-2 text-zinc-400">
          Manage your subscription, payment method, invoices, and
          cancellation through Stripe.
        </p>

        <button
          onClick={openBillingPortal}
          disabled={loading}
          className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Opening..." : "Manage Subscription"}
        </button>
      </div>
    </div>
  );
}