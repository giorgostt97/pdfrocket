import Link from "next/link";
import { Favorite } from "@prisma/client";

type Props = {
  favorites: Favorite[];
};

export default function FavoritesCard({
  favorites,
}: Props) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-lg">

      <h2 className="text-2xl font-bold text-zinc-900">
        ⭐ Favorite Tools
      </h2>

      {favorites.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-zinc-300 p-8 text-center">

          <p className="text-lg font-medium text-zinc-700">
            No favorite tools yet.
          </p>

          <p className="mt-2 text-zinc-500">
            Star a PDF tool to see it here.
          </p>

        </div>
      ) : (
        <div className="mt-6 space-y-4">

          {favorites.map((favorite) => (
            <Link
              key={favorite.id}
              href="/"
              className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 p-4 transition hover:bg-zinc-100"
            >
              <span className="font-medium text-zinc-900">
                {favorite.tool}
              </span>

              <span className="text-yellow-500 text-xl">
                ★
              </span>
            </Link>
          ))}

        </div>
      )}

    </div>
  );
}