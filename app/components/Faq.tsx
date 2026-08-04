type FAQ = {
  question: string;
  answer: string;
};

export default function Faq({ items }: { items: FAQ[] }) {
  return (
    <section className="mx-auto mt-16 max-w-4xl">
      <h2 className="mb-8 text-center text-3xl font-bold">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {items.map((item, index) => (
          <details
            key={index}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
          >
            <summary className="cursor-pointer text-lg font-semibold text-white">
              {item.question}
            </summary>

            <p className="mt-3 leading-7 text-zinc-400">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}