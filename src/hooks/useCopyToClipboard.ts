import { useState } from "react";

export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (error) {
      console.error("클립보드 복사 실패:", error);
    }
  };

  return { copied, copy };
}