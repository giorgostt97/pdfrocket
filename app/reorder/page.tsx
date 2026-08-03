"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import UploadBox from "../components/UploadBox";
import SelectedFiles from "../components/SelectedFiles";
import PrimaryButton from "../components/PrimaryButton";

export default function ReorderPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [order, setOrder] = useState("");
  const [loading, setLoading] = useState(false);

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function reorderPDF() {
    if (files.length !== 1) {
      toast("Please select exactly one PDF.");
      return;
    }

    if (!order.trim()) {
      toast("Enter the new page order.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("file", files[0]);
      formData.append("order", order);

      const res = await fetch("/api/reorder", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        toast.error("Reorder failed.");
        return;
      }

      const blob = await res.blob();

      toast.success("Pages reordered successfully!");

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "reordered.pdf";
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
          🔀 Reorder Pages
        </h1>

        <p className="mt-4 text-center text-gray-400">
          Change the order of pages in your PDF.
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
            New page order
          </label>

          <input
            type="text"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            placeholder="Example: 5,4,3,2,1"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <p className="mt-2 text-sm text-gray-400">
            Example: 5,4,3,2,1
          </p>
        </div>

        <PrimaryButton
          loading={loading}
          disabled={loading || files.length !== 1}
          loadingText="Reordering..."
          text="Reorder Pages"
          onClick={reorderPDF}
        />

        <p className="mt-6 text-center text-sm text-gray-400">
          🔒 Your PDF is processed securely and deleted after processing.
        </p>

      </div>
    </main>
  );
}