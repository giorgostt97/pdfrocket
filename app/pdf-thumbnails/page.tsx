"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import UploadBox from "../components/UploadBox";
import SelectedFiles from "../components/SelectedFiles";
import ToolPage from "../components/ToolPage";
import PdfCanvas from "../components/PdfCanvas";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export default function PdfThumbnailsPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [pages, setPages] = useState<any[]>([]);

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPages([]);
  }

  async function loadPdf(selectedFiles: File[]) {
    if (selectedFiles.length !== 1) {
      toast.error("Please upload one PDF.");
      return;
    }

    try {
      const bytes = new Uint8Array(await selectedFiles[0].arrayBuffer());

      const loadingTask = pdfjsLib.getDocument({
        data: bytes.slice(), // IMPORTANT
      });

      const pdf = await loadingTask.promise;

      const loadedPages = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        loadedPages.push(page);
      }

      setPages(loadedPages);

      toast.success(`Loaded ${pdf.numPages} pages`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load PDF.");
    }
  }

  return (
    <ToolPage
      title="🖼 PDF Thumbnails"
      description="Preview every page of your PDF."
    >
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
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {pages.map((page, index) => (
            <PdfCanvas
              key={index}
              page={page}
              pageNumber={index + 1}
            />
          ))}
        </div>
      )}
    </ToolPage>
  );
}