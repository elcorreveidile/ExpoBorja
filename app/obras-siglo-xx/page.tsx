"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Lightbox from "@/components/Lightbox";

const obras = [
  { slug: "madre",      titulo: "XVI",  imagen: "/obras/madre.jpg",       tecnica: "Pastel sobre papel", descripcion: "Dos figuras sostienen un bebé entre campos dorados. Ternura y simbolismo de fuerza primitiva." },
  { slug: "procesion",  titulo: "XVII", imagen: "/obras/procesion.jpg",   tecnica: "Óleo sobre tabla",   descripcion: "Una escena dentro de un cuadro. Figuras enmarcadas por rostros que observan desde los bordes del lienzo." },
  { slug: "maternidad", titulo: "XXXI", imagen: "/obras/maternidad.jpg",  tecnica: "Óleo sobre lienzo",  descripcion: "La fuerza primigenia de la maternidad. Figura femenina que sostiene la vida con gesto protector y mirada serena." },
  { slug: "retrato1",   titulo: "XXXII",imagen: "/obras/retrato1.jpg",     tecnica: "Óleo sobre tabla",   descripcion: "Rostro humano capturado con la intensidad expresionista característica del autor. Mirada que interpela al espectador." },
  { slug: "retrato2",   titulo: "XXXIII",imagen: "/obras/retrato2.jpg",     tecnica: "Óleo sobre tabla",   descripcion: "Segunda aproximación al género del retrato. El rostro como territorio de emociones y narrativas silenciosas." },
  { slug: "abril-463",  titulo: "1",    imagen: "/obras-blog/abril-463.jpg",  tecnica: "Momento", descripcion: "Los momentos de B. Satrústegui. Obra de estilo personal, expresado como producto de una necesidad vital de expresión." },
  { slug: "abril-466",  titulo: "2",    imagen: "/obras-blog/abril-466.jpg",  tecnica: "Momento", descripcion: "Narrador de la vida cotidiana, de las pequeñas cosas que rellenan las horas de la existencia." },
  { slug: "abril-467",  titulo: "3",    imagen: "/obras-blog/abril-467.jpg",  tecnica: "Momento", descripcion: "Personajes sumidos en una neblina cromática ajada por el tiempo, sentimientos neutros en un universo cenizo." },
  { slug: "abril-470",  titulo: "4",    imagen: "/obras-blog/abril-470.jpg",  tecnica: "Momento", descripcion: "Siluetas y colorido que evocan la tradición pictórica, pero con un estilo muy personal y contemporáneo." },
  { slug: "abril-471",  titulo: "5",    imagen: "/obras-blog/abril-471.jpg",  tecnica: "Momento", descripcion: "El autor traza con prisa e ímpetu, desarrollando la composición como grafía icónica de momentos sencillos." },
  { slug: "abril-473",  titulo: "7",    imagen: "/obras-blog/abril-473.jpg",  tecnica: "Momento", descripcion: "El color organizado como lenguaje sensitivo que trasciende las figuras, tomando vida y fuerza propia." },
  { slug: "abril-481",  titulo: "10",   imagen: "/obras-blog/abril-481.jpg",  tecnica: "Momento", descripcion: "Estilo ambivalente, apareciendo como sombra de la modernidad clásica y como ilustración pop." },
  { slug: "abril-484",  titulo: "12",   imagen: "/obras-blog/abril-484.jpg",  tecnica: "Momento", descripcion: "Personajes que adoptan poses que recuerdan a la obra de Gauguin, en impresión se queda." },
  { slug: "abril-485",  titulo: "13",   imagen: "/obras-blog/abril-485.jpg",  tecnica: "Momento", descripcion: "Aroma de ilustración de los setenta y ochenta, surge como brillo tangencial en la memoria." },
  { slug: "abril-489",  titulo: "16",   imagen: "/obras-blog/abril-489.jpg",  tecnica: "Momento", descripcion: "Influencias de las gamas cromáticas bien encajadas, tomando el color vida y fuerza propia." },
  { slug: "abril-491",  titulo: "17",   imagen: "/obras-blog/abril-491.jpg",  tecnica: "Momento", descripcion: "Obra singular llena de relaciones de afectos y convivencia, inmersa en la vida cotidiana." },
  { slug: "abril-492",  titulo: "18",   imagen: "/obras-blog/abril-492.jpg",  tecnica: "Momento", descripcion: "Universo ceniza, intrascendente, silencioso, exhibiendo personajes ajenos al entorno." },
  { slug: "abril-493",  titulo: "19",   imagen: "/obras-blog/abril-493.jpg",  tecnica: "Momento", descripcion: "El artista no se pronuncia en la escena, evita influenciar a los seres reflejados en ella." },
  { slug: "abril-494",  titulo: "20",   imagen: "/obras-blog/abril-494.jpg",  tecnica: "Momento", descripcion: "Composición como grafía icónica, llena de las pequeñas cosas que rellenan las horas." },
  { slug: "abril-495",  titulo: "21",   imagen: "/obras-blog/abril-495.jpg",  tecnica: "Momento", descripcion: "Transformación del color en lenguaje sensitivo que trasciende las figuras." },
  { slug: "abril-496",  titulo: "22",   imagen: "/obras-blog/abril-496.jpg",  tecnica: "Momento", descripcion: "Tranquila conclusión visual, reflexiva, desde un estilo personal y expresión vital." },
  { slug: "obra-nueva-1",  titulo: "23", imagen: "/obras-nuevas/obra-nueva-1.jpg",  tecnica: "Óleo", descripcion: "Obra antigua de Borja Satrústegui." },
  { slug: "obra-nueva-2",  titulo: "24", imagen: "/obras-nuevas/obra-nueva-2.jpg",  tecnica: "Óleo", descripcion: "Obra antigua de Borja Satrústegui." },
  { slug: "obra-nueva-3",  titulo: "25", imagen: "/obras-nuevas/obra-nueva-3.jpg",  tecnica: "Óleo", descripcion: "Obra antigua de Borja Satrústegui." },
  { slug: "obra-nueva-4",  titulo: "26", imagen: "/obras-nuevas/obra-nueva-4.jpg",  tecnica: "Óleo", descripcion: "Obra antigua de Borja Satrústegui." },
  { slug: "obra-nueva-5",  titulo: "27", imagen: "/obras-nuevas/obra-nueva-5.jpg",  tecnica: "Óleo", descripcion: "Obra antigua de Borja Satrústegui." },
  { slug: "obra-nueva-6",  titulo: "28", imagen: "/obras-nuevas/obra-nueva-6.jpg",  tecnica: "Óleo", descripcion: "Obra antigua de Borja Satrústegui." },
  { slug: "obra-nueva-7",  titulo: "29", imagen: "/obras-nuevas/obra-nueva-7.jpg",  tecnica: "Óleo", descripcion: "Obra antigua de Borja Satrústegui." },
  { slug: "obra-nueva-8",  titulo: "30", imagen: "/obras-nuevas/obra-nueva-8.jpg",  tecnica: "Óleo", descripcion: "Obra antigua de Borja Satrústegui." },
  { slug: "obra-nueva-9",  titulo: "31", imagen: "/obras-nuevas/obra-nueva-9.jpg",  tecnica: "Óleo", descripcion: "Obra antigua de Borja Satrústegui." },
  { slug: "obra-nueva-10", titulo: "32", imagen: "/obras-nuevas/obra-nueva-10.jpg", tecnica: "Óleo", descripcion: "Obra antigua de Borja Satrústegui." },
  { slug: "obra-nueva-11", titulo: "33", imagen: "/obras-nuevas/obra-nueva-11.jpg", tecnica: "Óleo", descripcion: "Obra antigua de Borja Satrústegui." },
  { slug: "obra-nueva-12", titulo: "34", imagen: "/obras-nuevas/obra-nueva-12.jpg", tecnica: "Óleo", descripcion: "Obra antigua de Borja Satrústegui." },
  { slug: "obra-nueva-13", titulo: "35", imagen: "/obras-nuevas/obra-nueva-13.jpg", tecnica: "Óleo", descripcion: "Obra antigua de Borja Satrústegui." },
  { slug: "obra-nueva-16", titulo: "38", imagen: "/obras-nuevas/obra-nueva-16.jpg", tecnica: "Óleo", descripcion: "Obra antigua de Borja Satrústegui." },
  { slug: "obra-nueva-17", titulo: "39", imagen: "/obras-nuevas/obra-nueva-17.jpg", tecnica: "Óleo", descripcion: "Obra antigua de Borja Satrústegui." },
  { slug: "obra-nueva-18", titulo: "40", imagen: "/obras-nuevas/obra-nueva-18.jpg", tecnica: "Óleo", descripcion: "Obra antigua de Borja Satrústegui." },
  { slug: "obra-nueva-19", titulo: "41", imagen: "/obras-nuevas/obra-nueva-19.jpg", tecnica: "Óleo", descripcion: "Obra antigua de Borja Satrústegui." },
  { slug: "obra-nueva-20", titulo: "42", imagen: "/obras-nuevas/obra-nueva-20.jpg", tecnica: "Óleo", descripcion: "Obra antigua de Borja Satrústegui." },
  { slug: "obra-nueva-21", titulo: "43", imagen: "/obras-nuevas/obra-nueva-21.jpg", tecnica: "Óleo", descripcion: "Obra antigua de Borja Satrústegui." },
  { slug: "obra-nueva-22", titulo: "44", imagen: "/obras-nuevas/obra-nueva-22.jpg", tecnica: "Óleo", descripcion: "Obra antigua de Borja Satrústegui." },
  { slug: "obra-nueva-23", titulo: "45", imagen: "/obras-nuevas/obra-nueva-23.jpg", tecnica: "Óleo", descripcion: "Obra antigua de Borja Satrústegui." },
  { slug: "obra-nueva-24", titulo: "46", imagen: "/obras-nuevas/obra-nueva-24.jpg", tecnica: "Óleo", descripcion: "Obra antigua de Borja Satrústegui." },
  { slug: "obra-nueva-25", titulo: "47", imagen: "/obras-nuevas/obra-nueva-25.jpg", tecnica: "Óleo", descripcion: "Obra antigua de Borja Satrústegui." },
  { slug: "obra-nueva-26", titulo: "48", imagen: "/obras-nuevas/obra-nueva-26.jpg", tecnica: "Óleo", descripcion: "Obra antigua de Borja Satrústegui." },
  { slug: "obra-nueva-27", titulo: "49", imagen: "/obras-nuevas/obra-nueva-27.jpg", tecnica: "Óleo", descripcion: "Obra antigua de Borja Satrústegui." },
  { slug: "obra-nueva-28", titulo: "50", imagen: "/obras-nuevas/obra-nueva-28.jpg", tecnica: "Óleo", descripcion: "Obra antigua de Borja Satrústegui." },
  { slug: "obra-nueva-29", titulo: "51", imagen: "/obras-nuevas/obra-nueva-29.jpg", tecnica: "Óleo", descripcion: "Obra antigua de Borja Satrústegui." },
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
          Obra antigua
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
