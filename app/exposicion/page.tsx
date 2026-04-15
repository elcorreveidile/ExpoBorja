"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Exposicion() {
  const [videoActivo, setVideoActivo] = useState(false);

  return (
    <div className="pt-32 pb-8 md:pb-16">
      {/* Encabezado */}
      <div className="text-center px-6 mb-16">
        <p className="text-xs tracking-[0.4em] text-[#c8962a] uppercase mb-4">2026</p>
        <h1
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-4xl md:text-5xl text-[#ede4d2] font-normal mb-4"
        >
          Exposición de Pintura
        </h1>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c8962a] to-transparent mx-auto mb-6" />
        <p className="text-[#9e8e78] max-w-xl mx-auto text-sm leading-relaxed">
          Una muestra de la obra reciente de Borja Satrústegui en el corazón del Albayzín, Granada.
        </p>
      </div>

      {/* Cartel + datos */}
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-20">
        <div className="relative">
          <div className="relative aspect-[3/4] overflow-hidden border border-[#2e2416] shadow-2xl">
            <Image src="/cartel/cartel.jpg" alt="Cartel de la exposición" fill className="object-cover" />
          </div>
          <div className="absolute -bottom-3 -right-3 w-full h-full border border-[#c8962a]/20 -z-10" />
        </div>

        <div className="flex flex-col gap-8 pt-4">
          <div>
            <p className="text-xs tracking-[0.3em] text-[#c8962a] uppercase mb-3">Fechas</p>
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-3xl text-[#ede4d2] mb-2">
              Del 6 al 19 de abril
            </p>
            <p className="text-sm text-[#9e8e78]">Entrada libre · Horario de apertura del Centro</p>
          </div>
          <div className="w-full h-px bg-[#2e2416]" />
          <div>
            <p className="text-xs tracking-[0.3em] text-[#c8962a] uppercase mb-3">Lugar</p>
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-xl text-[#ede4d2] mb-2">
              Centro Cívico del Albayzín
            </p>
            <p className="text-sm text-[#9e8e78] leading-relaxed">
              Plaza Aliatar<br />Granada<br />Ayuntamiento de Granada
            </p>
          </div>
          <div className="w-full h-px bg-[#2e2416]" />
          <div>
            <p className="text-xs tracking-[0.3em] text-[#c8962a] uppercase mb-3">Sobre la muestra</p>
            <p className="text-sm text-[#9e8e78] leading-relaxed">
              Una selección de óleos sobre tabla y cartón que recorre los grandes temas de la obra de Satrústegui: la memoria histórica, la crítica social, el surrealismo cotidiano y la condición humana.
            </p>
          </div>
          <Link href="/tienda" className="inline-block px-8 py-3 bg-[#c8962a] text-[#0c0b09] text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#e2b24a] transition-all duration-300 text-center">
            Adquirir obra
          </Link>
        </div>
      </div>

      {/* VÍDEO */}
      <div className="bg-[#1a150d] border-t border-b border-[#2e2416] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] text-[#c8962a] uppercase mb-3">El pintor en vídeo</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-3xl text-[#ede4d2]">
              Borja Satrústegui
            </h2>
          </div>

          <div className="relative aspect-video overflow-hidden border border-[#2e2416] shadow-2xl bg-[#0c0b09]">
            {videoActivo ? (
              <iframe
                src="https://www.youtube-nocookie.com/embed/_ehRqUgG34c?autoplay=1&rel=0"
                title="Borja Satrústegui — Pintor"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <button
                onClick={() => setVideoActivo(true)}
                className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-4 group"
                aria-label="Reproducir vídeo"
              >
                <Image
                  src="/obras/tablao.jpg"
                  alt="Ver vídeo de Borja Satrústegui"
                  fill
                  className="object-cover opacity-40 group-hover:opacity-50 transition-opacity"
                />
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-[#c8962a] flex items-center justify-center group-hover:bg-[#e2b24a] transition-colors shadow-xl">
                    <span className="text-[#0c0b09] text-2xl ml-1">▶</span>
                  </div>
                  <span className="text-xs tracking-[0.2em] uppercase text-[#ede4d2]">Ver vídeo</span>
                </div>
              </button>
            )}
          </div>

          <div className="text-center mt-6">
            <a
              href="https://youtu.be/_ehRqUgG34c"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#c8962a] text-[#c8962a] text-xs tracking-[0.15em] uppercase hover:bg-[#c8962a] hover:text-[#0c0b09] transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Ver en YouTube
            </a>
          </div>
        </div>
      </div>

      {/* CÓMO LLEGAR */}
      <div className="max-w-4xl mx-auto px-6 pt-16">
        <div className="text-center mb-8">
          <p className="text-xs tracking-[0.3em] text-[#c8962a] uppercase mb-3">Cómo llegar</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-2xl text-[#ede4d2]">
            Centro Cívico del Albayzín
          </h2>
          <p className="text-sm text-[#9e8e78] mt-2">Plaza Aliatar, Granada</p>
        </div>

        <div className="border border-[#2e2416] bg-[#1a150d] p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-sm text-[#9e8e78] leading-relaxed space-y-2">
            <p><span className="text-[#c8962a]">📍</span> Plaza Aliatar, s/n</p>
            <p><span className="text-[#c8962a]">🚌</span> Autobús línea C34 · Parada Albayzín</p>
            <p><span className="text-[#c8962a]">🚶</span> 15 min a pie desde Plaza Nueva</p>
            <p><span className="text-[#c8962a]">🅿️</span> Aparcamiento en Plaza de las Pasiegas</p>
          </div>
          <a
            href="https://maps.google.com/?q=Plaza+Aliatar+Granada+Centro+Civico+Albayzin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 border border-[#c8962a] text-[#c8962a] text-xs tracking-[0.2em] uppercase hover:bg-[#c8962a] hover:text-[#0c0b09] transition-all duration-300 whitespace-nowrap"
          >
            Abrir en Google Maps →
          </a>
        </div>
      </div>
    </div>
  );
}
