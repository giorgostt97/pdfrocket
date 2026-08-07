export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black">

      <div className="text-center">

        <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-zinc-700 border-t-blue-600" />

        <h2 className="mt-8 text-2xl font-bold text-white">
          Loading PDFRocket...
        </h2>

      </div>

    </main>
  );
}