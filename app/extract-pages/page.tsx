"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import UploadBox from "../components/UploadBox";
import SelectedFiles from "../components/SelectedFiles";
import PrimaryButton from "../components/PrimaryButton";

export default function ExtractPagesPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [pages, setPages] = useState("");
  const [loading, setLoading] = useState(false);

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function extractPages() {
    if (files.length !== 1) {
      toast("Please select exactly one PDF.");
      return;
    }

    if (!pages.trim()) {
      toast("Enter the page numbers to extract.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("file", files[0]);
      formData.append("pages", pages);

      const res = await fetch("/api/extract-pages", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        toast.error("Extract failed.");
        return;
      }

      const blob = await res.blob();

      toast.success("Pages extracted successfully!");

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "extracted-pages.pdf";
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black py-16">
      <div className="max-w-2xl mx-auto rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl p-10">

        <h1 className="text-5xl font-bold text-center text-white">
          📑 Extract Pages
        </h1>

        <p className="mt-4 text-center text-gray-400">
          Extract selected pages into a new PDF.
        </p>

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

        <div className="mt-8">
          <label className="block mb-2 font-semibold text-white">
            Pages to extract
          </label>

          <input
            type="text"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            placeholder="Example: 2,5,8"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <p className="mt-2 text-sm text-gray-400">
            Example: 2,5,8
          </p>
        </div>

        <PrimaryButton
          loading={loading}
          disabled={loading || files.length !== 1}
          loadingText="Extracting..."
          text="Extract Pages"
          onClick={extractPages}
        />

        <p className="mt-6 text-center text-sm text-gray-400">
          🔒 Your PDF is processed securely and deleted after processing.
        </p>

      </div>
    </main>
  );
}