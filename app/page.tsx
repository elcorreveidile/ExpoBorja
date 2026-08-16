import Image from "next/image";
import Link from "next/link";
import TarjetaObra from "@/components/TarjetaObra";
import { obrasDestacadas } from "@/lib/obras";

export const dynamic = "force-dynamic";

export default async function Home() {
  const destacadas = (await obrasDestacadas()).slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[82vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/borja-foto-1.jpg"
            alt="Borja Satrústegui en su estudio"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-tinta/70 via-tinta/45 to-tinta/80" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm tracking-[0.35em] uppercase text-hueso/85 mb-5">
            Pintor · Granada
          </p>
          <h1 className="font-display text-5xl sm:text-7xl font-normal text-hueso leading-tight">
            Borja <span className="italic text-[#e6b98f]">Satrústegui</span>
          </h1>
          <p className="mt-6 text-hueso/85 text-lg leading-relaxed">
            Realismo social y expresionismo. Multitudes, memoria y la condición humana,
            pintadas con la libertad heredera de Solana y Goya.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#salas"
              className="inline-flex items-center justify-center px-8 py-4 bg-granate text-hueso text-sm tracking-[0.15em] uppercase font-semibold hover:bg-granate-claro transition-colors"
            >
              Ver la obra
            </a>
            <Link
              href="/disponibles"
              className="inline-flex items-center justify-center px-8 py-4 border border-hueso/70 text-hueso text-sm tracking-[0.15em] uppercase hover:bg-hueso hover:text-tinta transition-colors"
            >
              Obra disponible
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-3xl mx-auto px-6 py-20 sm:py-24 text-center">
        <p className="text-xs tracking-[0.3em] text-ocre uppercase font-semibold mb-5">El artista</p>
        <h2 className="text-3xl sm:text-4xl text-tinta leading-snug">
          Una mirada que no aparta los ojos
        </h2>
        <div className="filete mx-auto my-7" />
        <p className="text-tinta-suave leading-relaxed text-lg">
          Nacido en San Sebastián en 1943 y afincado en Granada desde hace más de tres décadas,
          Borja Satrústegui pinta sobre tabla, lienzo y cartón entre el costumbrismo urbano y el
          surrealismo, con figuras que cargan el peso del mundo cotidiano.
        </p>
        <Link
          href="/sobre-borja"
          className="inline-block mt-7 text-sm tracking-[0.15em] uppercase text-granate border-b-2 border-granate/40 pb-0.5 hover:border-granate transition-colors"
        >
          Sobre Borja
        </Link>
      </section>

      {/* DOS SALAS */}
      <section id="salas" className="max-w-6xl mx-auto px-5 sm:px-6 pb-8 scroll-mt-28">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] text-ocre uppercase font-semibold mb-3">La galería</p>
          <h2 className="text-3xl sm:text-4xl text-tinta">Elige una sala</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { href: "/obra-nueva", titulo: "Obra nueva", texto: "La etapa más reciente del pintor." },
            { href: "/obra-antigua", titulo: "Obra antigua", texto: "Sus primeras etapas." },
          ].map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group border border-linea bg-superficie p-8 sm:p-10 hover:border-granate/50 transition-colors"
            >
              <p className="text-xs tracking-[0.3em] uppercase text-ocre font-semibold mb-3">Sala</p>
              <h3 className="text-2xl sm:text-3xl text-tinta group-hover:text-granate transition-colors">{s.titulo}</h3>
              <p className="mt-2 text-tinta-suave">{s.texto}</p>
              <span className="inline-block mt-5 text-sm tracking-[0.12em] uppercase text-granate">Entrar →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* DESTACADAS */}
      {destacadas.length > 0 && (
        <section className="max-w-6xl mx-auto px-5 sm:px-6 py-16">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] text-ocre uppercase font-semibold mb-3">Selección</p>
            <h2 className="text-3xl sm:text-4xl text-tinta">Obras destacadas</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {destacadas.map((obra) => (
              <TarjetaObra key={obra.slug} obra={obra} />
            ))}
          </div>
        </section>
      )}

      {/* CONTACTO */}
      <section className="bg-superficie border-y border-linea py-16 sm:py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] text-ocre uppercase font-semibold mb-4">Contacto</p>
          <h2 className="text-3xl sm:text-4xl text-tinta mb-4">¿Te interesa una obra?</h2>
          <p className="text-tinta-suave leading-relaxed mb-8">
            Escríbenos sin compromiso para consultar cualquier obra, su disponibilidad o precio.
            También si tienes un cuadro de Borja y quieres ayudarnos a documentar su legado.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center px-8 py-4 bg-granate text-hueso text-sm tracking-[0.15em] uppercase font-semibold hover:bg-granate-claro transition-colors"
          >
            Escribir a Borja
          </Link>
        </div>
      </section>
    </>
  );
}
