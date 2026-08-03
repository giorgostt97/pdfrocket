"use client";

import { useState } from "react";
import UploadBox from "../components/UploadBox";

export default function JpgToPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function convertToPDF() {
    if (files.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
      });

      const res = await fetch("/api/jpg-to-pdf", {
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
      a.download = "images.pdf";
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
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-5xl font-bold text-center">
          🖼 JPG to PDF
        </h1>

        <p className="text-center text-gray-500 mt-4">
          Convert one or more JPG or PNG images into a PDF.
        </p>

        <UploadBox
          accept={{
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
          }}
          onChange={(newFiles) =>
            setFiles((prev) => [...prev, ...newFiles])
          }
        />

        {files.length > 0 && (
          <div className="mt-8">
            <h3 className="font-semibold mb-3">
              Selected Images
            </h3>

            <div className="space-y-3">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl bg-gray-100 px-4 py-3"
                >
                  <div>
                    <p className="font-medium truncate">
                      🖼 {file.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700 text-xl font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={convertToPDF}
          disabled={loading || files.length === 0}
          className="mt-8 w-full rounded-xl bg-black py-4 text-lg font-semibold text-white transition hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "⏳ Converting..." : `🖼 Convert ${files.length} Image${files.length !== 1 ? "s" : ""} to PDF`}
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          🔒 Your images are processed securely and deleted after conversion.
        </p>

      </div>
    </main>
  );
}