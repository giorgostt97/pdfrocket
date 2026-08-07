"use client";

import { useState } from "react";
import { useAuth, SignInButton } from "@clerk/nextjs";
import toast from "react-hot-toast";

import UploadBox from "../components/UploadBox";
import SelectedFiles from "../components/SelectedFiles";
import ToolPage from "../components/ToolPage";
import ToolSeo from "../components/ToolSeo";
import PdfPageImage from "../components/PdfPageImage";

import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export default function PdfToJpgPage() {
  const { isSignedIn } = useAuth();

  const [files, setFiles] = useState<File[]>([]);
  const [pages, setPages] = useState<any[]>([]);

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPages([]);
  }

  async function loadPdf(selectedFiles: File[]) {
    if (!isSignedIn) {
      return;
    }

    if (selectedFiles.length !== 1) {
      toast.error("Please upload exactly one PDF.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFiles[0]);

      const res = await fetch("/api/pdf-to-jpg", {
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

      const loadingTask = pdfjsLib.getDocument({
        data: bytes.slice(),
      });

      const pdf = await loadingTask.promise;

      const loadedPages = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        loadedPages.push(page);
      }

      setPages(loadedPages);

      if (remainingCredits === "Unlimited") {
        toast.success(
          `${pdf.numPages} pages loaded! Unlimited credits remaining.`
        );
      } else {
        toast.success(
          `${pdf.numPages} pages loaded! ${remainingCredits} credits remaining.`
        );
      }

    } catch (error) {
      console.error(error);
      toast.error("Failed to load PDF.");
    }
  }

  return (
    <ToolPage
      tool="PDF to JPG"
      title="🖼 PDF to JPG"
      description="Convert every PDF page into high-quality JPG images."
    >
      {!isSignedIn && (
        <div className="mb-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 text-center">

          <h2 className="text-2xl font-bold text-zinc-900">
            Create a free account to convert PDFs to JPG
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

          {pages.length > 0 && (
            <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {pages.map((page, index) => (
                <PdfPageImage
                  key={index}
                  page={page}
                  pageNumber={index + 1}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <SignInButton mode="modal">
          <button className="mt-6 w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700">
            🔒 Sign In to Convert PDF
          </button>
        </SignInButton>
      )}

      <ToolSeo
        tool="PDF to JPG"
        description="Convert PDF pages into JPG images online for free with PDFRocket."
      />
    </ToolPage>
  );
}