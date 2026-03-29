import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#2e2416] bg-[#0c0b09] mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Identidad */}
          <div>
            <h3
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-lg text-[#ede4d2] mb-3"
            >
              Borja Satrústegui
            </h3>
            <p className="text-xs tracking-[0.2em] text-[#c8962a] uppercase mb-4">Pintor</p>
            <p className="text-sm text-[#9e8e78] leading-relaxed">
              Obra pictórica que entrelaza el realismo social con el expresionismo, desde San Sebastián hasta Granada.
            </p>
          </div>

          {/* Exposición */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-[#c8962a] mb-4">Exposición</h4>
            <p className="text-sm text-[#b8aa96] leading-relaxed">
              Del 6 al 19 de abril<br />
              Centro Cívico del Albayzín<br />
              Plaza Aliatar, Granada<br />
              Ayuntamiento de Granada
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-[#c8962a] mb-4">Navegación</h4>
            <ul className="space-y-2">
              {[
                { href: "/galeria", label: "Galería" },
                { href: "/exposicion", label: "Exposición" },
                { href: "/sobre-borja", label: "Sobre Borja" },
                { href: "/tienda", label: "Tienda" },
                { href: "/contacto", label: "Contacto" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#9e8e78] hover:text-[#c8962a] transition-colors duration-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#2e2416] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6a5e50] tracking-wide">
            © {new Date().getFullYear()} Borja Satrústegui. Todos los derechos reservados.
          </p>
          <Link
            href="/contacto"
            className="text-xs tracking-[0.15em] uppercase text-[#9e8e78] hover:text-[#c8962a] transition-colors"
          >
            Contacto
          </Link>
        </div>
      </div>
    </footer>
  );
}
