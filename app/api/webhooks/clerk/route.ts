import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const payload = await req.text();

  const headerPayload = await headers();

  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing headers", {
      status: 400,
    });
  }

  const wh = new Webhook(
    process.env.CLERK_WEBHOOK_SECRET!
  );

  let evt: WebhookEvent;

  try {
    evt = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch {
    return new Response("Invalid webhook", {
      status: 400,
    });
  }

  if (evt.type === "user.created") {
    await prisma.user.create({
      data: {
        clerkId: evt.data.id,
        email:
          evt.data.email_addresses[0]
            .email_address,
      },
    });
  }

  return new Response("OK");
}