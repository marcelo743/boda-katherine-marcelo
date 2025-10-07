"use client";
import React from "react";
import { Home, BarChart2, Package, ChevronRight } from "lucide-react";

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const nav = [
    { icon: Home, label: "Dashboard", href: "/admin" },
    { icon: BarChart2, label: "Analítica", href: "/admin" },
    { icon: Package, label: "Producto", href: "/admin" },
  ];

  return (
    <aside
      className={[
        "fixed z-40 h-dvh w-72 shrink-0 bg-gradient-to-b from-indigo-700 to-indigo-600 text-white shadow-2xl ring-1 ring-black/5 md:sticky md:top-0 md:translate-x-0 md:opacity-100",
        open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 md:opacity-100",
        "transition-all duration-300 ease-out",
      ].join(" ")}
      aria-hidden={!open}
    >
      <div className="flex h-16 items-center gap-2 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
          <span className="text-lg font-bold">K&M</span>
        </div>
        <span className="text-xl font-semibold">K&M</span>
      </div>

      <nav className="mt-4 space-y-1 px-2">
        {nav.map((n, idx) => (
          <a
            key={idx}
            href={n.href}
            className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-indigo-50 transition-all hover:bg-white/10"
            onClick={onClose}
          >
            <n.icon className="h-5 w-5 opacity-90" />
            <span className="flex-1">{n.label}</span>
            <ChevronRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
          </a>
        ))}
      </nav>
    </aside>
  );
}