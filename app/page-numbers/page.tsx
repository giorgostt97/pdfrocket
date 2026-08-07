"use client";

import { useState } from "react";
import { useAuth, SignInButton } from "@clerk/nextjs";
import toast from "react-hot-toast";

import UploadBox from "../components/UploadBox";
import SelectedFiles from "../components/SelectedFiles";
import PrimaryButton from "../components/PrimaryButton";
import ToolPage from "../components/ToolPage";
import ToolSeo from "../components/ToolSeo";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PageNumbersPage() {
  const { isSignedIn } = useAuth();

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState("bottom-center");

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function addPageNumbers() {
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
      formData.append("position", position);

      const res = await fetch("/api/page-numbers", {
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
        toast.error("Failed to add page numbers.");
        return;
      }

      const remainingCredits =
        res.headers.get("X-Credits-Remaining");

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "numbered.pdf";
      a.click();

      window.URL.revokeObjectURL(url);

      if (remainingCredits === "Unlimited") {
        toast.success(
          "Page numbers added successfully! Unlimited credits remaining."
        );
      } else {
        toast.success(
          `Page numbers added successfully! ${remainingCredits} credits remaining.`
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
      tool="Add Page Numbers"
      title="🔢 Add Page Numbers"
      description="Add page numbers to every page of your PDF."
    >
      {!isSignedIn && (
        <div className="mb-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 text-center">

          <h2 className="text-2xl font-bold text-zinc-900">
            Create a free account to add page numbers
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
          Position
        </label>

        <Select
  value={position}
  onValueChange={(value) => setPosition(String(value))}
>

          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose position" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="top-left">Top Left</SelectItem>
            <SelectItem value="top-center">Top Center</SelectItem>
            <SelectItem value="top-right">Top Right</SelectItem>
            <SelectItem value="bottom-left">Bottom Left</SelectItem>
            <SelectItem value="bottom-center">Bottom Center</SelectItem>
            <SelectItem value="bottom-right">Bottom Right</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isSignedIn ? (
        <PrimaryButton
          loading={loading}
          disabled={loading || files.length !== 1}
          loadingText="⏳ Adding Page Numbers..."
          text="🔢 Add Page Numbers"
          onClick={addPageNumbers}
        />
      ) : (
        <SignInButton mode="modal">
          <button className="mt-6 w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700">
            🔒 Sign In to Add Page Numbers
          </button>
        </SignInButton>
      )}

      <ToolSeo
        tool="Add Page Numbers"
        description="Add page numbers to PDF files online for free with PDFRocket. Choose the position and download your updated PDF instantly."
      />
    </ToolPage>
  );
}