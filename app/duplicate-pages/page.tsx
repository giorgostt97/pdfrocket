"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import UploadBox from "../components/UploadBox";
import SelectedFiles from "../components/SelectedFiles";
import PrimaryButton from "../components/PrimaryButton";
import ToolPage from "../components/ToolPage";

export default function DuplicatePagesPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [pages, setPages] = useState("");
  const [loading, setLoading] = useState(false);

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function duplicatePages() {
    if (files.length !== 1) {
      toast.error("Please select exactly one PDF.");
      return;
    }

    if (!pages.trim()) {
      toast.error("Enter the page numbers to duplicate.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("file", files[0]);
      formData.append("pages", pages);

      const res = await fetch("/api/duplicate-pages", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        toast.error("Failed to duplicate pages.");
        return;
      }

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "duplicated.pdf";
      a.click();

      window.URL.revokeObjectURL(url);

      toast.success("Pages duplicated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolPage
      title="📄 Duplicate Pages"
      description="Duplicate selected pages in your PDF."
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

      <div className="mt-8">
        <label className="mb-2 block font-semibold text-white">
          Pages to duplicate
        </label>

        <input
          type="text"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          placeholder="Example: 2,5,8"
          className="w-full rounded-xl border border-zinc-700 bg-black p-3 text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none"
        />

        <p className="mt-2 text-sm text-zinc-500">
          Enter page numbers separated by commas.
        </p>
      </div>

      <PrimaryButton
        loading={loading}
        disabled={loading || files.length !== 1}
        loadingText="Duplicating..."
        text="📄 Duplicate Pages"
        onClick={duplicatePages}
      />
    </ToolPage>
  );
}