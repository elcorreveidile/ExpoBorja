"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const enlaces = [
  { href: "/", label: "Inicio" },
  { href: "/galeria", label: "Galería" },
  { href: "/exposicion", label: "Exposición" },
  { href: "/sobre-borja", label: "Sobre Borja" },
  { href: "/tienda", label: "Tienda" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = menuAbierto ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuAbierto]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0c0b09]/95 backdrop-blur-sm border-b border-[#2e2416]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex flex-col leading-none drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
          >
            <span
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-lg font-semibold tracking-wide text-[#ede4d2] group-hover:text-[#c8962a] transition-colors duration-300"
            >
              Borja Satrústegui
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#c8962a] uppercase font-light">
              Pintor
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {enlaces.map(({ href, label }) => {
              const activo = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`text-xs tracking-[0.15em] uppercase transition-colors duration-300 ${
                      activo
                        ? "text-[#c8962a] border-b border-[#c8962a] pb-0.5"
                        : "text-[#b8aa96] hover:text-[#ede4d2]"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Botón hamburguesa móvil */}
          <button
            onClick={() => setMenuAbierto(true)}
            className="md:hidden flex flex-col justify-center gap-[5px] w-10 h-10 items-end"
            aria-label="Abrir menú"
          >
            <span className="block h-[2px] w-6 bg-[#c8962a] drop-shadow-[0_1px_2px_rgba(0,0,0,1)]" />
            <span className="block h-[2px] w-4 bg-[#c8962a] drop-shadow-[0_1px_2px_rgba(0,0,0,1)]" />
            <span className="block h-[2px] w-6 bg-[#c8962a] drop-shadow-[0_1px_2px_rgba(0,0,0,1)]" />
          </button>
        </nav>
      </header>

      {/* Overlay oscuro */}
      {menuAbierto && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMenuAbierto(false)}
        />
      )}

      {/* Panel lateral derecho */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-[70] bg-[#0e0c08] border-l border-[#2e2416] flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          menuAbierto ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Cabecera del panel */}
        <div className="flex items-center justify-between px-7 py-6 border-b border-[#2e2416]">
          <span
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-sm italic text-[#9e8e78]"
          >
            Navegación
          </span>
          <button
            onClick={() => setMenuAbierto(false)}
            aria-label="Cerrar menú"
            className="w-8 h-8 flex items-center justify-center text-[#9e8e78] hover:text-[#ede4d2] transition-colors text-xl"
          >
            ✕
          </button>
        </div>

        {/* Links */}
        <ul className="flex flex-col mt-4 flex-1">
          {enlaces.map(({ href, label }) => {
            const activo = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuAbierto(false)}
                  className={`flex items-center justify-between px-7 py-4 text-sm tracking-[0.18em] uppercase transition-colors border-b border-[#1e1a12] ${
                    activo
                      ? "text-[#c8962a]"
                      : "text-[#b8aa96] hover:text-[#ede4d2] hover:bg-[#1a150d]"
                  }`}
                >
                  {label}
                  {activo && (
                    <span className="block w-1.5 h-1.5 rounded-full bg-[#c8962a]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Pie del panel */}
        <div className="px-7 py-6 border-t border-[#2e2416]">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#5a4e3e]">
            Exposición · 6–19 abril
          </p>
          <p className="text-xs text-[#5a4e3e] mt-1">Centro Cívico del Albayzín</p>
        </div>
      </div>
    </>
  );
}
