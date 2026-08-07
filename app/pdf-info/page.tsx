"use client";

import { useState } from "react";
import { useAuth, SignInButton } from "@clerk/nextjs";
import toast from "react-hot-toast";

import UploadBox from "../components/UploadBox";
import SelectedFiles from "../components/SelectedFiles";
import PrimaryButton from "../components/PrimaryButton";
import ToolPage from "../components/ToolPage";
import ToolSeo from "../components/ToolSeo";

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
  const { isSignedIn } = useAuth();

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<PdfInfo | null>(null);

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setInfo(null);
  }

  async function getPdfInfo() {
    if (!isSignedIn) {
      return;
    }

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

      if (res.status === 401) {
        toast.error("Please sign in first.");
        return;
      }

      if (res.status === 403) {
        toast.error("You have no credits remaining.");
        return;
      }

      if (!res.ok) {
        toast.error("Failed to read PDF.");
        return;
      }

      const remainingCredits =
        res.headers.get("X-Credits-Remaining");

      const data = await res.json();

      setInfo(data);

      if (remainingCredits === "Unlimited") {
        toast.success(
          "PDF information loaded! Unlimited credits remaining."
        );
      } else {
        toast.success(
          `PDF information loaded! ${remainingCredits} credits remaining.`
        );
      }

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolPage
      tool="PDF Information"
      title="📄 PDF Information"
      description="View metadata and information about your PDF."
    >
      {!isSignedIn && (
        <div className="mb-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 text-center">

          <h2 className="text-2xl font-bold text-zinc-900">
            Create a free account to inspect PDFs
          </h2>

          <p className="mt-3 text-zinc-600">
            Get <strong>20 lifetime credits</strong> for free and access all PDF tools.
          </p>

          <div className="mt-6">
            <SignInButton mode="modal">
              <button className="rounded-2xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700">
                Sign In / Sign Up
              </button>
            </SignInButton>
          </div>

        </div>
      )}

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

      {isSignedIn ? (
        <PrimaryButton
          loading={loading}
          disabled={loading || files.length !== 1}
          loadingText="⏳ Reading PDF..."
          text="📄 Get PDF Information"
          onClick={getPdfInfo}
        />
      ) : (
        <SignInButton mode="modal">
          <button className="mt-6 w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700">
            🔒 Sign In to View PDF Information
          </button>
        </SignInButton>
      )}

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

      <ToolSeo
        tool="PDF Information"
        description="View PDF metadata online for free with PDFRocket. Inspect page count, author, title, dimensions, creator and more."
      />
    </ToolPage>
  );
}