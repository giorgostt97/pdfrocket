import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getFavorites } from "@/lib/favorites";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json([], { status: 401 });
  }

  const favorites = await getFavorites(userId);

  return NextResponse.json(favorites);
}