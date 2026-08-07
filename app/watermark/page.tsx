"use client";

import { useState } from "react";
import { useAuth, SignInButton } from "@clerk/nextjs";
import toast from "react-hot-toast";

import UploadBox from "../components/UploadBox";
import SelectedFiles from "../components/SelectedFiles";
import PrimaryButton from "../components/PrimaryButton";
import ToolPage from "../components/ToolPage";
import ToolSeo from "../components/ToolSeo";

export default function WatermarkPage() {
  const { isSignedIn } = useAuth();

  const [files, setFiles] = useState<File[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function addWatermark() {
    if (!isSignedIn) {
      return;
    }

    if (files.length !== 1) {
      toast.error("Please select exactly one PDF.");
      return;
    }

    if (!text.trim()) {
      toast.error("Enter watermark text.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("file", files[0]);
      formData.append("text", text);

      const res = await fetch("/api/watermark", {
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
        toast.error("Watermark failed.");
        return;
      }

      const remainingCredits =
        res.headers.get("X-Credits-Remaining");

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "watermarked.pdf";
      a.click();

      window.URL.revokeObjectURL(url);

      if (remainingCredits === "Unlimited") {
        toast.success(
          "Watermark added successfully! Unlimited credits remaining."
        );
      } else {
        toast.success(
          `Watermark added successfully! ${remainingCredits} credits remaining.`
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
      tool="Watermark PDF"
      title="💧 Watermark PDF"
      description="Add a custom watermark to every page of your PDF."
    >
      {!isSignedIn && (
        <div className="mb-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 text-center">

          <h2 className="text-2xl font-bold text-zinc-900">
            Create a free account to watermark PDFs
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

      <div className="mt-8">
        <label className="mb-2 block font-semibold">
          Watermark Text
        </label>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Example: CONFIDENTIAL"
          className="w-full rounded-xl border p-3"
        />
      </div>

      {isSignedIn ? (
        <PrimaryButton
          loading={loading}
          disabled={loading || files.length !== 1}
          loadingText="⏳ Adding Watermark..."
          text="💧 Add Watermark"
          onClick={addWatermark}
        />
      ) : (
        <SignInButton mode="modal">
          <button className="mt-6 w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700">
            🔒 Sign In to Watermark PDFs
          </button>
        </SignInButton>
      )}

      <ToolSeo
        tool="Watermark PDF"
        description="Add text watermarks to PDF files online for free using PDFRocket. Secure, fast and works directly in your browser."
      />
    </ToolPage>
  );
}