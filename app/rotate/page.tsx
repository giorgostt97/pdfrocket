"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import UploadBox from "../components/UploadBox";
import SelectedFiles from "../components/SelectedFiles";
import PrimaryButton from "../components/PrimaryButton";
import ToolPage from "../components/ToolPage";

export default function RotatePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [rotation, setRotation] = useState(90);

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function rotatePDF() {
    if (files.length !== 1) {
      toast("Please select exactly one PDF.");
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
        toast.error("Rotation failed.");
        return;
      }

      const blob = await res.blob();

      toast.success("PDF rotated successfully!");

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "rotated.pdf";
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
      title="🔄 Rotate PDF"
      description="Rotate every page in your PDF."
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
        <label className="block mb-2 font-semibold">
          Rotation
        </label>

        <select
          value={rotation}
          onChange={(e) => setRotation(Number(e.target.value))}
          className="w-full rounded-xl border p-3"
        >
          <option value={90}>90°</option>
          <option value={180}>180°</option>
          <option value={270}>270°</option>
        </select>
      </div>

      <PrimaryButton
        loading={loading}
        disabled={loading || files.length !== 1}
        loadingText="⏳ Rotating..."
        text="🔄 Rotate PDF"
        onClick={rotatePDF}
      />
    </ToolPage>
  );
}