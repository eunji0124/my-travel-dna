import { useState } from "react";

export function useToast(duration = 2500) {
  const [message, setMessage] = useState<string | null>(null);

  const show = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), duration);
  };

  return { message, show };
}