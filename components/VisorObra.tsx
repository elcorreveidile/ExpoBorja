"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  imagen: string;
  titulo: string;
}

export default function VisorObra({ imagen, titulo }: Props) {
  const [ampliada, setAmpliada] = useState(false);

  useEffect(() => {
    if (!ampliada) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAmpliada(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [ampliada]);

  return (
    <>
      <button
        type="button"
        onClick={() => setAmpliada(true)}
        className="group relative block w-full aspect-[4/5] bg-hueso border border-linea overflow-hidden cursor-zoom-in"
        aria-label={`Ampliar ${titulo}`}
      >
        <Image
          src={imagen}
          alt={titulo}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          priority
          className="object-contain p-4"
        />
        <span className="absolute bottom-3 right-3 text-xs tracking-[0.12em] uppercase text-tinta-tenue bg-hueso/85 border border-linea px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
          Ampliar
        </span>
      </button>

      {ampliada && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-tinta/95 p-4"
          onClick={() => setAmpliada(false)}
          role="dialog"
          aria-modal="true"
          aria-label={titulo}
        >
          <button
            type="button"
            onClick={() => setAmpliada(false)}
            aria-label="Cerrar"
            className="fixed top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-hueso text-tinta text-2xl leading-none border border-linea hover:bg-granate hover:text-hueso transition-colors"
          >
            ✕
          </button>
          <div
            className="relative w-full h-full max-w-5xl max-h-[88vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imagen}
              alt={titulo}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
