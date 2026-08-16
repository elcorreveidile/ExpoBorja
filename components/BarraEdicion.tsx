"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdmin } from "./AdminProvider";

export default function BarraEdicion() {
  const { editable, refrescar } = useAdmin();
  const router = useRouter();

  if (!editable) return null;

  const salir = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    await refrescar();
    router.refresh();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[150] bg-granate text-hueso">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-3 flex items-center justify-between gap-4">
        <p className="text-sm">
          <span className="font-semibold">Modo edición</span>
          <span className="hidden sm:inline text-hueso/85"> · Hola, Borja.</span>
        </p>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/nueva"
            className="text-sm tracking-[0.1em] uppercase font-semibold bg-hueso text-granate px-4 py-2 hover:bg-hueso/90 transition-colors"
          >
            + Añadir obra
          </Link>
          <button
            type="button"
            onClick={salir}
            className="text-sm tracking-[0.1em] uppercase font-semibold border border-hueso/60 px-4 py-2 hover:bg-hueso hover:text-granate transition-colors"
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  );
}
