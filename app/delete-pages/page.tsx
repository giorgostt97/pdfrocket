"use client";

import { useState } from "react";
import UploadBox from "../components/UploadBox";

export default function DeletePagesPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [pages, setPages] = useState("");
  const [loading, setLoading] = useState(false);

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function deletePages() {
    if (files.length !== 1) {
      alert("Please select one PDF.");
      return;
    }

    if (!pages.trim()) {
      alert("Enter pages to delete.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("file", files[0]);
      formData.append("pages", pages);

      const res = await fetch("/api/delete-pages", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        alert("Delete failed");
        return;
      }

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "deleted-pages.pdf";
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
          🗑 Delete Pages
        </h1>

        <p className="text-center text-gray-500 mt-4">
          Remove selected pages from your PDF.
        </p>

        <UploadBox
          onChange={setFiles}
          accept={{
            "application/pdf": [".pdf"],
          }}
        />

        {files.length > 0 && (
          <div className="mt-8">
            <h3 className="font-semibold mb-3">
              Selected File
            </h3>

            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl bg-gray-100 px-4 py-3"
              >
                <div>
                  <p className="font-medium">
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
        )}

        <div className="mt-8">
          <label className="block font-semibold mb-2">
            Pages to delete
          </label>

          <input
            type="text"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            placeholder="Example: 2,5,7"
            className="w-full rounded-xl border p-3"
          />
        </div>

        <button
          onClick={deletePages}
          disabled={loading || files.length !== 1}
          className="mt-8 w-full rounded-xl bg-black py-4 text-lg font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "⏳ Deleting..." : "🗑 Delete Pages"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          🔒 Your PDF is processed securely and deleted after processing.
        </p>

      </div>
    </main>
  );
}