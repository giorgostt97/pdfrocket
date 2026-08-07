"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false);

  async function openPortal() {
    try {
      setLoading(true);

      const res = await fetch("/api/stripe/portal", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error);
        return;
      }

      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      toast.error("Unable to open billing portal.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={openPortal}
      disabled={loading}
      className="w-full rounded-2xl bg-yellow-500 px-6 py-3 font-semibold text-white transition hover:bg-yellow-600 disabled:opacity-50"
    >
      {loading
        ? "Opening..."
        : "⚙️ Manage Subscription"}
    </button>
  );
}