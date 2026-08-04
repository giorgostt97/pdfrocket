"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import UploadBox from "../components/UploadBox";
import SelectedFiles from "../components/SelectedFiles";
import PrimaryButton from "../components/PrimaryButton";
import ToolPage from "../components/ToolPage";

type PdfInfo = {
  fileName: string;
  pageCount: number;
  title: string;
  author: string;
  subject: string;
  creator: string;
  producer: string;
  keywords: string;
  creationDate: string;
  modificationDate: string;
  pageWidth: number;
  pageHeight: number;
};

export default function PdfInfoPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<PdfInfo | null>(null);

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setInfo(null);
  }

  async function getPdfInfo() {
    if (files.length !== 1) {
      toast.error("Please select exactly one PDF.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("file", files[0]);

      const res = await fetch("/api/pdf-info", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        toast.error("Failed to read PDF.");
        return;
      }

      const data = await res.json();

      setInfo(data);

      toast.success("PDF information loaded!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolPage
      title="📄 PDF Information"
      description="View metadata and information about your PDF."
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
        loadingText="Reading..."
        text="📄 Get PDF Information"
        onClick={getPdfInfo}
      />

      {info && (
        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-left">
          <h2 className="mb-6 text-2xl font-bold text-white">
            PDF Information
          </h2>

          <div className="space-y-3 text-zinc-300">

            <p><strong>File:</strong> {info.fileName}</p>
            <p><strong>Pages:</strong> {info.pageCount}</p>
            <p><strong>Title:</strong> {info.title}</p>
            <p><strong>Author:</strong> {info.author}</p>
            <p><strong>Subject:</strong> {info.subject}</p>
            <p><strong>Creator:</strong> {info.creator}</p>
            <p><strong>Producer:</strong> {info.producer}</p>
            <p><strong>Keywords:</strong> {info.keywords}</p>
            <p><strong>Created:</strong> {info.creationDate}</p>
            <p><strong>Modified:</strong> {info.modificationDate}</p>
            <p><strong>Width:</strong> {info.pageWidth}px</p>
            <p><strong>Height:</strong> {info.pageHeight}px</p>

          </div>
        </div>
      )}
    </ToolPage>
  );
}