"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const originales = [
  {
    id: "republica",
    titulo: "República",
    imagen: "/obras/republica.jpg",
    tecnica: "Óleo sobre tabla",
    dimensiones: "Consultar",
    precio: null,
    descripcion: "Figura alegórica sobre una masa de cráneos. Una de las piezas más poderosas de la exposición.",
  },
  {
    id: "multitud",
    titulo: "La Multitud",
    imagen: "/obras/multitud.jpg",
    tecnica: "Óleo sobre tabla",
    dimensiones: "Consultar",
    precio: null,
    descripcion: "Escena expresionista de una multitud ante la muerte. Pieza de gran densidad emocional.",
  },
  {
    id: "calle",
    titulo: "Calle",
    imagen: "/obras/calle.jpg",
    tecnica: "Óleo sobre cartón",
    dimensiones: "Consultar",
    precio: null,
    descripcion: "Dos figuras en un paisaje urbano de tonos azules y cálidos.",
  },
  {
    id: "espejo",
    titulo: "El Espejo",
    imagen: "/obras/espejo.jpg",
    tecnica: "Óleo sobre cartón",
    dimensiones: "Consultar",
    precio: null,
    descripcion: "Composición surreal con figura femenina de amarillo y su doble.",
  },
  {
    id: "monjas",
    titulo: "Monjas",
    imagen: "/obras/monjas.jpg",
    tecnica: "Óleo sobre cartón",
    dimensiones: "Consultar",
    precio: null,
    descripcion: "Diálogo entre lo sagrado y lo carnal a través de un umbral.",
  },
];

const laminas = [
  { id: "lamina-republica", titulo: "República — Lámina", imagen: "/obras/republica.jpg", precio: 45, formato: "30×40 cm · Papel fotográfico de alta calidad · Firmada y numerada" },
  { id: "lamina-multitud", titulo: "La Multitud — Lámina", imagen: "/obras/multitud.jpg", precio: 45, formato: "30×40 cm · Papel fotográfico de alta calidad · Firmada y numerada" },
  { id: "lamina-calle", titulo: "Calle — Lámina", imagen: "/obras/calle.jpg", precio: 35, formato: "30×40 cm · Papel fotográfico de alta calidad · Firmada y numerada" },
  { id: "lamina-espejo", titulo: "El Espejo — Lámina", imagen: "/obras/espejo.jpg", precio: 35, formato: "30×40 cm · Papel fotográfico de alta calidad · Firmada y numerada" },
  { id: "lamina-monjas", titulo: "Monjas — Lámina", imagen: "/obras/monjas.jpg", precio: 35, formato: "30×40 cm · Papel fotográfico de alta calidad · Firmada y numerada" },
];

function ProductoOriginal({ obra }: { obra: typeof originales[0] }) {
  return (
    <div className="group bg-[#1a150d] border border-[#2e2416] overflow-hidden hover:border-[#c8962a]/40 transition-colors duration-300">
      <div className="relative aspect-square overflow-hidden">
        <Image src={obra.imagen} alt={obra.titulo} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a150d]/70 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="bg-[#c8962a] text-[#0c0b09] text-[10px] tracking-[0.15em] uppercase px-2 py-1 font-semibold">
            Original único
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-lg italic text-[#ede4d2] mb-1"
        >
          {obra.titulo}
        </h3>
        <p className="text-xs text-[#c8962a] tracking-widest uppercase mb-3">{obra.tecnica}</p>
        <p className="text-xs text-[#9e8e78] leading-relaxed mb-4">{obra.descripcion}</p>
        <Link
          href="/contacto"
          className="block text-center text-xs tracking-[0.15em] uppercase border border-[#c8962a] text-[#c8962a] px-4 py-2.5 hover:bg-[#c8962a] hover:text-[#0c0b09] transition-all duration-300"
        >
          Consultar precio
        </Link>
      </div>
    </div>
  );
}

