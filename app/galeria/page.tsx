"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Lightbox from "@/components/Lightbox";

const obras = [
  { slug: "reflejos",  titulo: "Las Bañistas",                 imagen: "/obras/reflejos.jpg",  tecnica: "Óleo sobre lienzo",  descripcion: "Figuras femeninas y sus reflejos invertidos en el agua. Composición serena que dialoga con la tradición clásica del desnudo.", destacada: true },
  { slug: "justicia",  titulo: "Justicia Social",              imagen: "/obras/justicia.jpg",  tecnica: "Óleo sobre lienzo",  descripcion: "Marea humana de puños alzados. El marco mismo se convierte en soporte del texto: palabras que son grito.", destacada: true },
  { slug: "planideras",titulo: "Las Plañideras",               imagen: "/obras/planideras.jpg",tecnica: "Óleo sobre lienzo",  descripcion: "Figuras envueltas en oro y blanco, tendidas en larga procesión. Duelo colectivo de resonancias antiguas.", destacada: true },
  { slug: "puente",    titulo: "El Puente",                    imagen: "/obras/puente.jpg",    tecnica: "Óleo sobre lienzo",  descripcion: "Una familia avanza entre la multitud sobre un puente nocturno. El éxodo contemporáneo, la soledad en la marea.", destacada: true },
  { slug: "republica", titulo: "República",                    imagen: "/obras/republica.jpg", tecnica: "Óleo sobre tabla",   descripcion: "Una figura femenina alza la palabra República sobre una masa de cráneos. Alegoría de la memoria histórica." },
  { slug: "camino",    titulo: "El Camino",                    imagen: "/obras/camino.jpg",    tecnica: "Óleo sobre lienzo",  descripcion: "Dos filas de figuras en blanco convergen hacia una esfera dorada alada. Imagen de búsqueda y trascendencia." },
  { slug: "arquero",   titulo: "El Arquero",                   imagen: "/obras/arquero.jpg",   tecnica: "Óleo sobre lienzo",  descripcion: "Un arquero desnudo apunta a una multitud flanqueada por un esqueleto. Danza de la muerte de raíz medieval." },
  { slug: "manos",     titulo: "Las Manos",                    imagen: "/obras/manos.jpg",     tecnica: "Óleo sobre lienzo",  descripcion: "Un bosque de brazos y manos con texto superpuesto. La escritura y el cuerpo como materia inseparable." },
  { slug: "arlequin",  titulo: "El Arlequín",                  imagen: "/obras/arlequin.jpg",  tecnica: "Óleo sobre lienzo",  descripcion: "Un arlequín y una figura desnuda juegan a las cartas sobre fondos rojos. Guiño a Picasso, tensión y complicidad." },
  { slug: "tablao",    titulo: "El Tablao",                    imagen: "/obras/tablao.jpg",    tecnica: "Óleo sobre lienzo",  descripcion: "Escena de flamenco: brazos, cuerpos y guitarras en la calidez de un tablao granadino." },
  { slug: "multitud",  titulo: "La Multitud",                  imagen: "/obras/multitud.jpg",  tecnica: "Óleo sobre tabla",   descripcion: "Una muchedumbre densa ante la figura de la muerte. Lo cotidiano y lo existencial en un espacio expresionista." },
  { slug: "encuentro", titulo: "El Encuentro",                 imagen: "/obras/encuentro.jpg", tecnica: "Óleo sobre tabla",   descripcion: "Dos rostros en tensión expresionista. Trazo libre y colores de gran intensidad." },
  { slug: "flores",    titulo: "Adelfas",                      imagen: "/obras/flores.jpg",    tecnica: "Óleo sobre lienzo",  descripcion: "Flores amarillas sobre azul violeta. Rareza botánica en la obra de Satrústegui: belleza sin más pretensión." },
  { slug: "alhambra",  titulo: "Conversación en el Albayzín",  imagen: "/obras/alhambra.jpg",  tecnica: "Óleo sobre tabla",   descripcion: "Dos figuras moriscas conversan frente a la Alhambra. Diálogo de culturas con el monumento nazarí como testigo." },
  { slug: "panadero",  titulo: "El Panadero",                  imagen: "/obras/panadero.jpg",  tecnica: "Óleo sobre lienzo",  descripcion: "La calma del trabajo cotidiano: un panadero amasa en una cocina de suelo a cuadros. Costumbrismo con dignidad." },
  { slug: "madre",     titulo: "La Madre",                     imagen: "/obras/madre.jpg",     tecnica: "Pastel sobre papel", descripcion: "Dos figuras sostienen un bebé entre campos dorados. Ternura y simbolismo de fuerza primitiva." },
  { slug: "procesion", titulo: "La Procesión",                 imagen: "/obras/procesion.jpg", tecnica: "Óleo sobre tabla",   descripcion: "Una escena dentro de un cuadro. Figuras enmarcadas por rostros que observan desde los bordes del lienzo." },
  { slug: "monjas",    titulo: "Monjas",                       imagen: "/obras/monjas.jpg",    tecnica: "Óleo sobre cartón",  descripcion: "Religiosas y figuras desnudas habitan mundos paralelos separados por un umbral." },
  { slug: "espejo",    titulo: "El Espejo",                    imagen: "/obras/espejo.jpg",    tecnica: "Óleo sobre cartón",  descripcion: "Una mujer de amarillo y su reflejo en un espacio surreal. La identidad y el doble en tonos verdes y ocres." },
  { slug: "calle",        titulo: "Calle",               imagen: "/obras/calle.jpg",          tecnica: "Óleo sobre cartón",  descripcion: "Dos figuras avanzan por una calle de tonos azules y cálidos. El tiempo detenido de la vida ordinaria." },
  { slug: "poder",        titulo: "El Poder",            imagen: "/obras/poder.jpg",          tecnica: "Óleo sobre tabla",   descripcion: "Una mano gigante desciende sobre una masa de humanidad. Símbolo crudo del dominio y la pequeñez." },
  { slug: "cabinas",      titulo: "Las Cabinas",         imagen: "/obras/cabinas.jpg",        tecnica: "Óleo sobre cartón",  descripcion: "Figuras atrapadas en cabinas transparentes, un pájaro en el suelo. El absurdo kafkiano hecho pintura." },
  { slug: "medicos",      titulo: "Los Médicos",         imagen: "/obras/medicos.jpg",        tecnica: "Óleo sobre lienzo",  descripcion: "Tres figuras con bata blanca ante una mesa con especímenes. La ciencia y sus rituales en clave de misterio." },
  { slug: "exodus",       titulo: "El Éxodo",            imagen: "/obras/exodus.jpg",         tecnica: "Óleo sobre tabla",   descripcion: "Dos manos blancas y enormes flanquean una multitud en marcha con un niño. La huida, lo sagrado, el miedo." },
  { slug: "pensamiendia", titulo: "Pensamendía",  imagen: "/obras/pensamiendia.jpg", tecnica: "Óleo sobre lienzo",  descripcion: "Dos hileras de figuras coronadas de flores se miran sobre fondo dorado. El pensamiento como diálogo infinito." },
  { slug: "umbral",       titulo: "El Umbral",    imagen: "/obras/umbral.jpg",       tecnica: "Óleo sobre lienzo",  descripcion: "Una figura desnuda se abraza a un pilar oscuro mirando al cielo. El gesto de quien está en el límite entre dos mundos." },
  { slug: "arena",        titulo: "La Arena",     imagen: "/obras/arena.jpg",        tecnica: "Óleo sobre tabla",   descripcion: "Una multitud de cuerpos se agolpa en un espacio oval rosado. El rebaño, la masa, la soledad en el número." },
  { slug: "corredor",     titulo: "El Corredor",  imagen: "/obras/corredor.jpg",     tecnica: "Óleo sobre lienzo",  descripcion: "Figuras en bata forman una fila en un corredor institucional nocturno. La burocracia como jaula." },
  { slug: "primavera",    titulo: "La Primavera", imagen: "/obras/primavera.jpg",    tecnica: "Óleo sobre tabla",   descripcion: "Madres e hijos desnudos en un campo verde bajo cielo azul. La vida que florece sin permiso ni pudor." },
];

