import Image from "next/image";
import Link from "next/link";

export default function Exposicion() {
  return (
    <div className="pt-24 pb-20">
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
        {/* Cartel */}
        <div className="relative">
          <div className="relative aspect-[3/4] overflow-hidden border border-[#2e2416] shadow-2xl">
            <Image
              src="/cartel/cartel.jpg"
              alt="Cartel de la exposición"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-3 -right-3 w-full h-full border border-[#c8962a]/20 -z-10" />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-8 pt-4">
          <div>
            <p className="text-xs tracking-[0.3em] text-[#c8962a] uppercase mb-3">Fechas</p>
            <p
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-3xl text-[#ede4d2] mb-2"
            >
              Del 6 al 19 de abril
            </p>
            <p className="text-sm text-[#9e8e78]">Entrada libre · Horario de apertura del Centro</p>
          </div>

          <div className="w-full h-px bg-[#2e2416]" />

          <div>
            <p className="text-xs tracking-[0.3em] text-[#c8962a] uppercase mb-3">Lugar</p>
            <p
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-xl text-[#ede4d2] mb-2"
            >
              Centro Cívico del Albayzín
            </p>
            <p className="text-sm text-[#9e8e78] leading-relaxed">
              Plaza Aliatar<br />
              Granada<br />
              Ayuntamiento de Granada
            </p>
          </div>

          <div className="w-full h-px bg-[#2e2416]" />

          <div>
            <p className="text-xs tracking-[0.3em] text-[#c8962a] uppercase mb-3">Sobre la muestra</p>
            <p className="text-sm text-[#9e8e78] leading-relaxed">
              Una selección de óleos sobre tabla y cartón que recorre los grandes temas de la obra de Satrústegui: la memoria histórica, la crítica social, el surrealismo cotidiano y la condición humana. Figuras densas y atmósferas que no dejan indiferente.
            </p>
          </div>

          <Link
            href="/tienda"
            className="inline-block px-8 py-3 bg-[#c8962a] text-[#0c0b09] text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#e2b24a] transition-all duration-300 text-center"
          >
            Adquirir obra
          </Link>
        </div>
      </div>

      {/* VÍDEO */}
      <div className="bg-[#1a150d] border-t border-b border-[#2e2416] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] text-[#c8962a] uppercase mb-3">El pintor en vídeo</p>
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-3xl text-[#ede4d2]"
            >
              Borja Satrústegui
            </h2>
          </div>
          <div className="relative aspect-video overflow-hidden border border-[#2e2416] shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/_ehRqUgG34c"
              title="Borja Satrústegui — Pintor"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Mapa */}
      <div className="max-w-4xl mx-auto px-6 pt-16">
        <div className="text-center mb-8">
          <p className="text-xs tracking-[0.3em] text-[#c8962a] uppercase mb-3">Cómo llegar</p>
          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-2xl text-[#ede4d2]"
          >
            Centro Cívico del Albayzín
          </h2>
          <p className="text-sm text-[#9e8e78] mt-2">Plaza Aliatar, Granada</p>
        </div>
        <div className="relative aspect-video overflow-hidden border border-[#2e2416]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3178.4!2d-3.593!3d37.181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd71fce7d3c8b7a7%3A0x0!2sPlaza+Aliatar%2C+Granada!5e0!3m2!1ses!2ses!4v1"
            title="Mapa Centro Cívico del Albayzín"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full grayscale"
          />
        </div>
      </div>
    </div>
  );
}
