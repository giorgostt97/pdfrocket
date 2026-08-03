export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black py-20">
      <div className="mx-auto max-w-3xl px-6">

        <h1 className="text-center text-6xl font-bold text-white">
          Contact
        </h1>

        <p className="mt-6 text-center text-zinc-400">
          Have a question or feedback? We'd love to hear from you.
        </p>

        <div className="mt-16 rounded-3xl border border-zinc-800 bg-zinc-900 p-10">

          <h2 className="text-2xl font-bold text-white">
            Email
          </h2>

          <p className="mt-4 text-lg text-zinc-300">
            support@pdfrocket.app
          </p>

          <p className="mt-8 text-zinc-400">
            We aim to reply within 24–48 hours.
          </p>

        </div>

      </div>
    </main>
  );
}