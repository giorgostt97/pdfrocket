import { prisma } from "./prisma";

export async function getFavorites(clerkId: string) {
  const user = await prisma.user.findUnique({
    where: {
      clerkId,
    },
    include: {
      favorites: true,
    },
  });

  return user?.favorites ?? [];
}