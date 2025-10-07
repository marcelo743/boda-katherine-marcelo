"use client";

import { useState } from "react";
import { Check } from "lucide-react";

type Toast = { id: number; message: string };

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = (message: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2500);
  };

  const node = (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[60] space-y-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-center gap-2 rounded-xl bg-slate-900/90 px-3 py-2 text-sm text-white shadow-lg"
        >
          <Check className="h-4 w-4" />
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );

  return { push, node };
}
