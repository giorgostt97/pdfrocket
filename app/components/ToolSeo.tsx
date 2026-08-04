type Props = {
  tool: string;
  description: string;
};

export default function ToolSeo({
  tool,
  description,
}: Props) {
  return (
    <section className="mx-auto mt-16 max-w-5xl rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
      <h2 className="text-3xl font-bold">
        {tool} Online for Free
      </h2>

      <p className="mt-6 text-lg leading-8 text-zinc-300">
        {description}
      </p>

      <h3 className="mt-12 text-2xl font-semibold">
        Why choose PDFRocket?
      </h3>

      <p className="mt-4 leading-8 text-zinc-300">
        PDFRocket is designed to be fast, secure and easy to use.
        There is no software to install and everything runs directly
        in your browser. Whether you're using Windows, macOS,
        Linux, Android or iPhone, your PDF files can be processed
        in seconds.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">

        <div className="rounded-xl border border-zinc-800 bg-black/30 p-6">
          <h4 className="font-semibold text-white">
            ⚡ Fast
          </h4>

          <p className="mt-3 text-zinc-400">
            Upload your PDF, process it and download it in seconds.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-black/30 p-6">
          <h4 className="font-semibold text-white">
            🔒 Secure
          </h4>

          <p className="mt-3 text-zinc-400">
            Files are processed securely and are never stored permanently.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-black/30 p-6">
          <h4 className="font-semibold text-white">
            💻 Works Everywhere
          </h4>

          <p className="mt-3 text-zinc-400">
            Compatible with Windows, macOS, Linux, Android and iPhone.
          </p>
        </div>

      </div>

      <h3 className="mt-12 text-2xl font-semibold">
        How to use {tool}
      </h3>

      <ol className="mt-5 list-decimal space-y-3 pl-6 text-zinc-300">
        <li>Upload your PDF file.</li>
        <li>Select the options you need.</li>
        <li>Click the action button.</li>
        <li>Download your processed PDF instantly.</li>
      </ol>

      <h3 className="mt-12 text-2xl font-semibold">
        Privacy & Security
      </h3>

      <p className="mt-4 leading-8 text-zinc-300">
        Your privacy is important to us. Uploaded documents are processed
        securely and automatically removed after processing. We never
        permanently store your files.
      </p>
    </section>
  );
}