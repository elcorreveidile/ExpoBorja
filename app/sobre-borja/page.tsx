import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre Borja",
  description:
    "Biografía de Borja Satrústegui, pintor de realismo social y expresionismo nacido en San Sebastián en 1943 y afincado en Granada.",
};

export default function SobreBorja() {
  return (
    <div className="pt-16 pb-24 px-5 sm:px-6">
      <header className="text-center mb-16">
        <p className="text-xs tracking-[0.32em] text-ocre uppercase font-semibold mb-4">Biografía</p>
        <h1 className="text-4xl sm:text-5xl text-tinta">Sobre Borja</h1>
        <div className="filete mx-auto mt-6" />
      </header>

      <div className="max-w-5xl mx-auto">
        {/* Intro con obra La República */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start mb-20">
          <Link href="/obra/republica" className="group block relative aspect-[3/4] max-w-[280px] mx-auto md:mx-0 border border-linea bg-hueso overflow-hidden">
            <Image
              src="/obras/republica.jpg"
              alt="«República», obra de Borja Satrústegui"
              fill
              sizes="(max-width: 768px) 80vw, 280px"
              className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs tracking-[0.1em] uppercase text-tinta-tenue bg-hueso/85 border border-linea px-2 py-0.5">Ver obra</span>
          </Link>

          <div className="flex flex-col gap-8">
            <div>
              <p className="text-xs tracking-[0.3em] text-ocre uppercase font-semibold mb-3">San Sebastián, 1943</p>
              <h2 className="text-2xl sm:text-3xl text-tinta mb-5">Un pintor entre dos mundos</h2>
              <div className="flex flex-col gap-4 text-tinta-suave leading-relaxed">
                <p>
                  Borja Satrústegui nació en San Sebastián en 1943. Estudió en la Escuela de Bellas
                  Artes de San Fernando y en el Círculo de Bellas Artes de Madrid, formándose en el
                  corazón de la tradición pictórica española.
                </p>
                <p>
                  Hace más de tres décadas decidió establecerse en Granada, ciudad que ha marcado
                  profundamente su obra. Desde el Albayzín contempla el mundo con una mirada que no
                  hace concesiones: el arte como testimonio, nunca como decoración.
                </p>
              </div>
            </div>
            <div className="border-t border-linea pt-6">
              <p className="text-xs tracking-[0.3em] text-ocre uppercase font-semibold mb-3">Colecciones</p>
              <p className="text-tinta-suave leading-relaxed">
                Su obra forma parte de la colección del{" "}
                <strong className="text-tinta">Museo Nacional Centro de Arte Reina Sofía</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Fotos del artista */}
        <section className="mb-20">
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="relative aspect-[3/4] border border-linea overflow-hidden">
              <Image src="/borja-foto-1.jpg" alt="Borja Satrústegui" fill sizes="(max-width: 768px) 50vw, 320px" className="object-cover object-top" />
            </div>
            <div className="relative aspect-[3/4] border border-linea overflow-hidden">
              <Image src="/borja-foto-3.png" alt="Borja Satrústegui con su obra" fill sizes="(max-width: 768px) 50vw, 320px" className="object-cover object-center" />
            </div>
          </div>
        </section>

        {/* Técnica / Temática / Influencias */}
        <section className="bg-superficie border border-linea p-8 md:p-12 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-xs tracking-[0.3em] text-ocre uppercase font-semibold mb-3">Técnica</p>
              <p className="text-tinta-suave leading-relaxed">
                Óleos sobre tabla y cartón. Pinceladas libres y seguras que aplican la materia con
                atrevimiento. Una factura heredera de Solana y con ecos de Goya.
              </p>
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] text-ocre uppercase font-semibold mb-3">Temática</p>
              <p className="text-tinta-suave leading-relaxed">
                Escenas urbanas, multitudes, la muerte, lo sagrado y lo profano. Figuras cansadas que
                cargan con el peso de la Historia. Surrealismo cotidiano con raíz en el realismo social.
              </p>
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] text-ocre uppercase font-semibold mb-3">Influencias</p>
              <p className="text-tinta-suave leading-relaxed">
                José Gutiérrez Solana, Francisco de Goya, la tradición pictórica vasca y la luz de
                Andalucía. Una síntesis entre el Norte y el Sur de España.
              </p>
            </div>
          </div>
        </section>

        {/* Cita */}
        <blockquote className="text-center py-8 mb-20">
          <div className="filete mx-auto mb-6" />
          <p className="font-display text-2xl sm:text-3xl italic text-tinta-suave leading-relaxed max-w-3xl mx-auto">
            «Sus lienzos recogen lo mejor de la tradición norteña con la fuerza de los cuadros negros,
            plasmando escenas cotidianas desde la sórdida realidad de cuerpos y rostros cansados.»
          </p>
          <div className="filete mx-auto mt-6" />
        </blockquote>

        {/* Reina Sofía · La Vaquería */}
        <section className="mb-20">
          <div className="text-center mb-8">
            <p className="text-xs tracking-[0.3em] text-ocre uppercase font-semibold mb-3">Colección permanente</p>
            <h2 className="text-2xl sm:text-3xl text-tinta">Museo Reina Sofía</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start bg-superficie border border-linea p-8 md:p-10">
            <div className="relative aspect-[4/3] border border-linea overflow-hidden bg-hueso">
              <Image src="/obras/vaqueria.jpg" alt="Tableros del bar La Vaquería — Borja Satrústegui" fill sizes="(max-width: 768px) 90vw, 400px" className="object-contain" />
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="font-display text-xl italic text-tinta mb-1">
                  Tableros del bar La Vaquería de la calle Libertad
                </h3>
                <p className="text-xs tracking-[0.2em] text-ocre uppercase mb-3">1976</p>
                <p className="text-sm text-tinta-tenue leading-relaxed">
                  Acrílico, tinta, lápiz y lápiz de color sobre aglomerado. Donación de la Fundación
                  CEDCS, 2022.
                </p>
              </div>
              <div className="border-t border-linea pt-4 flex flex-col gap-3 text-tinta-suave leading-relaxed text-[15px]">
                <p>
                  La Vaquería, en la calle Libertad de Madrid, fue un bar de la bohemia contracultural.
                  En junio de 1976 sufrió un atentado con bomba que dejó el local parcialmente destruido.
                </p>
                <p>
                  En respuesta, Cesepe y Borja Satrústegui pintaron unos paneles de aglomerado para
                  proteger las puertas. Meses después fueron tiroteados; los impactos aún son visibles.
                  La obra se convirtió en un símbolo de la <em>Movida</em> madrileña.
                </p>
              </div>
              <a
                href="https://www.museoreinasofia.es/coleccion/autor/satrustegui-borja"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-1 text-sm tracking-[0.15em] uppercase text-granate border border-granate/40 px-4 py-2.5 hover:bg-granate hover:text-hueso transition-colors text-center"
              >
                Ver en el Reina Sofía →
              </a>
            </div>
          </div>
        </section>

        {/* Llamamiento */}
        <section className="bg-gradient-to-br from-granate/8 to-transparent border-2 border-granate/25 p-8 md:p-12 text-center">
          <p className="text-xs tracking-[0.3em] text-ocre uppercase font-semibold mb-4">Ayúdanos a documentar su obra</p>
          <h2 className="text-2xl sm:text-3xl text-tinta mb-5">¿Tienes un cuadro de Borja Satrústegui?</h2>
          <p className="text-tinta-suave leading-relaxed mb-8 max-w-2xl mx-auto">
            Su obra está muy dispersa y no sabemos dónde están todos sus originales. Si tienes algún
            cuadro suyo, nos encantaría que nos enviaras una foto y nos ayudaras a preservar su legado.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center px-8 py-4 bg-granate text-hueso text-sm tracking-[0.15em] uppercase font-semibold hover:bg-granate-claro transition-colors"
          >
            Enviar una foto
          </Link>
        </section>
      </div>
    </div>
  );
}
