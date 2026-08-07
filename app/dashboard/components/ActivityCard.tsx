import { History } from "@prisma/client";

type Props = {
  history: History[];
};

export default function ActivityCard({
  history,
}: Props) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold text-zinc-900">
        📈 Recent Activity
      </h2>

      {history.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center">

          <p className="text-lg font-medium text-zinc-700">
            No activity yet
          </p>

          <p className="mt-2 text-zinc-500">
            Process your first PDF to see your activity here.
          </p>

        </div>
      ) : (
        <div className="space-y-4">

          {history
            .slice()
            .reverse()
            .map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5"
              >
                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="font-semibold text-zinc-900">
                      📄 {item.tool}
                    </h3>

                    <p className="mt-1 text-zinc-600">
                      {item.fileName}
                    </p>

                  </div>

                  <span className="text-sm text-zinc-500">
                    {item.createdAt.toLocaleString()}
                  </span>

                </div>
              </div>
            ))}

        </div>
      )}

    </div>
  );
}