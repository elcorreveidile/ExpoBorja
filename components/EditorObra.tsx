"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "./AdminProvider";
import type { Epoca } from "@/lib/obras";

interface Props {
  slug: string;
  epoca: Epoca;
  disponible: boolean;
}

export default function EditorObra({ slug, epoca, disponible }: Props) {
  const { editable } = useAdmin();
  const router = useRouter();
  const [guardando, setGuardando] = useState(false);

  if (!editable) return null;

  const guardar = async (cambio: { epoca?: Epoca; disponible?: boolean; oculta?: boolean }) => {
    setGuardando(true);
    try {
      await fetch("/api/admin/obra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, ...cambio }),
      });
      router.refresh();
    } finally {
      setGuardando(false);
    }
  };

  const eliminar = () => {
    if (window.confirm("¿Eliminar esta obra? Dejará de verse en la web. Podrás recuperarla desde la papelera de tu acceso.")) {
      guardar({ oculta: true });
    }
  };

  const btn = (activo: boolean) =>
    `flex-1 min-h-[48px] px-3 py-2 text-sm tracking-[0.05em] uppercase font-semibold border transition-colors ${
      activo
        ? "bg-granate text-hueso border-granate"
        : "bg-hueso text-tinta-suave border-linea hover:border-granate"
    }`;

  return (
    <div className="mt-3 border border-granate/40 bg-granate/5 rounded p-3">
      <p className="text-[11px] tracking-[0.15em] uppercase text-granate font-bold mb-2">
        Editar {guardando && <span className="text-tinta-tenue font-normal">· guardando…</span>}
      </p>

      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs uppercase text-tinta-tenue w-20 shrink-0">Sala</span>
        <div className="flex gap-2 flex-1">
          <button type="button" disabled={guardando} onClick={() => guardar({ epoca: "nueva" })} className={btn(epoca === "nueva")}>Nueva</button>
          <button type="button" disabled={guardando} onClick={() => guardar({ epoca: "antigua" })} className={btn(epoca === "antigua")}>Antigua</button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs uppercase text-tinta-tenue w-20 shrink-0">Disponible</span>
        <div className="flex gap-2 flex-1">
          <button type="button" disabled={guardando} onClick={() => guardar({ disponible: true })} className={btn(disponible)}>Sí</button>
          <button type="button" disabled={guardando} onClick={() => guardar({ disponible: false })} className={btn(!disponible)}>No</button>
        </div>
      </div>

      <button
        type="button"
        disabled={guardando}
        onClick={eliminar}
        className="w-full min-h-[44px] text-sm tracking-[0.08em] uppercase font-semibold text-granate border border-granate/40 hover:bg-granate hover:text-hueso transition-colors"
      >
        Eliminar obra
      </button>
    </div>
  );
}
