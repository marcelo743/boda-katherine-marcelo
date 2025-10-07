"use client";
import React, { useState } from "react";
import Sidebar from "@/app/components/Admin/Sidebar";
import Topbar from "@/app/components/Admin/Topbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-dvh bg-slate-50 text-slate-900 antialiased">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Content */}
      <div className="flex min-h-dvh w-0 flex-1 flex-col">
        <Topbar onToggleSidebar={() => setSidebarOpen((s) => !s)} />
        <main className="px-4 pb-8 pt-4 md:px-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>

      {/* Overlay para cerrar con un click (mobile) */}
      {sidebarOpen && (
        <button
          aria-label="Cerrar menú"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[1px] md:hidden"
        />
      )}
    </div>
  );
}