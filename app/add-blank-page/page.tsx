"use client";

import { useState } from "react";
import { useAuth, SignInButton } from "@clerk/nextjs";
import toast from "react-hot-toast";

import UploadBox from "../components/UploadBox";
import SelectedFiles from "../components/SelectedFiles";
import PrimaryButton from "../components/PrimaryButton";
import ToolPage from "../components/ToolPage";
import ToolSeo from "../components/ToolSeo";

export default function AddBlankPagePage() {
  const { isSignedIn } = useAuth();

  const [files, setFiles] = useState<File[]>([]);
  const [page, setPage] = useState("");
  const [loading, setLoading] = useState(false);

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function addBlankPage() {
    if (!isSignedIn) {
      return;
    }

    if (files.length !== 1) {
      toast.error("Please select exactly one PDF.");
      return;
    }

    if (!page.trim()) {
      toast.error("Enter the page position.");
      return;
    }

    const pageNumber = parseInt(page.trim());

    if (isNaN(pageNumber) || pageNumber < 1) {
      toast.error("Enter a valid page number.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("file", files[0]);
      formData.append("page", pageNumber.toString());

      const res = await fetch("/api/add-blank-page", {
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
        const message = await res.text();
        toast.error(message || "Adding blank page failed.");
        return;
      }

      const remainingCredits =
        res.headers.get("X-Credits-Remaining");

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "blank-page-added.pdf";
      a.click();

      window.URL.revokeObjectURL(url);

      if (remainingCredits === "Unlimited") {
        toast.success(
          "Blank page added successfully! Unlimited credits remaining."
        );
      } else {
        toast.success(
          `Blank page added successfully! ${remainingCredits} credits remaining.`
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
    title="Add Blank Page to PDF"
    description="Add a blank page to a PDF online for free."
    tool="Add Blank Page"
  >
    {!isSignedIn && (
      <div className="mb-8 rounded-2xl bg-white p-8">
        <h2 className="text-2xl font-bold text-zinc-900">
          Create a free account to add a blank page
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
        Insert blank page before page
      </label>

      <input
        type="number"
        min="1"
        value={page}
        onChange={(e) => setPage(e.target.value)}
        placeholder="Example: 3"
        className="w-full rounded-xl border p-3"
      />

      <p className="mt-2 text-sm text-gray-500">
        Enter 1 to insert a blank page before the first page,
        2 to insert it before the second page, etc.
      </p>
    </div>

    {isSignedIn ? (
      <PrimaryButton
        loading={loading}
        disabled={loading || files.length !== 1 || !page.trim()}
        loadingText="⏳ Adding Blank Page..."
        text="➕ Add Blank Page"
        onClick={addBlankPage}
      />
    ) : (
      <SignInButton mode="modal">
        <button className="mt-6 w-full rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700">
          🔒 Sign In to Add Blank Page
        </button>
      </SignInButton>
    )}

    <ToolSeo
      tool="Add Blank Page to PDF"
      description="Add a blank page to a PDF online for free using PDFRocket. Insert an empty page into your PDF document quickly and securely."
    />
  </ToolPage>

  );
}