function LaminaCard({ lamina }: { lamina: typeof laminas[0] }) {
  const [loading, setLoading] = useState(false);

  const handleCompra = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productoId: lamina.id, titulo: lamina.titulo, precio: lamina.precio }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Error al procesar el pago. Inténtalo de nuevo.");
      }
    } catch {
      alert("Error de conexión. Inténtalo de nuevo.");
    }
    setLoading(false);
  };

  return (
    <div className="group bg-[#1a150d] border border-[#2e2416] overflow-hidden hover:border-[#c8962a]/40 transition-colors duration-300">
      <div className="relative aspect-square overflow-hidden">
        <Image src={lamina.imagen} alt={lamina.titulo} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a150d]/70 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="bg-[#2e2416] border border-[#c8962a]/30 text-[#c8962a] text-[10px] tracking-[0.15em] uppercase px-2 py-1">
            Lámina
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-base italic text-[#ede4d2] mb-1"
        >
          {lamina.titulo}
        </h3>
        <p className="text-xs text-[#9e8e78] leading-relaxed mb-3">{lamina.formato}</p>
        <div className="flex items-center justify-between gap-3">
          <span
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-xl text-[#c8962a]"
          >
            {lamina.precio} €
          </span>
          <button
            onClick={handleCompra}
            disabled={loading}
            className="flex-1 text-xs tracking-[0.15em] uppercase bg-[#c8962a] text-[#0c0b09] px-4 py-2.5 font-semibold hover:bg-[#e2b24a] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Procesando..." : "Comprar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Tienda() {
  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      {/* Encabezado */}
      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.4em] text-[#c8962a] uppercase mb-4">Arte original</p>
        <h1
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-4xl md:text-5xl text-[#ede4d2] font-normal mb-4"
        >
          Tienda
        </h1>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c8962a] to-transparent mx-auto mb-6" />
        <p className="text-[#9e8e78] max-w-xl mx-auto text-sm leading-relaxed">
          Obras originales únicas y láminas de alta calidad firmadas y numeradas por el artista. Envío a toda España y Europa.
        </p>
      </div>

      {/* Sección obras originales */}
      <section className="mb-20">
        <div className="flex items-center gap-6 mb-8">
          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-2xl text-[#ede4d2]"
          >
            Obras Originales
          </h2>
          <div className="flex-1 h-px bg-[#2e2416]" />
          <span className="text-xs tracking-[0.2em] text-[#9e8e78] uppercase">Piezas únicas</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {originales.map((obra) => (
            <ProductoOriginal key={obra.id} obra={obra} />
          ))}
        </div>
      </section>

      {/* Sección láminas */}
      <section>
        <div className="flex items-center gap-6 mb-8">
          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-2xl text-[#ede4d2]"
          >
            Láminas
          </h2>
          <div className="flex-1 h-px bg-[#2e2416]" />
          <span className="text-xs tracking-[0.2em] text-[#9e8e78] uppercase">Firmadas y numeradas</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {laminas.map((lamina) => (
            <LaminaCard key={lamina.id} lamina={lamina} />
          ))}
        </div>
      </section>

      {/* Info envío */}
      <div className="mt-16 border border-[#2e2416] p-8 bg-[#1a150d]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-2xl mb-3">📦</p>
            <p className="text-xs tracking-[0.2em] text-[#c8962a] uppercase mb-2">Envío cuidadoso</p>
            <p className="text-xs text-[#9e8e78]">Las láminas se envían enrolladas en tubo rígido protector. Los originales con embalaje especializado.</p>
          </div>
          <div>
            <p className="text-2xl mb-3">✍️</p>
            <p className="text-xs tracking-[0.2em] text-[#c8962a] uppercase mb-2">Firmadas y numeradas</p>
            <p className="text-xs text-[#9e8e78]">Todas las láminas están firmadas a mano por el artista e incluyen certificado de autenticidad.</p>
          </div>
          <div>
            <p className="text-2xl mb-3">📬</p>
            <p className="text-xs tracking-[0.2em] text-[#c8962a] uppercase mb-2">Entregas en 5-7 días</p>
            <p className="text-xs text-[#9e8e78]">Envíos a toda España y Europa. Para obras originales, contactar para coordinar entrega.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
