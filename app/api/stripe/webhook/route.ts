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

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is missing");

    return NextResponse.json(
      { error: "Webhook secret is not configured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (err) {
    console.error(
      "Stripe webhook signature verification failed:",
      err
    );

    return NextResponse.json(
      { error: "Webhook Error" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session =
          event.data.object as Stripe.Checkout.Session;

        const userId = session.metadata?.userId;

        if (!userId) {
          console.error(
            "No userId found in checkout session metadata"
          );
          break;
        }

        const subscriptionId =
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription?.id;

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            isPro: true,
            subscriptionStatus: "active",
            stripeSubscriptionId:
              subscriptionId ?? null,
          },
        });

        console.log(`User ${userId} upgraded to Pro`);

        break;
      }

      case "customer.subscription.updated": {
        const subscription =
          event.data.object as Stripe.Subscription;

        const isActive =
          subscription.status === "active" ||
          subscription.status === "trialing";

        await prisma.user.updateMany({
          where: {
            stripeSubscriptionId: subscription.id,
          },
          data: {
            isPro: isActive,
            subscriptionStatus: subscription.status,
          },
        });

        break;
      }

      case "customer.subscription.deleted": {
        const subscription =
          event.data.object as Stripe.Subscription;

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

      case "invoice.payment_failed": {
        const invoice =
          event.data.object as Stripe.Invoice;

        console.error(
          `Stripe payment failed for customer ${invoice.customer}`
        );

        break;
      }

      default:
        break;
    }
  } catch (error) {
    console.error(
      "Stripe webhook database error:",
      error
    );

    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    received: true,
  });
}