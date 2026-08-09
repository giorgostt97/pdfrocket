import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

import WelcomeCard from "./components/WelcomeCard";
import CreditsCard from "./components/CreditsCard";
import PlanCard from "./components/PlanCard";
import ActivityCard from "./components/ActivityCard";
import FavoritesCard from "./components/FavoritesCard";
import QuickActions from "./components/QuickActions";
import LatestUpdates from "./components/LatestUpdates";
import ProfileCard from "./components/ProfileCard";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const clerkUser = await currentUser();

  let user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
    include: {
      history: true,
      favorites: true,
    },
  });

  if (!user && clerkUser) {
    user = await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
        credits: 20,
        isPro: false,
      },
      include: {
        history: true,
        favorites: true,
      },
    });
  }

  return (
    <div className="w-full min-w-0 px-4 py-6 sm:px-6 lg:px-8">
      <WelcomeCard
        name={clerkUser?.firstName || "User"}
      />

      <div className="mt-6 w-full min-w-0">
        <ProfileCard
          name={clerkUser?.firstName || "User"}
          email={clerkUser?.emailAddresses[0]?.emailAddress || ""}
          credits={user?.credits ?? 20}
          isPro={user?.isPro ?? false}
          processed={user?.history.length ?? 0}
          memberSince={
            user?.createdAt.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            }) ?? ""
          }
        />
      </div>

      <div className="mt-8 grid w-full min-w-0 gap-6 lg:grid-cols-2">
        <CreditsCard
          credits={user?.credits ?? 20}
          isPro={user?.isPro ?? false}
        />

        <PlanCard
          isPro={user?.isPro ?? false}
        />
      </div>

      <div className="mt-8 w-full min-w-0">
        <ActivityCard
          history={user?.history ?? []}
        />
      </div>

      <div className="mt-8 grid w-full min-w-0 gap-6 lg:grid-cols-2">
        <FavoritesCard
          favorites={user?.favorites ?? []}
        />

        <QuickActions />
      </div>

      <div className="mt-8 w-full min-w-0">
        <LatestUpdates />
      </div>
    </div>
  );
}