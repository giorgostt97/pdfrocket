type Props = {
  name: string;
  email: string;
  credits: number;
  isPro: boolean;
  processed: number;
  memberSince: string;
};

export default function ProfileCard({
  name,
  email,
  credits,
  isPro,
  processed,
  memberSince,
}: Props) {
  return (
    <div className="rounded-3xl border border-zinc-700 bg-zinc-900 p-8 shadow-lg">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-5">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-3xl font-bold text-white shadow-lg">
            {name.charAt(0).toUpperCase()}
          </div>

          <div>

            <h2 className="text-3xl font-bold text-white">
              {name}
            </h2>

            <p className="mt-1 text-lg text-zinc-300">
              {email}
            </p>

            <div className="mt-4 flex items-center gap-2">

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white ${
                  isPro ? "bg-green-600" : "bg-blue-600"
                }`}
              >
                {isPro ? "PRO PLAN" : "FREE PLAN"}
              </span>

              {!isPro && (
                <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  {credits} Credits
                </span>
              )}

            </div>

          </div>

        </div>

      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">

        <div className="rounded-2xl bg-zinc-800 p-5">

          <p className="text-sm text-zinc-300">
            Credits Remaining
          </p>

          <h3 className="mt-2 text-3xl font-bold text-white">
            {isPro ? "∞" : credits}
          </h3>

        </div>

        <div className="rounded-2xl bg-zinc-800 p-5">

          <p className="text-sm text-zinc-300">
            PDFs Processed
          </p>

          <h3 className="mt-2 text-3xl font-bold text-white">
            {processed}
          </h3>

        </div>

        <div className="rounded-2xl bg-zinc-800 p-5">

          <p className="text-sm text-zinc-300">
            Member Since
          </p>

          <h3 className="mt-2 text-xl font-bold text-white">
            {memberSince}
          </h3>

        </div>

      </div>

    </div>
  );
}