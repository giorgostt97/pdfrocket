type CreditsCardProps = {
  credits: number;
  isPro: boolean;
};

export default function CreditsCard({
  credits,
  isPro,
}: CreditsCardProps) {
  const maxCredits = 20;

  const percentage = Math.max(
    0,
    Math.min((credits / maxCredits) * 100, 100)
  );

  if (isPro) {
    return (
      <div className="rounded-3xl border border-yellow-300 bg-gradient-to-br from-yellow-50 to-white p-6 shadow-lg">

        <h2 className="text-2xl font-bold text-zinc-900">
          ⭐ Unlimited Credits
        </h2>

        <p className="mt-5 text-5xl font-extrabold text-yellow-500">
          ∞
        </p>

        <div className="mt-6 h-4 overflow-hidden rounded-full bg-yellow-100">
          <div className="h-full w-full rounded-full bg-yellow-500" />
        </div>

        <p className="mt-5 text-zinc-600">
          As a <strong>PDFRocket Pro</strong> member, you have unlimited access to every PDF tool.
        </p>

      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-lg">

      <h2 className="text-2xl font-bold text-zinc-900">
        💳 Credits Remaining
      </h2>

      <p className="mt-5 text-5xl font-extrabold text-blue-600">
        {credits} / {maxCredits}
      </p>

      <div className="mt-6 h-4 overflow-hidden rounded-full bg-zinc-200">

        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <p className="mt-5 text-zinc-600">
        Every processed PDF uses <strong>1 credit</strong>.
      </p>

      {credits <= 5 && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">

          <p className="font-semibold text-red-700">
            ⚠️ You're running low on credits.
          </p>

          <p className="mt-1 text-sm text-red-600">
            Upgrade to <strong>PDFRocket Pro</strong> for unlimited PDF processing.
          </p>

        </div>
      )}

    </div>
  );
}