"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { LogOut } from "lucide-react";
import { useAppNavigation } from "@/hooks/useNavigation";

export default function LogoutButton() {
  const { replace } = useAppNavigation();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      replace("/login");
    } catch (e) {
      console.error(e);
      alert("No se pudo cerrar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 disabled:opacity-60"
      aria-busy={loading}
      aria-label="Log out"
      type="button"
    >
      <LogOut className="h-4 w-4" />
      Log out
    </button>
  );
}
