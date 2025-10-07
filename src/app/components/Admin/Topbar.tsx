"use client";
import React, { useEffect, useRef, useState } from "react";
import { Bell, Menu, Settings } from "lucide-react";
import LogoutButton from "./LogOut";
import { createClientComponentClient, User } from "@supabase/auth-helpers-nextjs";

export default function Topbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const [openNotif, setOpenNotif] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const notifRef = useRef<HTMLDivElement | null>(null);
  const userRef = useRef<HTMLDivElement | null>(null);
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        (notifRef.current && !notifRef.current.contains(t)) &&
        (userRef.current && !userRef.current.contains(t))
      ) {
        setOpenNotif(false);
        setOpenUser(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

    useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    })();
  }, [supabase]);
  

  const notifications = [
    {
      id: 1,
      title: "Nueva invitación",
      body: "Has recibido una nueva invitación de usuario."
  }];

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow md:hidden"
            aria-label="Abrir/cerrar menú"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h2 className="hidden text-lg font-semibold text-slate-800 md:block">Gestionar invitaciones</h2>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                setOpenNotif((o) => !o);
                setOpenUser(false);
              }}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow"
              aria-haspopup="dialog"
              aria-expanded={openNotif}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-indigo-600 px-1 text-[10px] font-medium text-white">3</span>
            </button>
            {openNotif && (
              <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Notificaciones</p>
                <ul className="space-y-1">
                  {notifications.map((n) => (
                    <li key={n.id} className="rounded-xl p-2 hover:bg-slate-50">
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-slate-500">{n.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="relative" ref={userRef}>
            <button
              onClick={() => {
                setOpenUser((o) => !o);
                setOpenNotif(false);
              }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1 pr-3 shadow-sm transition hover:shadow"
              aria-haspopup="menu"
              aria-expanded={openUser}
            >
              <img
                alt="Usuario"
                src="https://i.pravatar.cc/100?img=15"
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="hidden text-sm font-medium md:inline">Welcome {user?.email ?? ""}</span>
            </button>
            {openUser && (
              <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-slate-50">
                  <Settings className="h-4 w-4" />
                  Actualizar configuración
                </button>
                <LogoutButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}