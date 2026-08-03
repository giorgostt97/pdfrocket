"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import UploadBox from "../components/UploadBox";
import SelectedFiles from "../components/SelectedFiles";
import PrimaryButton from "../components/PrimaryButton";
import ToolPage from "../components/ToolPage";

export default function JpgToPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function convertToPDF() {
    if (files.length === 0) {
      toast("Please select at least one image.");
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
        toast.error("Conversion failed.");
        return;
      }

      const blob = await res.blob();

      toast.success("Images converted successfully!");

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "images.pdf";
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
      title="🖼 JPG to PDF"
      description="Convert one or more JPG or PNG images into a PDF."
    >
      <UploadBox
        accept={{
          "image/jpeg": [".jpg", ".jpeg"],
          "image/png": [".png"],
        }}
        onChange={(newFiles) =>
          setFiles((prev) => [...prev, ...newFiles])
        }
      />

      <SelectedFiles
        files={files}
        onRemove={removeFile}
        icon="image"
      />

      <PrimaryButton
        loading={loading}
        disabled={loading || files.length === 0}
        loadingText="⏳ Converting..."
        text={`🖼 Convert ${files.length} Image${
          files.length !== 1 ? "s" : ""
        } to PDF`}
        onClick={convertToPDF}
      />
    </ToolPage>
  );
}