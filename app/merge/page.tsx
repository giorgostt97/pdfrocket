"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import UploadBox from "../components/UploadBox";
import SelectedFiles from "../components/SelectedFiles";
import PrimaryButton from "../components/PrimaryButton";
import ToolPage from "../components/ToolPage";

export default function MergePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function mergePDFs() {
    if (files.length < 2) {
      toast("Please select at least 2 PDFs.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
      });

      const res = await fetch("/api/merge", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        toast.error("Merge failed.");
        return;
      }

      const blob = await res.blob();

      toast.success("PDF merged successfully!");

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
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
    <ToolPage
      title="📄 Merge PDF"
      description="Combine multiple PDF files into one document."
    >
      <UploadBox
        onChange={(newFiles) =>
          setFiles((prev) => [...prev, ...newFiles])
        }
      />

      <SelectedFiles
        files={files}
        onRemove={removeFile}
      />

      <PrimaryButton
        loading={loading}
        disabled={loading || files.length < 2}
        loadingText="⏳ Merging PDFs..."
        text={`🚀 Merge ${files.length} PDF${files.length !== 1 ? "s" : ""}`}
        onClick={mergePDFs}
      />
    </ToolPage>
  );
}