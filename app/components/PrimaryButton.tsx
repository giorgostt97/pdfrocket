import { Loader2 } from "lucide-react";

type PrimaryButtonProps = {
  loading: boolean;
  disabled: boolean;
  loadingText: string;
  text: string;
  onClick: () => void;
};

export default function PrimaryButton({
  loading,
  disabled,
  loadingText,
  text,
  onClick,
}: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading && (
        <Loader2 className="h-5 w-5 animate-spin" />
      )}

      {loading ? loadingText : text}
    </button>
  );
}