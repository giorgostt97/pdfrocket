"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import UploadBox from "../components/UploadBox";
import SelectedFiles from "../components/SelectedFiles";
import PrimaryButton from "../components/PrimaryButton";
import ToolPage from "../components/ToolPage";

export default function ReversePagesPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function reversePages() {
    if (files.length !== 1) {
      toast.error("Please select exactly one PDF.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", files[0]);

      const res = await fetch("/api/reverse-pages", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        toast.error("Failed to reverse PDF.");
        return;
      }

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "reversed.pdf";
      a.click();

      window.URL.revokeObjectURL(url);

      toast.success("Pages reversed successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolPage
      title="🔄 Reverse PDF Pages"
      description="Reverse the order of every page in your PDF."
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
        loadingText="Reversing..."
        text="🔄 Reverse PDF Pages"
        onClick={reversePages}
      />
    </ToolPage>
  );
}