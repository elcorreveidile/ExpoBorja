"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/components/AdminProvider";

interface ObraOculta {
  slug: string;
  referencia: string;
  imagen: string;
}

export default function Admin() {
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [ocultas, setOcultas] = useState<ObraOculta[]>([]);
  const router = useRouter();
  const { editable, refrescar } = useAdmin();

  const cargarOcultas = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/ocultas", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setOcultas(data.ocultas || []);
      }
    } catch {
      setOcultas([]);
    }
  }, []);

  useEffect(() => {
    // Carga la papelera al entrar (sincronización con el servidor).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (editable) cargarOcultas();
  }, [editable, cargarOcultas]);

  const entrar = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setError(false);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo }),
      });
      if (res.ok) {
        await refrescar();
        router.push("/");
        router.refresh();
      } else {
        setError(true);
        setCargando(false);
      }
    } catch {
      setError(true);
      setCargando(false);
    }
  };

  const restaurar = async (slug: string) => {
    await fetch("/api/admin/obra", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, oculta: false }),
    });
    await cargarOcultas();
    router.refresh();
  };

  if (editable) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <h1 className="text-3xl text-tinta mb-4">Ya has entrado</h1>
          <p className="text-tinta-suave leading-relaxed mb-6">
            Navega por la web y toca cualquier obra: verás botones para cambiar su sala,
            marcarla como disponible o eliminarla.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-granate text-hueso text-sm tracking-[0.15em] uppercase font-semibold hover:bg-granate-claro transition-colors"
          >
            Ir a la galería
          </Link>
        </div>

        {/* Papelera */}
        <div className="border-t border-linea pt-8">
          <h2 className="text-xs tracking-[0.25em] uppercase text-ocre mb-4">
            Papelera {ocultas.length > 0 && `(${ocultas.length})`}
          </h2>
          {ocultas.length === 0 ? (
            <p className="text-tinta-suave text-sm">No hay obras eliminadas.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {ocultas.map((o) => (
                <div key={o.slug} className="border border-linea bg-superficie p-2">
                  <div className="relative aspect-square bg-hueso mb-2">
                    <Image src={o.imagen} alt="Obra eliminada" fill sizes="200px" className="object-contain p-1" />
                  </div>
                  <button
                    type="button"
                    onClick={() => restaurar(o.slug)}
                    className="w-full min-h-[44px] text-sm tracking-[0.06em] uppercase font-semibold bg-granate text-hueso hover:bg-granate-claro transition-colors"
                  >
                    Recuperar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-6 py-24">
      <div className="text-center mb-10">
        <p className="text-xs tracking-[0.3em] text-ocre uppercase font-semibold mb-3">Acceso privado</p>
        <h1 className="text-3xl sm:text-4xl text-tinta">Hola, Borja</h1>
        <p className="text-tinta-suave mt-4 leading-relaxed">
          Escribe tu código para poder editar las obras.
        </p>
      </div>

      <form onSubmit={entrar} className="flex flex-col gap-5">
        <div>
          <label htmlFor="codigo" className="block text-sm tracking-[0.08em] uppercase text-tinta-suave mb-2">
            Tu código
          </label>
          <input
            id="codigo"
            type="password"
            autoComplete="current-password"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="w-full bg-hueso border border-linea text-tinta text-lg px-4 py-4 focus:outline-none focus:border-granate transition-colors"
            placeholder="••••••"
            autoFocus
          />
        </div>

        {error && <p className="text-granate text-sm">El código no es correcto. Inténtalo otra vez.</p>}

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-granate text-hueso text-base tracking-[0.15em] uppercase font-semibold py-4 hover:bg-granate-claro transition-colors disabled:opacity-60"
        >
          {cargando ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}
