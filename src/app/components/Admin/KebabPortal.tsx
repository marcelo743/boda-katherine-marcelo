"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Info } from "lucide-react";
import { computePosition, cx } from "@/utils/helper";
import type { KebabItem, MenuPosition } from "@/types/invitationTable";

interface Props {
  open: boolean;
  items: KebabItem[];
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export function KebabPortal({ open, items, anchorEl, onClose }: Props) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<MenuPosition | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // click-outside + Esc
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const path = e.composedPath();
      if (menuRef.current && path.includes(menuRef.current)) return;
      if (anchorEl && path.includes(anchorEl)) return;
      onClose();
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open, onClose, anchorEl]);

  const reposition = useCallback(() => {
    if (!open || !anchorEl || !menuRef.current) return;
    const rect = anchorEl.getBoundingClientRect();
    const w = menuRef.current.offsetWidth || 256;
    const h = menuRef.current.scrollHeight || 240;
    setStyle(computePosition(rect, w, h));
  }, [open, anchorEl]);

  useEffect(() => {
    if (!open) return;
    reposition();
    const h = () => reposition();
    window.addEventListener("scroll", h, true);
    window.addEventListener("resize", h);
    return () => {
      window.removeEventListener("scroll", h, true);
      window.removeEventListener("resize", h);
    };
  }, [open, reposition]);

  useLayoutEffect(() => {
    if (!open || !anchorEl || !menuRef.current || style) return;
    reposition();
  }, [open, anchorEl, style, reposition]);

  if (!mounted || !open) return null;

  const invisible = !style;

  const menu = (
    <div
      ref={menuRef}
      role="menu"
      aria-label="Acciones"
      style={
        invisible
          ? { position: "fixed", top: -9999, left: -9999, opacity: 0, pointerEvents: "none" }
          : { position: "fixed", top: style!.top, left: style!.left, maxHeight: style!.maxHeight, overflowY: "auto", zIndex: 40 }
      }
      className="w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1 text-left shadow-2xl"
    >
      {items.map((it) => (
        <div key={it.key}>
          <button
            role="menuitem"
            disabled={!!it.disabled}
            onClick={async () => {
              if (it.disabled) return;
              await it.onClick();
              onClose(); // cierra al elegir opción
            }}
            className={cx(
              "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm",
              it.disabled ? "cursor-not-allowed text-slate-400"
                          : "text-slate-800 hover:bg-slate-50"
            )}
          >
            {it.icon}
            <span>{it.label}</span>
            {it.disabled && it.reason && (
              <span className="ml-auto inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700 ring-1 ring-inset ring-amber-200">
                <Info className="h-3 w-3" /> En desarrollo
              </span>
            )}
          </button>
          {it.disabled && it.reason && (
            <div className="px-3 pb-2 text-[11px] leading-snug text-slate-500">{it.reason}</div>
          )}
        </div>
      ))}
    </div>
  );

  return createPortal(menu, document.body);
}
