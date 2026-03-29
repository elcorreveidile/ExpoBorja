import Image from "next/image";
import Link from "next/link";

const obras = [
  {
    slug: "republica",
    titulo: "República",
    imagen: "/obras/republica.jpg",
    tecnica: "Óleo sobre tabla",
    descripcion: "Una figura femenina sostiene en alto la palabra República mientras se alza sobre una masa de cráneos. Potente alegoría de la memoria histórica y la lucha por la dignidad.",
  },
  {
    slug: "multitud",
    titulo: "La Multitud",
    imagen: "/obras/multitud.jpg",
    tecnica: "Óleo sobre tabla",
    descripcion: "Una muchedumbre densa se agolpa ante la figura de la muerte. La escena mezcla lo cotidiano con lo existencial en un espacio azul y amarillo de resonancias expresionistas.",
  },
  {
    slug: "calle",
    titulo: "Calle",
    imagen: "/obras/calle.jpg",
    tecnica: "Óleo sobre cartón",
    descripcion: "Dos figuras avanzan por una calle de tonos azules y cálidos. El movimiento pausado y los colores vibrantes evocan el tiempo detenido de la vida ordinaria.",
  },
  {
    slug: "espejo",
    titulo: "El Espejo",
    imagen: "/obras/espejo.jpg",
    tecnica: "Óleo sobre cartón",
    descripcion: "Una mujer de amarillo y su reflejo en un espacio surreal. La identidad, el doble y el deseo se entrecruzan en tonos verdes y ocres de gran intensidad.",
  },
  {
    slug: "monjas",
    titulo: "Monjas",
    imagen: "/obras/monjas.jpg",
    tecnica: "Óleo sobre cartón",
    descripcion: "Religiosas y figuras desnudas habitan mundos paralelos separados por un umbral. El diálogo entre lo sagrado y lo carnal, marca constante en la obra de Satrústegui.",
  },
];

export default function Galeria() {
  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      {/* Encabezado */}
      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.4em] text-[#c8962a] uppercase mb-4">Obra pictórica</p>
        <h1
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-4xl md:text-5xl text-[#ede4d2] font-normal mb-4"
        >
          Galería
        </h1>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c8962a] to-transparent mx-auto mb-6" />
        <p className="text-[#9e8e78] max-w-xl mx-auto text-sm leading-relaxed">
          Óleos sobre tabla y cartón. Una exploración entre el realismo social, el costumbrismo y el surrealismo desde la mirada de Borja Satrústegui.
        </p>
      </div>

      {/* Grid de obras */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {obras.map((obra, i) => (
          <article
            key={obra.slug}
            className={`group flex flex-col bg-[#1a150d] border border-[#2e2416] overflow-hidden ${
              i === 0 ? "md:col-span-2" : ""
            }`}
          >
            <div className={`relative overflow-hidden ${i === 0 ? "aspect-video" : "aspect-square"}`}>
              <Image
                src={obra.imagen}
                alt={obra.titulo}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a150d]/80 via-transparent to-transparent" />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-xl text-[#ede4d2] italic"
                  >
                    {obra.titulo}
                  </h2>
                  <span className="text-xs tracking-widest text-[#c8962a] uppercase whitespace-nowrap mt-1">
                    {obra.tecnica}
                  </span>
                </div>
                <p className="text-sm text-[#9e8e78] leading-relaxed">{obra.descripcion}</p>
              </div>
              <div className="mt-6 flex gap-4">
                <Link
                  href="/tienda"
                  className="text-xs tracking-[0.15em] uppercase text-[#c8962a] border border-[#c8962a]/40 px-4 py-2 hover:bg-[#c8962a] hover:text-[#0c0b09] transition-all duration-300"
                >
                  Adquirir
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
