"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

interface AdminCtx {
  editable: boolean;
  refrescar: () => void;
}

const Ctx = createContext<AdminCtx>({ editable: false, refrescar: () => {} });

export function useAdmin() {
  return useContext(Ctx);
}

export default function AdminProvider({ children }: { children: React.ReactNode }) {
  const [editable, setEditable] = useState(false);

  const refrescar = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/me", { cache: "no-store" });
      const data = await res.json();
      setEditable(Boolean(data.editable));
    } catch {
      setEditable(false);
    }
  }, []);

  useEffect(() => {
    // Comprobación de sesión al montar (sincronización con el servidor).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refrescar();
  }, [refrescar]);

  return <Ctx.Provider value={{ editable, refrescar }}>{children}</Ctx.Provider>;
}
