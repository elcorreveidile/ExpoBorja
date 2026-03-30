import Image from "next/image";
import Link from "next/link";

const obras = [
  { slug: "puente",    titulo: "El Puente",       imagen: "/obras/puente.jpg",    tecnica: "sobre lienzo" },
  { slug: "justicia",  titulo: "Justicia Social", imagen: "/obras/justicia.jpg",  tecnica: "sobre lienzo" },
  { slug: "arlequin",  titulo: "El Arlequín",     imagen: "/obras/arlequin.jpg",  tecnica: "sobre lienzo" },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/cartel/cartel.jpg"
            alt="Exposición Borja Satrústegui"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0b09]/70 via-[#0c0b09]/50 to-[#0c0b09]" />
          <div className="absolute inset-0 bg-[#0c0b09]/30" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c8962a] mb-6 font-light">
            Exposición de Pintura
          </p>
          <h1
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-5xl md:text-7xl lg:text-8xl font-normal text-[#ede4d2] leading-tight mb-4"
          >
            Borja<br />
            <span className="italic text-[#c8962a]">Satrústegui</span>
          </h1>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c8962a] to-transparent mx-auto my-8" />
          <p className="text-sm md:text-base tracking-[0.15em] text-[#b8aa96] uppercase mb-2">
            Del 6 al 19 de abril
          </p>
          <p className="text-sm text-[#9e8e78] tracking-wide mb-12">
            Centro Cívico del Albayzín · Plaza Aliatar · Granada
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/galeria"
              className="inline-block px-8 py-3 border border-[#c8962a] text-[#c8962a] text-xs tracking-[0.2em] uppercase hover:bg-[#c8962a] hover:text-[#0c0b09] transition-all duration-300"
            >
              Ver Galería
            </Link>
            <Link
              href="/tienda"
              className="inline-block px-8 py-3 bg-[#c8962a] text-[#0c0b09] text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#e2b24a] transition-all duration-300"
            >
              Adquirir Obra
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[10px] tracking-[0.3em] text-[#6a5e50] uppercase">Descubrir</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#c8962a] to-transparent" />
        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <p className="text-xs tracking-[0.3em] text-[#c8962a] uppercase mb-6">El pintor</p>
        <h2
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-3xl md:text-4xl text-[#ede4d2] font-normal leading-snug mb-8"
        >
          Realismo social, atmósferas densas<br />
          <span className="italic text-[#b8aa96]">y una mirada que no aparta los ojos</span>
        </h2>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c8962a] to-transparent mx-auto" />
        <p className="mt-8 text-[#9e8e78] leading-relaxed max-w-2xl mx-auto">
          Nacido en San Sebastián en 1943 y afincado en Granada desde hace más de treinta años,
          Borja Satrústegui pinta sobre tabla y cartón con una libertad heredera de Solana y Goya.
          Sus obras habitan entre el costumbrismo urbano y el surrealismo, con figuras que cargan
          el peso del mundo cotidiano.
        </p>
        <Link
          href="/sobre-borja"
          className="inline-block mt-8 text-xs tracking-[0.2em] uppercase text-[#c8962a] border-b border-[#c8962a]/40 pb-0.5 hover:border-[#c8962a] transition-colors"
        >
          Leer más sobre Borja
        </Link>
      </section>

      {/* OBRAS DESTACADAS */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] text-[#c8962a] uppercase mb-3">Selección de obras</p>
          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl text-[#ede4d2]"
          >
            Galería
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {obras.map((obra) => (
            <Link key={obra.slug} href="/galeria" className="group relative block overflow-hidden bg-[#1a150d]">
              <div className="relative aspect-square">
                <Image
                  src={obra.imagen}
                  alt={obra.titulo}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#0c0b09]/0 group-hover:bg-[#0c0b09]/60 transition-all duration-500 flex items-end">
                  <div className="p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      className="text-[#ede4d2] text-lg italic"
                    >
                      {obra.titulo}
                    </p>
                    <p className="text-[#c8962a] text-xs tracking-widest uppercase mt-1">
                      Óleo · {obra.tecnica}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/galeria"
            className="inline-block px-8 py-3 border border-[#2e2416] text-[#9e8e78] text-xs tracking-[0.2em] uppercase hover:border-[#c8962a] hover:text-[#c8962a] transition-all duration-300"
          >
            Ver galería completa
          </Link>
        </div>
      </section>

      {/* EXPOSICIÓN BANNER */}
      <section className="my-20">
        <div className="bg-[#1a150d] border-t border-b border-[#2e2416] py-16 px-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            <div>
              <p className="text-xs tracking-[0.3em] text-[#c8962a] uppercase mb-3">Exposición</p>
              <h2
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-3xl md:text-4xl text-[#ede4d2] mb-4"
              >
                Del 6 al 19 de abril
              </h2>
              <p className="text-[#9e8e78] text-sm leading-relaxed">
                Centro Cívico del Albayzín<br />
                Plaza Aliatar · Granada<br />
                Ayuntamiento de Granada
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Link
                href="/exposicion"
                className="inline-block px-8 py-3 border border-[#c8962a] text-[#c8962a] text-xs tracking-[0.2em] uppercase hover:bg-[#c8962a] hover:text-[#0c0b09] transition-all duration-300 text-center"
              >
                Más información
              </Link>
              <Link
                href="/tienda"
                className="inline-block px-8 py-3 bg-[#c8962a] text-[#0c0b09] text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#e2b24a] transition-all duration-300 text-center"
              >
                Tienda online
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
