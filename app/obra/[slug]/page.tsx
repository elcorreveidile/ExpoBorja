import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import VisorObra from "@/components/VisorObra";
import EtiquetaDisponible from "@/components/EtiquetaDisponible";
import EditorObra from "@/components/EditorObra";
import { obraPorSlug, obrasPorEpoca, etiquetaObra } from "@/lib/obras";
import { mensajeConsulta, urlWhatsapp } from "@/lib/contacto";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const obra = await obraPorSlug(slug);
  if (!obra) return { title: "Obra no encontrada" };
  return {
    title: etiquetaObra(obra),
    description: `Obra ${obra.numero ? `Nº ${obra.numero}` : ""} de Borja Satrústegui.`,
    openGraph: { images: [{ url: obra.imagen }] },
  };
}

const nombreSala = { nueva: "Obra nueva", antigua: "Obra antigua" } as const;
const rutaSala = { nueva: "/obra-nueva", antigua: "/obra-antigua" } as const;

export default async function FichaObra({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const obra = await obraPorSlug(slug);
  if (!obra || !obra.publicada || obra.oculta) notFound();

  // Anterior / siguiente dentro de la misma sala
  const sala = await obrasPorEpoca(obra.epoca);
  const idx = sala.findIndex((o) => o.slug === obra.slug);
  const anterior = idx > 0 ? sala[idx - 1] : sala[sala.length - 1];
  const siguiente = idx < sala.length - 1 ? sala[idx + 1] : sala[0];

  const ficha = [
    obra.tecnica && { etiqueta: "Técnica", valor: obra.tecnica },
    obra.anio && { etiqueta: "Año", valor: String(obra.anio) },
    obra.medidas && { etiqueta: "Medidas", valor: obra.medidas },
  ].filter(Boolean) as { etiqueta: string; valor: string }[];

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-10 pb-24">
      <Link
        href={rutaSala[obra.epoca]}
        className="inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase text-tinta-suave hover:text-granate transition-colors mb-8"
      >
        ← {nombreSala[obra.epoca]}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        <VisorObra imagen={obra.imagen} titulo={etiquetaObra(obra)} />

        <div className="lg:pt-4">
          {obra.disponible && <EtiquetaDisponible className="mb-5" />}

          <p className="text-xs tracking-[0.3em] text-ocre uppercase font-semibold mb-3">
            {nombreSala[obra.epoca]}
            {obra.numero ? ` · Nº ${obra.numero}` : ""}
          </p>
          <h1 className="text-4xl sm:text-5xl text-tinta italic">Sin título</h1>

          {ficha.length > 0 && (
            <dl className="mt-8 flex flex-col divide-y divide-linea border-y border-linea">
              {ficha.map((f) => (
                <div key={f.etiqueta} className="flex justify-between gap-6 py-3">
                  <dt className="text-sm tracking-[0.1em] uppercase text-tinta-tenue">{f.etiqueta}</dt>
                  <dd className="text-tinta text-right">{f.valor}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <a
              href={urlWhatsapp(mensajeConsulta(obra))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-granate text-hueso text-sm tracking-[0.15em] uppercase font-semibold hover:bg-granate-claro transition-colors"
            >
              <span className="text-lg" aria-hidden="true">💬</span>
              Consultar por WhatsApp
            </a>
            <Link
              href={`/contacto?ref=${obra.referencia}`}
              className="inline-flex items-center justify-center px-8 py-4 border border-granate text-granate text-sm tracking-[0.15em] uppercase font-semibold hover:bg-granate hover:text-hueso transition-colors"
            >
              Consultar por formulario
            </Link>
          </div>
          <p className="mt-3 text-sm text-tinta-tenue">
            Precio a consultar · Ref. {obra.referencia}
          </p>

          <EditorObra slug={obra.slug} epoca={obra.epoca} disponible={obra.disponible} />
        </div>
      </div>

      {/* Anterior / siguiente */}
      <nav className="mt-20 pt-8 border-t border-linea flex items-center justify-between gap-4">
        <Link href={`/obra/${anterior.slug}`} className="group flex-1 min-w-0">
          <span className="block text-xs tracking-[0.1em] uppercase text-tinta-tenue">← Anterior</span>
          <span className="block font-display italic text-tinta group-hover:text-granate transition-colors truncate">{etiquetaObra(anterior)}</span>
        </Link>
        <Link href={`/obra/${siguiente.slug}`} className="group flex-1 min-w-0 text-right">
          <span className="block text-xs tracking-[0.1em] uppercase text-tinta-tenue">Siguiente →</span>
          <span className="block font-display italic text-tinta group-hover:text-granate transition-colors truncate">{etiquetaObra(siguiente)}</span>
        </Link>
      </nav>
    </div>
  );
}
