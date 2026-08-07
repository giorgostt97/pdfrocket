import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { tool } = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
    include: {
      favorites: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  const existing = user.favorites.find(
    (favorite) => favorite.tool === tool
  );

  if (existing) {
    await prisma.favorite.delete({
      where: {
        id: existing.id,
      },
    });

    return NextResponse.json({
      favorite: false,
    });
  }

  await prisma.favorite.create({
    data: {
      tool,
      userId: user.id,
    },
  });

  return NextResponse.json({
    favorite: true,
  });
}