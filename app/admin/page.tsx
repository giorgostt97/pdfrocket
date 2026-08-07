import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  // CHANGE THIS TO YOUR EMAIL
  if (user?.email !== "giorgos_tt97@outlook.com") {
    redirect("/dashboard");
  }

  const totalUsers = await prisma.user.count();

  const proUsers = await prisma.user.count({
    where: {
      isPro: true,
    },
  });

  const freeUsers = totalUsers - proUsers;

  const totalHistory = await prisma.history.count();

  const totalFavorites = await prisma.favorite.count();

  return (
    <main className="mx-auto max-w-7xl p-10">

      <h1 className="text-5xl font-bold">
        🚀 PDFRocket Admin
      </h1>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Users"
          value={totalUsers}
        />

        <StatCard
          title="Pro Users"
          value={proUsers}
        />

        <StatCard
          title="Free Users"
          value={freeUsers}
        />

        <StatCard
          title="PDF Jobs"
          value={totalHistory}
        />

      </div>

      <div className="mt-6">

        <StatCard
          title="Favorites Saved"
          value={totalFavorites}
        />

      </div>

    </main>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg">

      <h2 className="text-lg text-zinc-500">
        {title}
      </h2>

      <p className="mt-4 text-5xl font-bold text-blue-600">
        {value}
      </p>

    </div>
  );
}