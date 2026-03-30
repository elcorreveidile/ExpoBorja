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

  return (
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

        {/* Botón menú móvil */}
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="md:hidden flex items-center gap-2 px-3 py-2 bg-[#0c0b09]/85 border border-[#c8962a]/50 hover:border-[#c8962a] transition-colors duration-200"
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
        >
          <span className="flex flex-col gap-[5px]">
            <span className={`block h-[2px] bg-[#c8962a] transition-all duration-300 ${menuAbierto ? "w-5 rotate-45 translate-y-[7px]" : "w-5"}`} />
            <span className={`block h-[2px] bg-[#c8962a] transition-all duration-300 ${menuAbierto ? "opacity-0 w-5" : "w-3"}`} />
            <span className={`block h-[2px] bg-[#c8962a] transition-all duration-300 ${menuAbierto ? "w-5 -rotate-45 -translate-y-[7px]" : "w-5"}`} />
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#c8962a] font-medium">
            {menuAbierto ? "Cerrar" : "Menú"}
          </span>
        </button>
      </nav>

      {/* Menú desplegable móvil — solo existe en el DOM cuando está abierto */}
      {menuAbierto && (
        <div className="md:hidden bg-[#0c0b09] border-t border-[#2e2416]">
          <ul className="flex flex-col py-4">
            {enlaces.map(({ href, label }) => {
              const activo = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuAbierto(false)}
                    className={`flex items-center gap-3 px-8 py-4 text-sm tracking-[0.2em] uppercase transition-colors ${
                      activo
                        ? "text-[#c8962a]"
                        : "text-[#b8aa96] hover:text-[#ede4d2]"
                    }`}
                  >
                    {activo && (
                      <span className="block w-1.5 h-1.5 rounded-full bg-[#c8962a] shrink-0" />
                    )}
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
