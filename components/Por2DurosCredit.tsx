"use client";

import { useState } from "react";

// Firma "desarrollo Por 2 duros" con guiño: al pasar el cursor aparece una
// frase aleatoria (aquí, temática pictórica/granadina). Convención del creador.
const FRASES = [
  "Código a dos duros, arte a precio de museo.",
  "Hecho con café, píxeles y algo de óleo.",
  "Pintado a mano… bueno, tecleado.",
  "Menos ratón, más pincel.",
  "Del Albayzín a la nube.",
  "Cada clic, una pincelada menos para el aburrimiento.",
  "Programado con la paleta de Solana.",
  "Byte a byte, trazo a trazo.",
  "Barato de precio, caro de mimo.",
  "Sin título, con mucho cariño.",
  "Realismo social, también en el código.",
  "Aquí no hay letra pequeña… bueno, esta un poco.",
];

export default function Por2DurosCredit({ className = "" }: { className?: string }) {
  const [frase, setFrase] = useState<string | null>(null);

  return (
    <span className={`relative inline-flex items-center ${className}`}>
      <a
        href="https://www.por2duros.com"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setFrase(FRASES[Math.floor(Math.random() * FRASES.length)])}
        onMouseLeave={() => setFrase(null)}
        className="group text-tinta-tenue transition-colors hover:text-granate"
      >
        desarrollo{" "}
        <span className="font-semibold text-tinta-suave group-hover:text-granate">Por 2 duros</span>
      </a>
      {frase && (
        <span
          role="status"
          className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-56 -translate-x-1/2 rounded-md border border-linea bg-hueso px-3 py-2 text-center text-xs text-tinta-suave shadow-lg"
        >
          {frase}
        </span>
      )}
    </span>
  );
}
