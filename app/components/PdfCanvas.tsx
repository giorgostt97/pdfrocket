"use client";

import { useEffect, useRef } from "react";

type Props = {
  page: any;
  pageNumber: number;
};

export default function PdfCanvas({
  page,
  pageNumber,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    async function renderPage() {
      try {
        const canvas = canvasRef.current;

        if (!canvas) return;

        // Better thumbnail size
        const viewport = page.getViewport({
          scale: 0.25,
        });

        const context = canvas.getContext("2d");

        if (!context) return;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;
      } catch (error) {
        console.error("Thumbnail render failed:", error);
      }
    }

    renderPage();
  }, [page]);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-lg transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-blue-500/20">
      <div className="flex h-[320px] items-center justify-center overflow-hidden rounded-xl bg-white p-3">
        <canvas
          ref={canvasRef}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <p className="mt-4 text-center text-sm font-medium text-zinc-400">
        Page {pageNumber}
      </p>
    </div>
  );
}