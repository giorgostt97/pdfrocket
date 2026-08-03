"use client";

import { useState } from "react";
import UploadBox from "../components/UploadBox";

export default function PdfToJpgPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function convertToJPG() {
    if (files.length !== 1) {
      alert("Please select one PDF.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("file", files[0]);

      const res = await fetch("/api/pdf-to-jpg", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        alert("Conversion failed");
        return;
      }

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "images.zip";
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen py-16">
      <div className="max-w-2xl mx-auto rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl p-10">

        <h1 className="text-5xl font-bold text-center text-white">
          📷 PDF to JPG
        </h1>

        <p className="mt-4 text-center text-zinc-400">
          Convert every page of your PDF into JPG images.
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
                    className="text-red-500 hover:text-red-400 text-xl font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={convertToJPG}
          disabled={loading || files.length !== 1}
          className="mt-8 w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "⏳ Converting..." : "📷 Convert to JPG"}
        </button>

        <p className="mt-6 text-center text-sm text-zinc-400">
          🔒 Your PDF is processed securely and deleted after conversion.
        </p>

      </div>
    </main>
  );
}