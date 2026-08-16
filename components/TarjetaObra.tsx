import Image from "next/image";
import Link from "next/link";
import type { Obra } from "@/lib/obras";
import EtiquetaDisponible from "./EtiquetaDisponible";
import EditorObra from "./EditorObra";

export default function TarjetaObra({ obra }: { obra: Obra }) {
  const numero = obra.numero ? `Nº ${obra.numero}` : null;
  const meta = [numero, obra.tecnica, obra.anio ? String(obra.anio) : null]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="group">
      <Link
        href={`/obra/${obra.slug}`}
        className="block focus-visible:outline-none"
        aria-label={`Ver obra ${numero ?? "sin título"}`}
      >
        {/* Marco tipo passe-partout: la obra se ve entera, sin recortes */}
        <div className="relative aspect-[4/5] bg-hueso border border-linea overflow-hidden transition-shadow duration-300 group-hover:shadow-[0_10px_30px_rgba(32,26,19,0.16)]">
          <Image
            src={obra.imagen}
            alt={`Obra ${numero ?? "sin título"} de Borja Satrústegui`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.02]"
          />
          {obra.disponible && (
            <EtiquetaDisponible className="absolute top-3 left-3" />
          )}
        </div>

        <div className="pt-3">
          <h3 className="font-display text-lg italic text-tinta leading-snug group-hover:text-granate transition-colors">
            Sin título
          </h3>
          {meta && (
            <p className="text-sm text-tinta-tenue mt-0.5">{meta}</p>
          )}
        </div>
      </Link>

      <EditorObra slug={obra.slug} epoca={obra.epoca} disponible={obra.disponible} />
    </article>
  );
}
