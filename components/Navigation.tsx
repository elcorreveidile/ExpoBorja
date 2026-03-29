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
        <Link href="/" className="group flex flex-col leading-none">
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

        {/* Mobile burger */}
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Abrir menú"
        >
          <span className={`block h-px w-6 bg-[#c8962a] transition-all duration-300 ${menuAbierto ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-px w-6 bg-[#c8962a] transition-all duration-300 ${menuAbierto ? "opacity-0" : ""}`} />
          <span className={`block h-px w-6 bg-[#c8962a] transition-all duration-300 ${menuAbierto ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuAbierto && (
        <div className="md:hidden bg-[#0c0b09]/98 border-t border-[#2e2416]">
          <ul className="flex flex-col py-6">
            {enlaces.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuAbierto(false)}
                  className="block px-8 py-4 text-sm tracking-[0.2em] uppercase text-[#b8aa96] hover:text-[#c8962a] transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
