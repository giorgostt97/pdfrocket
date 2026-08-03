export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black py-20">
      <div className="mx-auto max-w-4xl px-6">

        <h1 className="text-center text-6xl font-bold text-white">
          Privacy Policy
        </h1>

        <p className="mt-10 text-lg leading-8 text-zinc-300">
          PDFRocket respects your privacy.
        </p>

        <div className="mt-10 space-y-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-10">

          <div>
            <h2 className="text-2xl font-bold text-white">
              File Processing
            </h2>

            <p className="mt-3 text-zinc-400">
              Files uploaded to PDFRocket are processed securely. We do not
              permanently store your files.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              Personal Information
            </h2>

            <p className="mt-3 text-zinc-400">
              We collect only the information necessary to provide our
              services and improve the platform.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              Cookies
            </h2>

            <p className="mt-3 text-zinc-400">
              PDFRocket may use cookies to improve user experience and
              website performance.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}