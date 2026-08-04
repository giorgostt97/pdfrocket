"use client";

import { useEffect, useRef } from "react";

type Props = {
  page: any;
  pageNumber: number;
};

export default function PdfPageImage({
  page,
  pageNumber,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;
    let renderTask: any = null;

    async function renderPage() {
      try {
        const canvas = canvasRef.current;

        if (!canvas || cancelled) return;

        const viewport = page.getViewport({
          scale: 2,
        });

        const context = canvas.getContext("2d");

        if (!context) return;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        renderTask = page.render({
          canvasContext: context,
          viewport,
        });

        await renderTask.promise;
      } catch (error: any) {
        // Ignore cancellation errors
        if (error?.name !== "RenderingCancelledException") {
          console.error(error);
        }
      }
    }

    renderPage();

    return () => {
      cancelled = true;

      if (renderTask) {
        try {
          renderTask.cancel();
        } catch {}
      }
    };
  }, [page]);

  function download() {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const link = document.createElement("a");

    link.download = `page-${pageNumber}.jpg`;
    link.href = canvas.toDataURL("image/jpeg", 1);
    link.click();
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-lg transition hover:-translate-y-1 hover:border-blue-500">
      <div className="overflow-hidden rounded-xl bg-white p-2">
        <canvas
          ref={canvasRef}
          className="w-full rounded-lg"
        />
      </div>

      <button
        onClick={download}
        className="mt-4 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Download Page {pageNumber} as JPG
      </button>
    </div>
  );
}