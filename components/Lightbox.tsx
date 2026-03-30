"use client";

import { useEffect } from "react";

interface LightboxProps {
  imagen: string;
  titulo: string;
  tecnica: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function Lightbox({ imagen, titulo, tecnica, onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/97"
      onClick={onClose}
    >
      {/* Botón cerrar — grande, siempre visible */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Cerrar"
        style={{
          position: "fixed",
          top: "1rem",
          right: "1.5rem",
          zIndex: 210,
          width: "3rem",
          height: "3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(20,15,8,0.85)",
          border: "1px solid rgba(200,150,42,0.4)",
          borderRadius: "50%",
          cursor: "pointer",
          color: "#ede4d2",
          fontSize: "1.6rem",
          lineHeight: 1,
          transition: "background 0.2s, border-color 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(200,150,42,0.25)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(200,150,42,0.9)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(20,15,8,0.85)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(200,150,42,0.4)";
        }}
      >
        ✕
      </button>

      {/* Flecha izquierda */}
      {onPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Anterior"
          style={{
            position: "fixed",
            left: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 210,
            width: "3.25rem",
            height: "5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(12,11,9,0.75)",
            border: "1px solid rgba(200,150,42,0.25)",
            cursor: "pointer",
            color: "#c8962a",
            fontSize: "2.5rem",
            lineHeight: 1,
            transition: "background 0.2s, border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = "rgba(200,150,42,0.15)";
            btn.style.borderColor = "rgba(200,150,42,0.7)";
            btn.style.color = "#ede4d2";
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = "rgba(12,11,9,0.75)";
            btn.style.borderColor = "rgba(200,150,42,0.25)";
            btn.style.color = "#c8962a";
          }}
        >
          ‹
        </button>
      )}

      {/* Imagen + título */}
      <div
        className="relative flex flex-col items-center gap-4"
        style={{ maxWidth: "88vw", maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imagen}
          alt={titulo}
          style={{
            maxWidth: "88vw",
            maxHeight: "78vh",
            objectFit: "contain",
            display: "block",
            boxShadow: "0 4px 40px rgba(0,0,0,0.8)",
          }}
        />
        <div className="text-center px-4">
          <p
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-[#ede4d2] text-lg italic"
          >
            {titulo}
          </p>
          <p className="text-xs tracking-widest text-[#c8962a] uppercase mt-1">{tecnica}</p>
        </div>
      </div>

      {/* Flecha derecha */}
      {onNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Siguiente"
          style={{
            position: "fixed",
            right: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 210,
            width: "3.25rem",
            height: "5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(12,11,9,0.75)",
            border: "1px solid rgba(200,150,42,0.25)",
            cursor: "pointer",
            color: "#c8962a",
            fontSize: "2.5rem",
            lineHeight: 1,
            transition: "background 0.2s, border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = "rgba(200,150,42,0.15)";
            btn.style.borderColor = "rgba(200,150,42,0.7)";
            btn.style.color = "#ede4d2";
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = "rgba(12,11,9,0.75)";
            btn.style.borderColor = "rgba(200,150,42,0.25)";
            btn.style.color = "#c8962a";
          }}
        >
          ›
        </button>
      )}

      {/* Instrucción teclado — solo desktop */}
      <p
        className="hidden md:block fixed bottom-5 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.25em] uppercase text-[#5a4e3e]"
        style={{ zIndex: 210 }}
        onClick={(e) => e.stopPropagation()}
      >
        ← → navegar &nbsp;·&nbsp; Esc cerrar
      </p>
    </div>
  );
}
