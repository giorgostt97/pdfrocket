import Link from "next/link";
import ManageSubscriptionButton from "./ManageSubscriptionButton";

type PlanCardProps = {
  isPro: boolean;
};

export default function PlanCard({
  isPro,
}: PlanCardProps) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-lg">

      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
          isPro ? "bg-yellow-500" : "bg-blue-600"
        }`}
      >
        CURRENT PLAN
      </span>

      <h2 className="mt-5 text-5xl font-extrabold text-zinc-900">
        {isPro ? "⭐ PRO" : "FREE"}
      </h2>

      <p className="mt-5 text-zinc-600">
        {isPro ? (
          <>
            You have
            <span className="font-semibold text-zinc-900">
              {" "}Unlimited PDF Processing
            </span>
            {" "}and unlimited credits.
          </>
        ) : (
          <>
            You currently have
            <span className="font-semibold text-zinc-900">
              {" "}20 Lifetime Credits
            </span>
            .
          </>
        )}
      </p>

      <ul className="mt-6 space-y-3 text-zinc-700">

        <li>✅ All PDF Tools</li>
        <li>✅ 100MB Uploads</li>

        {isPro ? (
          <>
            <li>✅ Unlimited Credits</li>
            <li>✅ Unlimited Processing</li>
            <li>✅ Priority Support</li>
            <li>✅ Future AI Features</li>
          </>
        ) : (
          <>
            <li>✅ 20 Lifetime Credits</li>
            <li>❌ Unlimited Credits</li>
            <li>❌ Priority Support</li>
            <li>❌ Future AI Features</li>
          </>
        )}

      </ul>

      <div className="mt-8">
        {isPro ? (
          <ManageSubscriptionButton />
        ) : (
          <Link
            href="/pricing"
            className="block w-full rounded-2xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
          >
            🚀 Upgrade to Pro
          </Link>
        )}
      </div>

    </div>
  );
}