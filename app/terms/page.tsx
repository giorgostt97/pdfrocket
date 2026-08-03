export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black py-20">
      <div className="mx-auto max-w-4xl px-6">

        <h1 className="text-center text-6xl font-bold text-white">
          Terms of Service
        </h1>

        <div className="mt-12 space-y-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-10">

          <div>
            <h2 className="text-2xl font-bold text-white">
              Acceptance
            </h2>

            <p className="mt-3 text-zinc-400">
              By using PDFRocket, you agree to these terms of service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              Usage
            </h2>

            <p className="mt-3 text-zinc-400">
              You agree not to misuse the platform or upload unlawful
              content.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              Availability
            </h2>

            <p className="mt-3 text-zinc-400">
              We strive to keep PDFRocket available at all times, but we
              cannot guarantee uninterrupted service.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}