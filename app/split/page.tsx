"use client";

import { useState } from "react";
import UploadBox from "../components/UploadBox";

export default function SplitPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function splitPDF() {
    if (files.length !== 1) {
      alert("Please select exactly 1 PDF");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("file", files[0]);

      const res = await fetch("/api/split", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        alert("Split failed");
        return;
      }

      const data = await res.json();

      alert(`Success! PDF contains ${data.pages} pages.`);
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
          ✂️ Split PDF
        </h1>

        <p className="text-center text-gray-500 mt-4">
          Upload one PDF and split it into individual pages.
        </p>

        <UploadBox
          onChange={(newFiles) => setFiles(newFiles)}
        />

        {files.length > 0 && (
          <div className="mt-8">
            <h3 className="font-semibold mb-3">
              Selected File
            </h3>

            <div className="space-y-3">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl bg-gray-100 px-4 py-3"
                >
                  <div>
                    <p className="font-medium truncate">
                      📄 {file.name}
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
          onClick={splitPDF}
          disabled={loading || files.length !== 1}
          className="mt-8 w-full rounded-xl bg-black py-4 text-lg font-semibold text-white transition hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "⏳ Splitting PDF..." : "✂️ Split PDF"}
        </button>

      </div>
    </main>
  );
}