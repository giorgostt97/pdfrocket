"use client";

import { useState } from "react";
import { useAuth, SignInButton } from "@clerk/nextjs";
import toast from "react-hot-toast";

import UploadBox from "../components/UploadBox";
import SelectedFiles from "../components/SelectedFiles";
import PrimaryButton from "../components/PrimaryButton";
import ToolPage from "../components/ToolPage";
import ToolSeo from "../components/ToolSeo";

export default function MergePage() {
  const { isSignedIn } = useAuth();

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function mergePDFs() {
    if (!isSignedIn) {
      return;
    }

    if (files.length < 2) {
      toast.error("Please select at least 2 PDFs.");
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

      if (res.status === 401) {
        toast.error("Please sign in first.");
        return;
      }

      if (res.status === 403) {
        toast.error("You have no credits remaining.");
        return;
      }

      if (!res.ok) {
        toast.error("Merge failed.");
        return;
      }

      const remainingCredits =
        res.headers.get("X-Credits-Remaining");

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      a.click();

      window.URL.revokeObjectURL(url);

      if (remainingCredits === "Unlimited") {
        toast.success(
          "PDF merged successfully! Unlimited credits remaining."
        );
      } else {
        toast.success(
          `PDF merged successfully! ${remainingCredits} credits remaining.`
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
    tool="Merge PDF"
      title="📄 Merge PDF"
      description="Combine multiple PDF files into one document."
    >
      {!isSignedIn && (
        <div className="mb-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 text-center">

          <h2 className="text-2xl font-bold text-zinc-900">
            Create a free account to merge PDFs
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

      <UploadBox
        onChange={(newFiles) =>
          setFiles((prev) => [...prev, ...newFiles])
        }
      />

      <SelectedFiles
        files={files}
        onRemove={removeFile}
      />

      {isSignedIn ? (
        <PrimaryButton
          loading={loading}
          disabled={loading || files.length < 2}
          loadingText="⏳ Merging PDFs..."
          text={`🚀 Merge ${files.length} PDF${files.length !== 1 ? "s" : ""}`}
          onClick={mergePDFs}
        />
      ) : (
        <SignInButton mode="modal">
          <button className="mt-6 w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700">
            🔒 Sign In to Merge PDFs
          </button>
        </SignInButton>
      )}

      <ToolSeo
        tool="Merge PDF"
        description="Merge PDF files online for free using PDFRocket. Combine multiple PDF documents into a single file directly in your browser. Fast, secure and works on Windows, macOS, Linux, Android and iPhone."
      />
    </ToolPage>
  );
}