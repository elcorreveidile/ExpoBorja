import Image from "next/image";
import Link from "next/link";

export default function SobreBorja() {
  return (
    <div className="pt-32 pb-20 px-6">
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

        {/* FOTOS DEL ARTISTA */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <p className="text-xs tracking-[0.3em] text-[#c8962a] uppercase mb-3">El artista</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-2xl text-[#ede4d2]">
              Borja Satrústegui en la galería
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
            <div className="relative">
              <div className="relative aspect-[3/4] overflow-hidden border border-[#2e2416]">
                <Image
                  src="/borja-foto-1.jpg"
                  alt="Borja Satrústegui en la galería"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[3/4] overflow-hidden border border-[#2e2416]">
                <Image
                  src="/borja-foto-2.jpg"
                  alt="Borja Satrústegui sonriendo en la galería"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[3/4] overflow-hidden border border-[#2e2416]">
                <Image
                  src="/borja-foto-4.jpg"
                  alt="Borja Satrústegui en la galería"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[3/4] overflow-hidden border border-[#2e2416]">
                <Image
                  src="/borja-foto-3.png"
                  alt="Borja Satrústegui con su obra"
                  fill
                  className="object-cover object-center"
                />
              </div>
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

      {/* SECCIÓN ARTÍCULO */}
      <div className="max-w-5xl mx-auto mt-20">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] text-[#c8962a] uppercase mb-3">Prensa</p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-3xl text-[#ede4d2]">
            La pintura contemporánea en Granada
          </h2>
          <p className="text-sm text-[#9e8e78] mt-2">De Borja Satrústegui a Paula Cervilla</p>
          <p className="text-xs text-[#6a5e50] mt-1">Por Luis Pablo Núñez | Publicada viernes, 8 de abril de 2022</p>
        </div>

        <div className="bg-[#1a150d] border border-[#2e2416] p-8 md:p-10">
          <div className="relative aspect-[3/2] overflow-hidden border border-[#2e2416] mb-8">
            <Image
              src="/articulo-granada.jpg"
              alt="Artículo sobre pintura contemporánea en Granada"
              fill
              className="object-cover"
            />
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-sm text-[#9e8e78] leading-relaxed mb-4">
              Borja Satrústegui nació en San Sebastián en 1943: tiene la edad de mi padre y, a pesar del bastón, un porte recio (como que es del norte…). Estudió en la Escuela de Bellas Artes de San Fernando y en el Círculo de Bellas Artes de Madrid, pero optó por la vida bohemia, como pintor anarquista, republicano, viviendo durante unos meses en los campamentos de refugiados saharauis del Frente Polisario, otros en Orán, después en Portugalete y, durante otros años, en un velero, me dice, para llegar luego a su casa del Albaicín.
            </p>
            <p className="text-sm text-[#9e8e78] leading-relaxed mb-4">
              La pintura es su modo de vida y no le importa estar lejos del circuito académico, aunque su obra merece estarlo. Granada cuenta con otros lugares para el desarrollo del arte: además de los centros de formación (la Facultad de Bellas Artes y la Escuela de Artes y Oficios), existe una Real Academia de Bellas Artes de Granada, creada en 1777 (recientemente se hizo una exposición con algunos de sus fondos, del 16/12/21 al 30/01/22, en la Sala de exposiciones del Centro Cultural Gran Capitán) y el Centro Artístico, Literario y Científico de Granada.
            </p>
            <p className="text-sm text-[#9e8e78] leading-relaxed mb-4">
              El Centro José Guerrero, por su parte, realiza exposiciones temporales de pintura, fotografía y nuevos medios que se suman al legado del pintor que allí se conserva. El Centro Lorca (sin olvidarnos de su casa natal y de la Casa-Museo Huerta de San Vicente), del mismo modo, promueve la difusión del archivo con exposiciones. La Fundación CajaGranada cuenta con una colección artística interesante y exposiciones regulares relevantes, como la realizada hace poco sobre Mariano Fortuny y Madrazo, francamente interesante.
            </p>
            <p className="text-sm text-[#9e8e78] leading-relaxed mb-4">
              La Universidad de Granada (UGR) es una de las grandes dinamizadoras de vida cultural en la ciudad: desde marzo a mayo de 2022 se pueden ver obras de primer nivel para la exposición «Zuloaga, entre lo gitano y el flamenco» y, desde abril, la exposición con obras de Manuel Ángeles Ortiz sobre el Albaicín: Obsesión (con su serie «Albaicines») en el Palacio del Almirante.
            </p>
            <p className="text-sm text-[#9e8e78] leading-relaxed">
              Basten estos ejemplos para mostrar que Granada es más que la Alhambra y el arte hispanomusulmán, reconocido con justicia. También debe promoverse el arte actual: a fin de cuentas, el arte de este siglo no puede sino reflejar las circunstancias que estamos viviendo y, como decía una publicidad de una de las exposiciones arriba indicadas, hay que comprar a los artistas vivos, pues los muertos ya no necesitan dinero…
            </p>
          </div>
        </div>
      </div>

      {/* LLAMAMIENTO - BUSCAMOS SUS OBRAS */}
      <div className="max-w-5xl mx-auto mt-20">
        <div className="bg-gradient-to-br from-[#c8962a]/10 to-transparent border-2 border-[#c8962a]/30 p-8 md:p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-[#c8962a]/20 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🔍</span>
          </div>

          <p className="text-xs tracking-[0.3em] text-[#c8962a] uppercase mb-4">Ayúdanos a documentar su obra</p>

          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-2xl md:text-3xl text-[#ede4d2] mb-6"
          >
            ¿Tienes un cuadro de Borja Satrústegui?
          </h2>

          <p className="text-sm text-[#9e8e78] leading-relaxed mb-8 max-w-2xl mx-auto">
            La obra de Borja Satrústegui está muy dispersa y no sabemos dónde pueden estar todos sus originales.
            Si tienes algún cuadro suyo, nos gustaría muchísimo que nos enviaras una foto. Ayúdanos a documentar
            y preservar el legado artístico de este pintor granadino.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contacto"
              className="inline-block px-8 py-4 bg-[#c8962a] text-[#0c0b09] text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#e2b24a] transition-all duration-300"
            >
              Enviar foto del cuadro
            </Link>
            <span className="text-xs text-[#6a5e50]">
              📸 Responde en menos de 48h
            </span>
          </div>

          <p className="text-xs text-[#6a5e50] mt-6 italic">
            "Hay que comprar a los artistas vivos, pues los muertos ya no necesitan dinero…"
          </p>
        </div>
      </div>

    </div>
  );
}
