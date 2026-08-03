"use client";

import { useDropzone } from "react-dropzone";

type UploadBoxProps = {
  onChange: (files: File[]) => void;
  accept?: Record<string, string[]>;
};

export default function UploadBox({
  onChange,
  accept,
}: UploadBoxProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: accept ?? {
      "application/pdf": [".pdf"],
    },
    multiple: true,
    onDrop: (acceptedFiles) => {
      onChange(acceptedFiles);
    },
  });

  const isPdf =
    !accept || Object.keys(accept).includes("application/pdf");

  return (
    <div
      {...getRootProps()}
      className={`mt-10 flex h-64 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed transition-all duration-300 ${
        isDragActive
          ? "border-blue-500 bg-blue-950/40"
          : "border-zinc-700 bg-zinc-800 hover:border-blue-500 hover:bg-zinc-800/80"
      }`}
    >
      <input {...getInputProps()} />

      <div className="text-6xl">
        {isPdf ? "📄" : "🖼️"}
      </div>

      <h2 className="mt-4 text-2xl font-bold text-white">
        {isDragActive
          ? `Drop your ${isPdf ? "PDFs" : "Images"} here`
          : `Drag & Drop ${isPdf ? "PDFs" : "Images"}`}
      </h2>

      <p className="mt-2 text-zinc-400">
        or click to browse
      </p>

      <p className="mt-4 text-sm text-zinc-500">
        {isPdf
          ? "Supports PDF files"
          : "Supports JPG, JPEG and PNG"}
      </p>
    </div>
  );
}