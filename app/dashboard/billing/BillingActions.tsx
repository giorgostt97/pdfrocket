"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function BillingActions() {
  const [loading, setLoading] = useState(false);

  async function openBillingPortal() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/stripe/portal",
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to open billing portal."
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
    <button
      onClick={openBillingPortal}
      disabled={loading}
      className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading
        ? "Opening..."
        : "Manage Subscription"}
    </button>
  );
}