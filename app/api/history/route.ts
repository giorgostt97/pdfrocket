import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getHistory } from "@/lib/history";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json([], { status: 401 });
  }

  const history = await getHistory(userId);

  return NextResponse.json(history);
}