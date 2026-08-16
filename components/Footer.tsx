import Link from "next/link";

const navegacion = [
  { href: "/obra-nueva", label: "Obra nueva" },
  { href: "/obra-antigua", label: "Obra antigua" },
  { href: "/disponibles", label: "Obra disponible" },
  { href: "/sobre-borja", label: "Sobre Borja" },
  { href: "/contacto", label: "Contacto" },
];

export default function Footer() {
  return (
    <footer className="border-t border-linea bg-superficie mt-auto">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-display text-xl text-tinta mb-2">Borja Satrústegui</h3>
            <p className="text-xs tracking-[0.25em] text-ocre uppercase mb-4">Pintor</p>
            <p className="text-tinta-suave leading-relaxed">
              Obra pictórica que entrelaza el realismo social con el expresionismo,
              desde San Sebastián hasta Granada.
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-ocre mb-4">El artista</h4>
            <p className="text-tinta-suave leading-relaxed">
              Nacido en San Sebastián en 1943.<br />
              Afincado en Granada desde hace más de tres décadas.<br />
              Realismo social y expresionismo.
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-ocre mb-4">Navegación</h4>
            <ul className="flex flex-col gap-2.5">
              {navegacion.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-tinta-suave hover:text-granate transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-linea flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-tinta-tenue">
            © {new Date().getFullYear()} Borja Satrústegui. Todos los derechos reservados.
          </p>
          <Link href="/contacto" className="text-sm tracking-[0.12em] uppercase text-tinta-suave hover:text-granate transition-colors">
            Contacto
          </Link>
        </div>
      </div>
    </footer>
  );
}
