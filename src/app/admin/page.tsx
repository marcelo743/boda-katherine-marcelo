"use client";
import React from "react";
import InvitationTable from "@/app/components/Admin/IntitationTable";
import { useUseInvitations } from "@/hooks/useInvitations";

export default function AdminHome() {
  const { invitations: rows, invitationLength, drawerOpen, setDrawerOpen, setInvitationSelected, invitationSelected, guests} = useUseInvitations();

  return (
    <section className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Gestionar invitaciones</h1>
          <p className="text-sm text-slate-500">{invitationLength} registros encontrados</p>
        </div>
      </header>

      <div className="rounded-2xl bg-white/70 p-3 shadow-md ring-1 ring-slate-200">
        <InvitationTable
          rows={rows}
          onViewGuests={(row) => {
            setInvitationSelected(row);
            setDrawerOpen(true);
          }}
          onCopy={(row) => navigator.clipboard.writeText(row.invitationUrl)}
          disableActions={{editGuest: true, editInvitation: true }}
        />
      </div>

      {drawerOpen && (
        <>
          <button
            aria-label="Cerrar drawer"
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px]"
          />
          <aside className="fixed right-0 top-0 z-50 h-dvh w-full max-w-md translate-x-0 bg-white shadow-2xl ring-1 ring-slate-200 transition-transform duration-300 ease-out">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <div>
                <h3 className="text-base font-semibold">Invitados — {invitationSelected?.title ?? "N/A"}</h3>
                <p className="text-xs text-slate-500">Quiénes han confirmado</p>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50">
                Cerrar
              </button>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                {guests.map((g, i) => (
                  <li key={i} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3">
                    <div>
                      <p className="text-sm font-medium">{g.first_name}</p>
                      <p className="text-xs text-slate-500">{g.last_name}</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-xs ring-1 ring-inset ${g.confirmed ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-slate-50 text-slate-600 ring-slate-200"}`}>
                      {g.confirmed ? "Confirmado" : "Pendiente"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </>
      )}
    </section>
  );
}