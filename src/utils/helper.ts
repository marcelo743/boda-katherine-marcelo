import { FocusState } from "@/types/common";

export function sameStringSet(a: string[], b: string[]): boolean {
  const sa = new Set(a);
  const sb = new Set(b);
  if (sa.size !== sb.size) return false;
  for (const v of sa) if (!sb.has(v)) return false;
  return true;
}

 export const getState = (): FocusState => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return { hasFocus: false, isVisible: false, isActive: false };
  }
  
  const hasFocus = typeof document.hasFocus === "function" ? document.hasFocus() : false;
  const isVisible = !document.hidden && document.visibilityState === "visible";
  return { hasFocus, isVisible, isActive: hasFocus && isVisible };
};