type Props = {
  name: string;
};

export default function WelcomeCard({
  name,
}: Props) {
  return (
    <div className="rounded-3xl border border-zinc-700 bg-zinc-900 p-8 shadow-lg">

      <h1 className="text-4xl font-bold text-white">
        👋 Welcome back, {name}
      </h1>

      <p className="mt-3 text-lg text-zinc-300">
        Manage your PDFs, credits and account from one place.
      </p>

    </div>
  );
}