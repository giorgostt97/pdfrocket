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
      className={`mt-10 h-64 rounded-3xl border-2 border-dashed cursor-pointer transition-all duration-300 flex flex-col items-center justify-center ${
        isDragActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-black hover:bg-gray-50"
      }`}
    >
      <input {...getInputProps()} />

      <div className="text-6xl">
        {isPdf ? "📄" : "🖼️"}
      </div>

      <h2 className="mt-4 text-2xl font-bold">
        {isDragActive
          ? `Drop your ${isPdf ? "PDFs" : "Images"} here`
          : `Drag & Drop ${isPdf ? "PDFs" : "Images"}`}
      </h2>

      <p className="mt-2 text-gray-500">
        or click to browse
      </p>
    </div>
  );
}