"use client";

import { useState } from "react";
import { useAuth, SignInButton } from "@clerk/nextjs";
import toast from "react-hot-toast";

import SelectedFiles from "../components/SelectedFiles";
import PrimaryButton from "../components/PrimaryButton";
import ToolPage from "../components/ToolPage";
import ToolSeo from "../components/ToolSeo";

export default function ScanToPdfPage() {
  const { isSignedIn } = useAuth();

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  function addFiles(newFiles: File[]) {
    setFiles((prev) => [...prev, ...newFiles]);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function createPDF() {
    if (!isSignedIn) {
      return;
    }

    if (files.length === 0) {
      toast.error("Please scan or select at least one image.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
        formData.append("tool", "Scan to PDF");
      });

      const res = await fetch("/api/jpg-to-pdf", {
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
        toast.error("Creating PDF failed.");
        return;
      }

      const remainingCredits =
        res.headers.get("X-Credits-Remaining");

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "scanned-document.pdf";
      a.click();

      window.URL.revokeObjectURL(url);

      if (remainingCredits === "Unlimited") {
        toast.success(
          "PDF created successfully! Unlimited credits remaining."
        );
      } else {
        toast.success(
          `PDF created successfully! ${remainingCredits} credits remaining.`
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
      title="Scan to PDF"
      description="Scan documents with your camera and turn them into a PDF instantly."
      tool="Scan to PDF"
    >
      {!isSignedIn && (
        <div className="mb-8 rounded-2xl bg-white p-8">
          <h2 className="text-2xl font-bold text-zinc-900">
            Create a free account to scan documents
          </h2>

          <p className="mt-3 text-zinc-600">
            Get <strong>20 lifetime credits</strong> for free and
            access all PDF tools.
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

      {/* Camera */}
      <div className="mt-6">
        <label
          htmlFor="camera-input"
          className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-blue-500 bg-blue-950/30 p-10 text-center transition hover:bg-blue-950/50"
        >
          <div className="text-6xl">📸</div>

          <h2 className="mt-4 text-2xl font-bold text-white">
            Take a Photo
          </h2>

          <p className="mt-2 text-zinc-400">
            Use your phone camera to scan a document.
          </p>

          <span className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white">
            Open Camera
          </span>
        </label>

        <input
          id="camera-input"
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) {
              addFiles(Array.from(e.target.files));
              e.target.value = "";
            }
          }}
        />
      </div>

      {/* Gallery */}
      <div className="mt-6">
        <label
          htmlFor="gallery-input"
          className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-zinc-700 bg-zinc-800 p-8 text-center transition hover:border-blue-500"
        >
          <div className="text-5xl">🖼️</div>

          <h2 className="mt-3 text-xl font-bold text-white">
            Choose Photos
          </h2>

          <p className="mt-2 text-zinc-400">
            Select multiple document photos from your device.
          </p>
        </label>

        <input
          id="gallery-input"
          type="file"
          accept="image/jpeg,image/png"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) {
              addFiles(Array.from(e.target.files));
              e.target.value = "";
            }
          }}
        />
      </div>

      {files.length > 0 && (
        <SelectedFiles
          files={files}
          onRemove={removeFile}
          icon="image"
        />
      )}

      {isSignedIn ? (
        <PrimaryButton
          loading={loading}
          disabled={loading || files.length === 0}
          loadingText="⏳ Creating PDF..."
          text={`📄 Create PDF${
            files.length > 1 ? ` (${files.length} pages)` : ""
          }`}
          onClick={createPDF}
        />
      ) : (
        <SignInButton mode="modal">
          <button className="mt-6 w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700">
            🔒 Sign In to Create PDF
          </button>
        </SignInButton>
      )}

      <ToolSeo
        tool="Scan to PDF"
        description="Scan documents using your phone camera and convert photos into a PDF online for free with PDFRocket. Take multiple document photos and combine them into one PDF."
      />
    </ToolPage>
  );
}