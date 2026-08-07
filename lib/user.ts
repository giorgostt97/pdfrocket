import { prisma } from "./prisma";

export async function getCurrentUser(clerkId: string) {
  return prisma.user.findUnique({
    where: {
      clerkId,
    },
  });
}