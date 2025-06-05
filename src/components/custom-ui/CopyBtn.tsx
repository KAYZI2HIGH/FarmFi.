// components/CopyButton.tsx
"use client"; // Required for client-side interactivity

import { Copy } from "lucide-react";
import { useState } from "react";

export default function CopyButton({ textToCopy }: { textToCopy: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="relative p-2 rounded-md cursor-pointer"
      aria-label="Copy to clipboard"
    >
      <Copy className="size-[14px]" />

      {/* Tooltip */}
      {isCopied && (
        <div
          className={`
        absolute -top-8 left-1/2 -translate-x-1/2
        px-2 py-1 rounded text-xs whitespace-nowrap
        bg-gray-700/70 text-white
        transition-opacity duration-300
        ${isCopied ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
        >
          Copied
        </div>
      )}
    </button>
  );
}
