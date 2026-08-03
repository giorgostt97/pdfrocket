"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import UploadBox from "../components/UploadBox";
import SelectedFiles from "../components/SelectedFiles";
import PrimaryButton from "../components/PrimaryButton";
import ToolPage from "../components/ToolPage";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PageNumbersPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState("bottom-center");

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function addPageNumbers() {
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

      if (!res.ok) {
        toast.error("Failed to add page numbers.");
        return;
      }

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "numbered.pdf";
      a.click();

      window.URL.revokeObjectURL(url);

      toast.success("Page numbers added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolPage
      title="🔢 Add Page Numbers"
      description="Add page numbers to every page of your PDF."
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

      <div className="mt-8">
        <label className="mb-2 block font-semibold text-white">
          Position
        </label>

        <Select
  value={position}
  onValueChange={(value) => setPosition(value as string)}

        >
          <SelectTrigger className="w-full border-zinc-700 bg-black text-white focus:ring-blue-500">
            <SelectValue placeholder="Choose position" />
          </SelectTrigger>

          <SelectContent className="border-zinc-700 bg-black text-white">
            <SelectItem value="top-left">
              Top Left
            </SelectItem>

            <SelectItem value="top-center">
              Top Center
            </SelectItem>

            <SelectItem value="top-right">
              Top Right
            </SelectItem>

            <SelectItem value="bottom-left">
              Bottom Left
            </SelectItem>

            <SelectItem value="bottom-center">
              Bottom Center
            </SelectItem>

            <SelectItem value="bottom-right">
              Bottom Right
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <PrimaryButton
        loading={loading}
        disabled={loading || files.length !== 1}
        loadingText="Adding Page Numbers..."
        text="🔢 Add Page Numbers"
        onClick={addPageNumbers}
      />
    </ToolPage>
  );
}