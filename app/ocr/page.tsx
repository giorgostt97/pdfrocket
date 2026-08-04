"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import UploadBox from "../components/UploadBox";
import SelectedFiles from "../components/SelectedFiles";
import ToolPage from "../components/ToolPage";

export default function OcrPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setText("");
  }

  async function extractText() {
    if (files.length !== 1) {
      toast.error("Please upload one PDF.");
      return;
    }

    setLoading(true);

    try {
      const Tesseract = await import("tesseract.js");
      const pdfjsLib = await import("pdfjs-dist");

      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

      const bytes = new Uint8Array(await files[0].arrayBuffer());

      const pdf = await pdfjsLib.getDocument({
        data: bytes.slice(),
      }).promise;

      let finalText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        toast.loading(`Reading page ${i}/${pdf.numPages}`, {
          id: "ocr",
        });

        const page = await pdf.getPage(i);

        const viewport = page.getViewport({
          scale: 2,
        });

        const canvas = document.createElement("canvas");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const context = canvas.getContext("2d");

        if (!context) continue;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        const {
          data: { text },
        } = await Tesseract.recognize(canvas, "eng");

        finalText += `\n\n----- Page ${i} -----\n\n`;
        finalText += text;
      }

      toast.dismiss("ocr");

      setText(finalText);

      toast.success("OCR completed!");
    } catch (error) {
      console.error(error);
      toast.error("OCR failed.");
    }

    setLoading(false);
  }

  function copyText() {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  }

  function downloadTxt() {
    const blob = new Blob([text], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "ocr.txt";

    a.click();

    URL.revokeObjectURL(url);

    toast.success("TXT downloaded!");
  }

  return (
    <ToolPage
      title="🔍 OCR PDF"
      description="Extract text from scanned PDF documents."
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

      <button
        onClick={extractText}
        disabled={loading}
        className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Extracting..." : "Extract Text"}
      </button>

      {text && (
        <>
          <textarea
            value={text}
            readOnly
            spellCheck={false}
            className="mt-8 h-96 w-full rounded-2xl border border-zinc-700 bg-zinc-950 p-5 font-mono text-sm text-white"
          />

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <button
              onClick={copyText}
              className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              📋 Copy Text
            </button>

            <button
              onClick={downloadTxt}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              ⬇️ Download TXT
            </button>
          </div>
        </>
      )}
    </ToolPage>
  );
}