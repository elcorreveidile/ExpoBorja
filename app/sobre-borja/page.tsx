import Image from "next/image";
import Link from "next/link";

export default function SobreBorja() {
  return (
    <div className="pt-24 pb-20 px-6">
      {/* Encabezado */}
      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.4em] text-[#c8962a] uppercase mb-4">Biografía</p>
        <h1
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-4xl md:text-5xl text-[#ede4d2] font-normal mb-4"
        >
          Sobre Borja
        </h1>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c8962a] to-transparent mx-auto" />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Intro con imagen */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-20">
          <div className="relative">
            <div className="relative aspect-[3/4] overflow-hidden border border-[#2e2416]">
              <Image
                src="/obras/republica.jpg"
                alt="Obra de Borja Satrústegui"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-3 -left-3 w-full h-full border border-[#2e2416] -z-10" />
          </div>

          <div className="flex flex-col gap-8 pt-4">
            <div>
              <p className="text-xs tracking-[0.3em] text-[#c8962a] uppercase mb-4">San Sebastián, 1943</p>
              <h2
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-2xl text-[#ede4d2] mb-6"
              >
                Un pintor entre dos mundos
              </h2>
              <div className="space-y-4 text-sm text-[#9e8e78] leading-relaxed">
                <p>
                  Borja Satrústegui nació en San Sebastián en 1943. Estudió en la Escuela de Bellas Artes de San Fernando y en el Círculo de Bellas Artes de Madrid, formándose en el corazón de la tradición pictórica española.
                </p>
                <p>
                  Hace más de tres décadas decidió establecerse en Granada, ciudad que ha marcado profundamente su obra. Desde el Albayzín contempla el mundo con una mirada que no concede concesiones: el arte como testimonio, nunca como decoración.
                </p>
              </div>
            </div>

            <div className="border-t border-[#2e2416] pt-6">
              <p className="text-xs tracking-[0.3em] text-[#c8962a] uppercase mb-4">Colecciones</p>
              <p className="text-sm text-[#9e8e78] leading-relaxed">
                Su obra forma parte de la colección permanente del <strong className="text-[#b8aa96]">Museo Nacional Centro de Arte Reina Sofía</strong>, uno de los principales museos de arte contemporáneo del mundo.
              </p>
            </div>
          </div>
        </div>

        {/* Estilo */}
        <div className="bg-[#1a150d] border border-[#2e2416] p-8 md:p-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-xs tracking-[0.3em] text-[#c8962a] uppercase mb-4">Técnica</p>
              <p className="text-sm text-[#9e8e78] leading-relaxed">
                Óleos sobre tabla y cartón. Pinceles libres y seguros que aplican la materia con consciencia y atrevimiento. Una pincelada heredera de Solana y con ecos de Goya.
              </p>
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] text-[#c8962a] uppercase mb-4">Temática</p>
              <p className="text-sm text-[#9e8e78] leading-relaxed">
                Escenas urbanas, multitudes, la muerte, lo sagrado y lo profano. Figuras cansadas que cargan con el peso de la Historia. Surrealismo cotidiano con raíces en el realismo social más honesto.
              </p>
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] text-[#c8962a] uppercase mb-4">Influencias</p>
              <p className="text-sm text-[#9e8e78] leading-relaxed">
                José Gutiérrez Solana, Francisco de Goya, la tradición pictórica vasca y la luz peculiar de Andalucía. Una síntesis entre el Norte y el Sur de España.
              </p>
            </div>
          </div>
        </div>

        {/* Cita */}
        <blockquote className="text-center py-12">
          <div className="w-8 h-px bg-[#c8962a] mx-auto mb-6" />
          <p
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-2xl md:text-3xl italic text-[#b8aa96] leading-relaxed max-w-3xl mx-auto"
          >
            &ldquo;Sus lienzos recogen lo mejor de la tradición norteña con la fuerza de los cuadros negros, plasmando escenas cotidianas desde la sórdida realidad de cuerpos y rostros cansados.&rdquo;
          </p>
          <div className="w-8 h-px bg-[#c8962a] mx-auto mt-6" />
        </blockquote>

        {/* CTA */}
        <div className="text-center mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/galeria"
            className="inline-block px-8 py-3 border border-[#c8962a] text-[#c8962a] text-xs tracking-[0.2em] uppercase hover:bg-[#c8962a] hover:text-[#0c0b09] transition-all duration-300"
          >
            Ver galería
          </Link>
          <Link
            href="/exposicion"
            className="inline-block px-8 py-3 bg-[#c8962a] text-[#0c0b09] text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#e2b24a] transition-all duration-300"
          >
            Ver exposición
          </Link>
        </div>
      </div>

      {/* SECCIÓN REINA SOFÍA */}
      <div className="max-w-5xl mx-auto mt-20">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] text-[#c8962a] uppercase mb-3">Colección permanente</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-3xl text-[#ede4d2]">
            Museo Nacional Centro de Arte Reina Sofía
          </h2>
          <p className="text-sm text-[#9e8e78] mt-2">Madrid, 1958–2018</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start bg-[#1a150d] border border-[#2e2416] p-8 md:p-10">
          {/* Imagen de la obra */}
          <div>
            <div className="relative aspect-[4/3] overflow-hidden border border-[#2e2416]">
              <Image
                src="/obras/vaqueria.jpg"
                alt="Tableros del bar La Vaquería de la calle Libertad — Borja Satrústegui"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Ficha y texto */}
          <div className="flex flex-col gap-5">
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-xl italic text-[#ede4d2] mb-1">
                Tableros del bar La Vaquería<br />de la calle Libertad
              </h3>
              <p className="text-xs tracking-widest text-[#c8962a] uppercase mb-3">1976</p>
              <p className="text-xs text-[#6a5e50] leading-relaxed mb-1">
                Acrílico, tinta negra a rotulador, lápiz y lápiz de color sobre aglomerado
              </p>
              <p className="text-xs text-[#6a5e50] leading-relaxed">
                Donación de Fundación CEDCS (Centro Europeo para la Difusión de las Ciencias Sociales), 2022
              </p>
            </div>

            <div className="w-full h-px bg-[#2e2416]" />

            <p className="text-sm text-[#9e8e78] leading-relaxed">
              La Vaquería, ubicada en la calle Libertad de Madrid, fue un bar frecuentado por la bohemia contracultural que ofrecía, tal como anunciaba su entrada, «pintura, música, poesía, güisqui y bocadillos». En la madrugada del 8 de junio de 1976 sufrió un atentado con bomba perpetrado por el grupo fascista Guerrilleros de Cristo Rey, que dejó parcialmente destruido el local.
            </p>
            <p className="text-sm text-[#9e8e78] leading-relaxed">
              En respuesta, Cesepe y Borja Satrústegui realizaron unos nuevos paneles de aglomerado pintados para proteger las puertas, creando un lenguaje cercano al informalismo central. Meses después, estos mismos paneles fueron nuevamente atacados por los Guerrilleros con disparos de arma de fuego, cuyos impactos aún son visibles.
            </p>
            <p className="text-sm text-[#9e8e78] leading-relaxed">
              La obra desbordó los espacios institucionales para habitar bares, portadas de discos, películas y revistas, convirtiéndose en un símbolo de la <em>Movida</em> madrileña.
            </p>

            <a
              href="https://www.museoreinasofia.es/colecciones/artista/satrustegui-borja"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs tracking-[0.2em] uppercase text-[#c8962a] border border-[#c8962a]/40 px-4 py-2 hover:bg-[#c8962a] hover:text-[#0c0b09] transition-all duration-300 text-center"
            >
              Ver en el Reina Sofía →
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