export default function Galeria() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const destacadas = obras.filter((o) => o.destacada);
  const resto = obras.filter((o) => !o.destacada);

  const prev = () => setLightbox((i) => (i !== null ? (i === 0 ? obras.length - 1 : i - 1) : 0));
  const next = () => setLightbox((i) => (i !== null ? (i + 1) % obras.length : 0));

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
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
          Galería
        </h1>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c8962a] to-transparent mx-auto mb-6" />
        <p className="text-[#9e8e78] max-w-xl mx-auto text-sm leading-relaxed">
          Haz clic en cualquier obra para verla completa. Usa las flechas o el teclado para navegar.
        </p>
      </div>

      {/* Obras destacadas — 2 columnas grandes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {destacadas.map((obra) => {
          const idx = obras.findIndex((o) => o.slug === obra.slug);
          return <ObraCard key={obra.slug} obra={obra} grande onClick={() => setLightbox(idx)} />;
        })}
      </div>

      {/* Resto en grid 4 columnas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {resto.map((obra) => {
          const idx = obras.findIndex((o) => o.slug === obra.slug);
          return <ObraCard key={obra.slug} obra={obra} onClick={() => setLightbox(idx)} />;
        })}
      </div>

      <div className="text-center mt-14">
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
      <div className={`relative overflow-hidden ${grande ? "aspect-[4/3]" : "aspect-square"}`}>
        <Image src={obra.imagen} alt={obra.titulo} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b09]/80 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white/90 text-3xl bg-black/40 rounded-full w-12 h-12 flex items-center justify-center leading-none">⊕</span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className={`italic text-[#ede4d2] ${grande ? "text-xl" : "text-base"}`}>
            {obra.titulo}
          </h2>
          <span className="text-[10px] tracking-widest text-[#c8962a] uppercase whitespace-nowrap mt-1 shrink-0">
            {obra.tecnica.split(" ")[0]}
          </span>
        </div>
        {grande && <p className="text-sm text-[#9e8e78] leading-relaxed mb-3">{obra.descripcion}</p>}
        <span className="inline-block text-xs tracking-[0.15em] uppercase text-[#c8962a] border border-[#c8962a]/30 px-3 py-1.5 group-hover:bg-[#c8962a]/10 transition-colors">
          Ver completa
        </span>
      </div>
    </article>
  );
}
