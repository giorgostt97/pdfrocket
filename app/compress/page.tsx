"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import UploadBox from "../components/UploadBox";
import SelectedFiles from "../components/SelectedFiles";
import ToolPage from "../components/ToolPage";

export default function CompressPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [level, setLevel] = useState("medium");
  const [loading, setLoading] = useState(false);

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function compressPdf() {
    if (files.length !== 1) {
      toast.error("Please upload one PDF.");
      return;
    }

    setLoading(true);

    try {
      // Compression logic goes here later

      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("PDF compressed successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Compression failed.");
    }

    setLoading(false);
  }

  return (
    <ToolPage
      title="🗜 Compress PDF"
      description="Reduce PDF size while keeping the best possible quality."
    >
      <UploadBox
        accept={{
          "application/pdf": [".pdf"],
        }}
        onChange={setFiles}
      />

      <SelectedFiles
        files={files}
        onRemove={removeFile}
      />

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="text-xl font-bold text-white">
          Compression Level
        </h2>

        <div className="mt-6 space-y-4">

          <label className="flex items-center gap-3 text-zinc-300">
            <input
              type="radio"
              value="low"
              checked={level === "low"}
              onChange={(e) => setLevel(e.target.value)}
            />
            Low (Best Quality)
          </label>

          <label className="flex items-center gap-3 text-zinc-300">
            <input
              type="radio"
              value="medium"
              checked={level === "medium"}
              onChange={(e) => setLevel(e.target.value)}
            />
            Medium (Recommended)
          </label>

          <label className="flex items-center gap-3 text-zinc-300">
            <input
              type="radio"
              value="high"
              checked={level === "high"}
              onChange={(e) => setLevel(e.target.value)}
            />
            High (Smallest File)
          </label>

        </div>

        <button
          onClick={compressPdf}
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Compressing..." : "Compress PDF"}
        </button>
      </div>
    </ToolPage>
  );
}