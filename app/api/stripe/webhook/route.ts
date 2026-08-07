import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();

  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Webhook Error" },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session.metadata?.userId;

      if (!userId) break;

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          isPro: true,
          subscriptionStatus: "active",
          stripeSubscriptionId: session.subscription?.toString(),
        },
      });

      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;

      await prisma.user.updateMany({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          isPro: false,
          subscriptionStatus: "cancelled",
        },
      });

      break;
    }

    default:
      break;
  }

  return NextResponse.json({
    received: true,
  });
}