import { prisma } from "./prisma";

export async function useCredit(
  clerkId: string,
  tool: string,
  fileName: string
) {
  const user = await prisma.user.findUnique({
    where: {
      clerkId,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  if (user.isPro) {
    await prisma.history.create({
      data: {
        tool,
        fileName,
        userId: user.id,
      },
    });

    return {
      success: true,
      remainingCredits: "Unlimited",
    };
  }

  if (user.credits <= 0) {
    return {
      success: false,
      message: "No credits remaining.",
    };
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      credits: {
        decrement: 1,
      },
    },
  });

  await prisma.history.create({
    data: {
      tool,
      fileName,
      userId: user.id,
    },
  });

  return {
    success: true,
    remainingCredits: user.credits - 1,
  };
}