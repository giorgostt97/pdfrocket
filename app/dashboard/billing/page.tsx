import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

import BillingActions from "./BillingActions";

export default async function BillingPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) {
    redirect("/dashboard");
  }

  let subscription: Awaited<
    ReturnType<typeof stripe.subscriptions.retrieve>
  > | null = null;

  if (user.isPro && user.stripeSubscriptionId) {
    try {
      subscription = await stripe.subscriptions.retrieve(
        user.stripeSubscriptionId
      );
    } catch (error) {
      console.error(
        "Unable to retrieve Stripe subscription:",
        error
      );
    }
  }

  const isPro =
    user.isPro &&
    subscription &&
    (subscription.status === "active" ||
      subscription.status === "trialing");

  const isCancelling =
    !!subscription?.cancel_at_period_end;

  const cancelDate = subscription?.cancel_at
    ? new Date(subscription.cancel_at * 1000)
    : null;

  const formattedCancelDate = cancelDate
    ? cancelDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="w-full min-w-0 px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-white">
        💳 Billing
      </h1>

      <p className="mt-4 text-zinc-300">
        Manage your PDFRocket subscription and billing.
      </p>

      {isPro ? (
        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-white">
                  Pro Subscription
                </h2>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    isCancelling
                      ? "bg-yellow-500/10 text-yellow-400"
                      : "bg-green-500/10 text-green-400"
                  }`}
                >
                  {isCancelling ? "Cancelling" : "Active"}
                </span>
              </div>

              {isCancelling ? (
                <p className="mt-3 text-yellow-400">
                  Your Pro subscription will cancel on{" "}
                  <strong>{formattedCancelDate}</strong>.
                </p>
              ) : (
                <p className="mt-3 text-zinc-400">
                  Your Pro subscription is active and you
                  have unlimited access to PDFRocket tools.
                </p>
              )}
            </div>
          </div>

          <p className="mt-4 text-zinc-400">
            Manage your subscription, payment method,
            invoices, and cancellation through Stripe.
          </p>

          <BillingActions />
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-white">
              Free Plan
            </h2>

            <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm font-semibold text-zinc-300">
              Free
            </span>
          </div>

          <p className="mt-3 text-zinc-400">
            You are currently on the Free plan.
          </p>

          <p className="mt-2 text-zinc-400">
            You have{" "}
            <strong className="text-white">
              {user.credits}
            </strong>{" "}
            credits remaining.
          </p>

          <a
            href="/pricing"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
          >
            Upgrade to Pro
          </a>
        </div>
      )}
    </div>
  );
}