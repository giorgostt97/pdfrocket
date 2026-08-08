import Link from "next/link";

type FavoriteItem = {
  id: string;
  tool: string;
  userId: string;
};

type Props = {
  favorites: FavoriteItem[];
};

export default function FavoritesCard({
  favorites,
}: Props) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-zinc-900">
          ⭐ Favorites
        </h2>

        <Link
          href="/dashboard/favorites"
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          View All
        </Link>
      </div>

      {favorites.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center">
          <p className="text-zinc-600">
            You haven't added any favorite tools yet.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {favorites.slice(0, 5).map((favorite) => (
            <div
              key={favorite.id}
              className="rounded-xl border border-zinc-200 bg-zinc-50 p-4"
            >
              <span className="font-medium text-zinc-800">
                ⭐ {favorite.tool}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}