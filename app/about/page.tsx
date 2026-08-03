export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black py-20">
      <div className="mx-auto max-w-4xl px-6">

        <h1 className="text-center text-6xl font-bold text-white">
          About PDFRocket
        </h1>

        <p className="mt-8 text-center text-xl text-zinc-400">
          Fast, secure and simple PDF tools built for everyone.
        </p>

        <div className="mt-16 rounded-3xl border border-zinc-800 bg-zinc-900 p-10">

          <h2 className="text-3xl font-bold text-white">
            Our Mission
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-300">
            PDFRocket was created to make working with PDF files fast,
            secure and effortless. Whether you need to merge, split,
            rotate, extract pages or convert documents, our goal is to
            provide powerful tools with a clean and easy-to-use experience.
          </p>

          <p className="mt-6 text-lg leading-8 text-zinc-300">
            We believe PDF tools should be accessible to everyone without
            complicated software or expensive subscriptions.
          </p>

        </div>

        <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-10">

          <h2 className="text-3xl font-bold text-white">
            Security First
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-300">
            Your files are processed securely and are never stored
            permanently. Privacy and security are at the heart of
            everything we build.
          </p>

        </div>

      </div>
    </main>
  );
}