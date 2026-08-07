"use client";

import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  tool: string;
  initialFavorite?: boolean;
};

export default function FavoriteButton({
  tool,
  initialFavorite = false,
}: Props) {
  const [favorite, setFavorite] = useState(initialFavorite);
  const [loading, setLoading] = useState(false);

  async function toggleFavorite() {
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch("/api/favorites/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tool,
        }),
      });

      if (res.status === 401) {
        toast.error("Please sign in first.");
        return;
      }

      if (!res.ok) {
        toast.error("Something went wrong.");
        return;
      }

      const data = await res.json();

      setFavorite(data.favorite);

      if (data.favorite) {
        toast.success("Added to Favorites ⭐");
      } else {
        toast.success("Removed from Favorites");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className="rounded-full border border-yellow-300 bg-white p-2 transition hover:bg-yellow-50"
      title={
        favorite
          ? "Remove from favorites"
          : "Add to favorites"
      }
    >
      <span
        className={`text-2xl ${
          favorite
            ? "text-yellow-500"
            : "text-zinc-400"
        }`}
      >
        ★
      </span>
    </button>
  );
}