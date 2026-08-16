"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const enlaces = [
  { href: "/", label: "Inicio" },
  { href: "/obra-nueva", label: "Obra nueva" },
  { href: "/obra-antigua", label: "Obra antigua" },
  { href: "/disponibles", label: "Disponibles" },
  { href: "/sobre-borja", label: "Sobre Borja" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const esActivo = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-hueso/95 backdrop-blur-sm border-b border-linea"
          : "bg-fondo border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        {/* Fila 1: nombre + botón móvil */}
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="group flex flex-col leading-none">
            <span className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-tinta group-hover:text-granate transition-colors">
              Borja Satrústegui
            </span>
            <span className="text-[11px] tracking-[0.3em] text-ocre uppercase mt-1">
              Pintor
            </span>
          </Link>

          {/* Botón menú — solo móvil, grande y con etiqueta */}
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="md:hidden flex items-center gap-2 px-4 py-3 rounded border border-granate/40 text-granate hover:bg-granate hover:text-hueso transition-colors"
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuAbierto}
          >
            <span className="flex flex-col gap-[5px]" aria-hidden="true">
              <span className={`block h-[2px] w-5 bg-current transition-all duration-300 ${menuAbierto ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block h-[2px] w-5 bg-current transition-all duration-300 ${menuAbierto ? "opacity-0" : ""}`} />
              <span className={`block h-[2px] w-5 bg-current transition-all duration-300 ${menuAbierto ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </span>
            <span className="text-xs tracking-[0.2em] uppercase font-semibold">
              {menuAbierto ? "Cerrar" : "Menú"}
            </span>
          </button>
        </div>

        {/* Fila 2: enlaces — solo escritorio */}
        <nav className="hidden md:block border-t border-linea">
          <ul className="flex items-center gap-8 py-3">
            {enlaces.map(({ href, label }) => {
              const activo = esActivo(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={activo ? "page" : undefined}
                    className={`text-sm tracking-[0.12em] uppercase transition-colors ${
                      activo
                        ? "text-granate border-b-2 border-granate pb-1"
                        : "text-tinta-suave hover:text-tinta"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Menú desplegable móvil — enlaces grandes */}
      {menuAbierto && (
        <nav className="md:hidden bg-hueso border-t border-linea">
          <ul className="flex flex-col py-2">
            {enlaces.map(({ href, label }) => {
              const activo = esActivo(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuAbierto(false)}
                    aria-current={activo ? "page" : undefined}
                    className={`flex items-center gap-3 px-6 py-4 text-base tracking-[0.08em] uppercase border-b border-linea/60 transition-colors ${
                      activo ? "text-granate font-semibold" : "text-tinta hover:text-granate"
                    }`}
                  >
                    {activo && <span className="block w-2 h-2 rounded-full bg-granate shrink-0" aria-hidden="true" />}
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
