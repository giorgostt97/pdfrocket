"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import UploadBox from "../components/UploadBox";
import SelectedFiles from "../components/SelectedFiles";
import PrimaryButton from "../components/PrimaryButton";

export default function WatermarkPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function addWatermark() {
    if (files.length !== 1) {
      toast("Please select exactly one PDF.");
      return;
    }

    if (!text.trim()) {
      toast("Enter watermark text.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("file", files[0]);
      formData.append("text", text);

      const res = await fetch("/api/watermark", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        toast.error("Watermark failed.");
        return;
      }

      const blob = await res.blob();

      toast.success("Watermark added successfully!");

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "watermarked.pdf";
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
          💧 Watermark PDF
        </h1>

        <p className="mt-4 text-center text-gray-400">
          Add a custom watermark to every page of your PDF.
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
            Watermark Text
          </label>

          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Example: CONFIDENTIAL"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <PrimaryButton
          loading={loading}
          disabled={loading || files.length !== 1}
          loadingText="Adding Watermark..."
          text="Add Watermark"
          onClick={addWatermark}
        />

        <p className="mt-6 text-center text-sm text-gray-400">
          🔒 Your PDF is processed securely and deleted after processing.
        </p>

      </div>
    </main>
  );
}