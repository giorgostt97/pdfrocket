"use client";

import { useState } from "react";
import UploadBox from "../components/UploadBox";

export default function RotatePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [rotation, setRotation] = useState(90);

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function rotatePDF() {
    if (files.length !== 1) {
      alert("Please select exactly one PDF.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("file", files[0]);
      formData.append("rotation", rotation.toString());

      const res = await fetch("/api/rotate", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        alert("Rotation failed");
        return;
      }

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "rotated.pdf";
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen py-16">
      <div className="max-w-2xl mx-auto rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl p-10">

        <h1 className="text-5xl font-bold text-center text-white">
          🔄 Rotate PDF
        </h1>

        <p className="mt-4 text-center text-zinc-400">
          Rotate every page in your PDF.
        </p>

        <UploadBox
          accept={{
            "application/pdf": [".pdf"],
          }}
          onChange={setFiles}
        />

        {files.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-3 font-semibold text-white">
              Selected File
            </h3>

            <div className="space-y-3">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl bg-zinc-800 px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-white">
                      📄 {file.name}
                    </p>

                    <p className="text-sm text-zinc-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  <button
                    onClick={() => removeFile(index)}
                    className="text-xl font-bold text-red-500 transition hover:text-red-400"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          <label className="mb-2 block font-semibold text-white">
            Rotation
          </label>

          <select
            value={rotation}
            onChange={(e) => setRotation(Number(e.target.value))}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white outline-none focus:border-blue-500"
          >
            <option value={90}>90°</option>
            <option value={180}>180°</option>
            <option value={270}>270°</option>
          </select>
        </div>

        <button
          onClick={rotatePDF}
          disabled={loading || files.length !== 1}
          className="mt-8 w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "⏳ Rotating..." : "🔄 Rotate PDF"}
        </button>

        <p className="mt-6 text-center text-sm text-zinc-400">
          🔒 Your PDF is processed securely and deleted after processing.
        </p>

      </div>
    </main>
  );
}