"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import UploadBox from "../components/UploadBox";
import SelectedFiles from "../components/SelectedFiles";
import PrimaryButton from "../components/PrimaryButton";
import ToolPage from "../components/ToolPage";

export default function EditMetadataPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [creator, setCreator] = useState("");
  const [keywords, setKeywords] = useState("");

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function updateMetadata() {
    if (files.length !== 1) {
      toast.error("Please select exactly one PDF.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("file", files[0]);
      formData.append("title", title);
      formData.append("author", author);
      formData.append("subject", subject);
      formData.append("creator", creator);
      formData.append("keywords", keywords);

      const res = await fetch("/api/edit-metadata", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        toast.error("Failed to update metadata.");
        return;
      }

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "metadata-updated.pdf";
      a.click();

      window.URL.revokeObjectURL(url);

      toast.success("Metadata updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolPage
      title="📝 Edit PDF Metadata"
      description="Update the metadata of your PDF document."
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

      <div className="mt-8 space-y-4">

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-black p-3 text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none"
        />

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-black p-3 text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none"
        />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-black p-3 text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none"
        />

        <input
          type="text"
          placeholder="Creator"
          value={creator}
          onChange={(e) => setCreator(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-black p-3 text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none"
        />

        <input
          type="text"
          placeholder="Keywords (comma separated)"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-black p-3 text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none"
        />

      </div>

      <PrimaryButton
        loading={loading}
        disabled={loading || files.length !== 1}
        loadingText="Saving..."
        text="📝 Save Metadata"
        onClick={updateMetadata}
      />
    </ToolPage>
  );
}