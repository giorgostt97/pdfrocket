import { FileText, Image, X } from "lucide-react";

type SelectedFilesProps = {
  files: File[];
  onRemove: (index: number) => void;
  icon?: string;
};

export default function SelectedFiles({
  files,
  onRemove,
  icon = "pdf",
}: SelectedFilesProps) {
  if (files.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="mb-3 font-semibold">
        Selected File{files.length > 1 ? "s" : ""}
      </h3>

      <div className="space-y-3">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl bg-gray-100 px-4 py-3"
          >
            <div className="flex items-center gap-3">

              {icon === "image" ? (
                <Image className="h-6 w-6 text-blue-600" />
              ) : (
                <FileText className="h-6 w-6 text-red-600" />
              )}

              <div>
                <p className="font-medium truncate">
                  {file.name}
                </p>

                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

            </div>

            <button
              onClick={() => onRemove(index)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}