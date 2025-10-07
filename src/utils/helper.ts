import { FocusState } from "@/types/common";
import type { MenuPosition, Placement } from "@/types/invitationTable";

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

export const cx = (...xs: Array<string | false | null | undefined>) =>
  xs.filter(Boolean).join(" ");

export function computePosition(anchor: DOMRect, menuW: number, menuH: number): MenuPosition {
  const margin = 8;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const below = vh - anchor.bottom - margin;
  const above = anchor.top - margin;

  let placement: Placement = "bottom";
  if (menuH > below && above >= menuH) placement = "top";
  if (menuH > below && menuH > above) placement = above > below ? "top" : "bottom";

  let left = anchor.right - menuW;
  left = Math.max(margin, Math.min(left, vw - menuW - margin));

  const top = placement === "bottom" ? anchor.bottom + margin : anchor.top - menuH - margin;
  const maxHeight = placement === "bottom" ? Math.max(120, below) : Math.max(120, above);

  return { top, left, maxHeight, placement };
}
