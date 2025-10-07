"use client";

import { CheckCircle2, Circle } from "lucide-react";

export function Pill({ seen }: { seen: boolean }) {
  return seen ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200">
      <CheckCircle2 className="h-4 w-4" /> Visto
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-200">
      <Circle className="h-4 w-4" /> No visto
    </span>
  );
}