"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Lightbox from "@/components/Lightbox";

const obras = [
  { slug: "panadero",   titulo: "XV",   imagen: "/obras/panadero.jpg",    tecnica: "Óleo sobre lienzo",  descripcion: "La calma del trabajo cotidiano: un panadero amasa en una cocina de suelo a cuadros. Costumbrismo con dignidad." },
  { slug: "madre",      titulo: "XVI",  imagen: "/obras/madre.jpg",       tecnica: "Pastel sobre papel", descripcion: "Dos figuras sostienen un bebé entre campos dorados. Ternura y simbolismo de fuerza primitiva." },
  { slug: "procesion",  titulo: "XVII", imagen: "/obras/procesion.jpg",   tecnica: "Óleo sobre tabla",   descripcion: "Una escena dentro de un cuadro. Figuras enmarcadas por rostros que observan desde los bordes del lienzo." },
  { slug: "maternidad", titulo: "XXXI", imagen: "/obras/maternidad.jpg",  tecnica: "Óleo sobre lienzo",  descripcion: "La fuerza primigenia de la maternidad. Figura femenina que sostiene la vida con gesto protector y mirada serena." },
  { slug: "retrato1",   titulo: "XXXII",imagen: "/obras/retrato1.jpg",     tecnica: "Óleo sobre tabla",   descripcion: "Rostro humano capturado con la intensidad expresionista característica del autor. Mirada que interpela al espectador." },
  { slug: "retrato2",   titulo: "XXXIII",imagen: "/obras/retrato2.jpg",     tecnica: "Óleo sobre tabla",   descripcion: "Segunda aproximación al género del retrato. El rostro como territorio de emociones y narrativas silenciosas." },
];

export default function ObrasSigloXX() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () => setLightbox((i) => (i !== null ? (i === 0 ? obras.length - 1 : i - 1) : 0));
  const next = () => setLightbox((i) => (i !== null ? (i + 1) % obras.length : 0));

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {lightbox !== null && (
        <Lightbox
          imagen={obras[lightbox].imagen}
          titulo={obras[lightbox].titulo}
          tecnica={obras[lightbox].tecnica}
          onClose={() => setLightbox(null)}
          onPrev={prev}
          onNext={next}
        />
      )}

      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.4em] text-[#c8962a] uppercase mb-4">Obra pictórica</p>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-4xl md:text-5xl text-[#ede4d2] font-normal mb-4">
          Obras del S. XX
        </h1>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c8962a] to-transparent mx-auto mb-6" />
        <p className="text-[#9e8e78] max-w-xl mx-auto text-sm leading-relaxed">
          Haz clic en cualquier obra para verla completa. Usa las flechas o el teclado para navegar.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {obras.map((obra, idx) => (
          <ObraCard key={obra.slug} obra={obra} onClick={() => setLightbox(idx)} />
        ))}
      </div>

      <div className="text-center mt-14 flex flex-col md:flex-row items-center justify-center gap-4">
        <Link href="/galeria" className="inline-block px-10 py-4 border border-[#c8962a] text-[#c8962a] text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#c8962a]/10 transition-all duration-300">
          Ver galería completa
        </Link>
        <Link href="/tienda" className="inline-block px-10 py-4 bg-[#c8962a] text-[#0c0b09] text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#e2b24a] transition-all duration-300">
          Adquirir obras y láminas
        </Link>
      </div>
    </div>
  );
}

function ObraCard({ obra, grande, onClick }: { obra: (typeof obras)[0]; grande?: boolean; onClick: () => void }) {
  return (
    <article
      className="group relative bg-[#1a150d] border border-[#2e2416] overflow-hidden hover:border-[#c8962a]/40 transition-colors duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className={`relative overflow-hidden ${grande ? "aspect-[4/3]" : "aspect-[3/4]"} bg-[#0c0b09]`}>
        <Image src={obra.imagen} alt={obra.titulo} fill className="object-contain transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09]/80 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white/90 text-2xl bg-black/40 rounded-full w-10 h-10 flex items-center justify-center leading-none">⊕</span>
        </div>
      </div>
      <div className={`p-3 ${grande ? "p-4" : "p-3"}`}>
        <div className="flex items-start justify-between gap-2 mb-1">
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className={`italic text-[#ede4d2] ${grande ? "text-base" : "text-xs"} truncate`}>
            {obra.titulo}
          </h2>
          <span className="text-[8px] tracking-widest text-[#c8962a] uppercase whitespace-nowrap mt-1 shrink-0">
            {obra.tecnica.split(" ")[0]}
          </span>
        </div>
        {grande && <p className="text-xs text-[#9e8e78] leading-relaxed mb-2">{obra.descripcion}</p>}
        <span className="inline-block text-[10px] tracking-[0.1em] uppercase text-[#c8962a] border border-[#c8962a]/30 px-2 py-1 group-hover:bg-[#c8962a]/10 transition-colors">
          Ver
        </span>
      </div>
    </article>
  );
}
