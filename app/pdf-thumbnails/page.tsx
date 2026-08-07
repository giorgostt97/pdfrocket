"use client";

import { useState } from "react";
import { useAuth, SignInButton } from "@clerk/nextjs";
import toast from "react-hot-toast";

import UploadBox from "../components/UploadBox";
import SelectedFiles from "../components/SelectedFiles";
import ToolPage from "../components/ToolPage";
import ToolSeo from "../components/ToolSeo";

import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export default function PdfThumbnailsPage() {
  const { isSignedIn } = useAuth();

  const [files, setFiles] = useState<File[]>([]);
  const [pageCount, setPageCount] = useState<number | null>(null);

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPageCount(null);
  }

  async function loadPdf(selectedFiles: File[]) {
    if (!isSignedIn) return;

    if (selectedFiles.length !== 1) {
      toast.error("Please upload exactly one PDF.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFiles[0]);

      const res = await fetch("/api/pdf-thumbnails", {
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
        toast.error("Failed to load PDF.");
        return;
      }

      const remainingCredits =
        res.headers.get("X-Credits-Remaining");

      const bytes = new Uint8Array(
        await selectedFiles[0].arrayBuffer()
      );

      const pdf = await pdfjsLib.getDocument({
        data: bytes.slice(),
      }).promise;

      setPageCount(pdf.numPages);

      if (remainingCredits === "Unlimited") {
        toast.success(
          `Loaded ${pdf.numPages} pages! Unlimited credits remaining.`
        );
      } else {
        toast.success(
          `Loaded ${pdf.numPages} pages! ${remainingCredits} credits remaining.`
        );
      }

    } catch (error) {
      console.error(error);
      toast.error("Failed to load PDF.");
    }
  }

  return (
    <ToolPage
      tool="PDF Thumbnails"
      title="🖼 PDF Thumbnails"
      description="Preview every page of your PDF."
    >
      {!isSignedIn && (
        <div className="mb-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 text-center">
          <h2 className="text-2xl font-bold text-zinc-900">
            Create a free account to preview PDF thumbnails
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

      {isSignedIn ? (
        <>
          <UploadBox
            accept={{
              "application/pdf": [".pdf"],
            }}
            onChange={(selectedFiles) => {
              setFiles(selectedFiles);
              loadPdf(selectedFiles);
            }}
          />

          <SelectedFiles
            files={files}
            onRemove={removeFile}
          />

          {pageCount !== null && (
            <div className="mt-8 rounded-2xl border border-zinc-700 bg-zinc-900 p-6 text-center">
              <h2 className="text-2xl font-bold text-white">
                PDF Loaded Successfully
              </h2>

              <p className="mt-4 text-lg text-zinc-300">
                This PDF contains{" "}
                <span className="font-bold text-blue-400">
                  {pageCount}
                </span>{" "}
                pages.
              </p>

              <p className="mt-2 text-zinc-400">
                Thumbnail preview will be available in a future update.
              </p>
            </div>
          )}
        </>
      ) : (
        <SignInButton mode="modal">
          <button className="mt-6 w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700">
            🔒 Sign In to Preview PDF
          </button>
        </SignInButton>
      )}

      <ToolSeo
        tool="PDF Thumbnails"
        description="Preview every page of your PDF online with PDFRocket."
      />
    </ToolPage>
  );
}