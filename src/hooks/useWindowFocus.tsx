import { FocusState } from "@/types/common";
import { getState } from "@/utils/helper";
import { useEffect, useState } from "react";

export function useWindowFocus(): FocusState {
  const [state, setState] = useState<FocusState>(() => getState());

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const update = () => setState(getState());

    window.addEventListener("focus", update);
    window.addEventListener("blur", update);
    document.addEventListener("visibilitychange", update);
    window.addEventListener("pageshow", update);
    window.addEventListener("pagehide", update);

    update();

    return () => {
      window.removeEventListener("focus", update);
      window.removeEventListener("blur", update);
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("pageshow", update);
      window.removeEventListener("pagehide", update);
    };
  }, []);

  return state;
}
