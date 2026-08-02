import { ImageIcon } from "lucide-react";

export function ImagePlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-neutral-900 border border-white/10 rounded-2xl ${className}`}
    >
      <ImageIcon className="w-10 h-10 text-neutral-700" strokeWidth={1.5} />
    </div>
  );
}
