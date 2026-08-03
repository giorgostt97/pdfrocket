"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import UploadBox from "../components/UploadBox";
import SelectedFiles from "../components/SelectedFiles";
import PrimaryButton from "../components/PrimaryButton";
import ToolPage from "../components/ToolPage";

export default function SplitPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function splitPDF() {
    if (files.length !== 1) {
      toast("Please select exactly one PDF.");
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
        toast.error("Split failed.");
        return;
      }

      const blob = await res.blob();

      toast.success("PDF split successfully!");

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "split-pages.zip";
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
      title="✂️ Split PDF"
      description="Split your PDF into individual pages."
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

      <PrimaryButton
        loading={loading}
        disabled={loading || files.length !== 1}
        loadingText="⏳ Splitting..."
        text="✂️ Split PDF"
        onClick={splitPDF}
      />
    </ToolPage>
  );
}