import { prisma } from "./prisma";

export async function getHistory(clerkId: string) {
  const user = await prisma.user.findUnique({
    where: {
      clerkId,
    },
    include: {
      history: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return user?.history ?? [];
}