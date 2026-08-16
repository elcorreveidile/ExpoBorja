"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/components/AdminProvider";
import type { Epoca } from "@/lib/obras";

export default function NuevaObra() {
  const { editable } = useAdmin();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [epoca, setEpoca] = useState<Epoca>("nueva");
  const [disponible, setDisponible] = useState(false);
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!editable) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl text-tinta mb-4">Acceso privado</h1>
        <p className="text-tinta-suave mb-8">Entra con tu código para añadir una obra.</p>
        <Link href="/admin" className="inline-flex px-8 py-4 bg-granate text-hueso text-sm tracking-[0.15em] uppercase font-semibold">
          Entrar
        </Link>
      </div>
    );
  }

  const elegir = (f: File | undefined) => {
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setError(null);
  };

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Primero elige o haz una foto.");
      return;
    }
    setSubiendo(true);
    setError(null);
    try {
      const datos = new FormData();
      datos.append("imagen", file);
      datos.append("epoca", epoca);
      datos.append("disponible", String(disponible));
      const res = await fetch("/api/admin/nueva", { method: "POST", body: datos });
      const data = await res.json().catch(() => ({ ok: false }));
      if (res.ok && data.ok) {
        router.push(`/obra/${data.slug}`);
        router.refresh();
      } else {
        setError(data.error || "No se pudo subir. Inténtalo otra vez.");
        setSubiendo(false);
      }
    } catch {
      setError("No se pudo subir. Inténtalo otra vez.");
      setSubiendo(false);
    }
  };

  const opcion = (activo: boolean) =>
    `flex-1 min-h-[52px] px-4 text-base tracking-[0.05em] uppercase font-semibold border transition-colors ${
      activo ? "bg-granate text-hueso border-granate" : "bg-hueso text-tinta-suave border-linea"
    }`;

  return (
    <div className="max-w-lg mx-auto px-5 sm:px-6 py-16">
      <div className="text-center mb-10">
        <p className="text-xs tracking-[0.3em] text-ocre uppercase font-semibold mb-3">Añadir obra</p>
        <h1 className="text-3xl sm:text-4xl text-tinta">Nueva obra</h1>
        <p className="text-tinta-suave mt-4">Haz una foto del cuadro o elige una de tu galería.</p>
      </div>

      <form onSubmit={enviar} className="flex flex-col gap-6">
        {/* Foto */}
        <div>
          <input
            id="foto"
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => elegir(e.target.files?.[0])}
          />
          <label
            htmlFor="foto"
            className="block cursor-pointer border-2 border-dashed border-linea hover:border-granate transition-colors bg-superficie"
          >
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Vista previa" className="w-full max-h-80 object-contain bg-hueso" />
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center px-4">
                <span className="text-5xl" aria-hidden="true">📷</span>
                <span className="text-tinta font-semibold">Toca para hacer una foto</span>
                <span className="text-tinta-tenue text-sm">o elegir una de tu galería</span>
              </div>
            )}
          </label>
          {preview && (
            <label htmlFor="foto" className="block text-center mt-2 text-sm text-granate cursor-pointer">
              Cambiar foto
            </label>
          )}
        </div>

        {/* Sala */}
        <div>
          <span className="block text-sm tracking-[0.08em] uppercase text-tinta-suave mb-2">¿En qué sala?</span>
          <div className="flex gap-3">
            <button type="button" onClick={() => setEpoca("nueva")} className={opcion(epoca === "nueva")}>Obra nueva</button>
            <button type="button" onClick={() => setEpoca("antigua")} className={opcion(epoca === "antigua")}>Obra antigua</button>
          </div>
        </div>

        {/* Disponible */}
        <div>
          <span className="block text-sm tracking-[0.08em] uppercase text-tinta-suave mb-2">¿Está disponible?</span>
          <div className="flex gap-3">
            <button type="button" onClick={() => setDisponible(true)} className={opcion(disponible)}>Sí</button>
            <button type="button" onClick={() => setDisponible(false)} className={opcion(!disponible)}>No</button>
          </div>
        </div>

        {error && <p className="text-granate text-sm">{error}</p>}

        <button
          type="submit"
          disabled={subiendo}
          className="w-full bg-granate text-hueso text-base tracking-[0.15em] uppercase font-semibold py-4 hover:bg-granate-claro transition-colors disabled:opacity-60"
        >
          {subiendo ? "Subiendo…" : "Añadir obra"}
        </button>
      </form>
    </div>
  );
}
