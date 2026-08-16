import type { Obra } from "@/lib/obras";
import TarjetaObra from "./TarjetaObra";

interface Props {
  eyebrow: string;
  titulo: string;
  descripcion: string;
  obras: Obra[];
  vacio?: string;
}

export default function SeccionSala({ eyebrow, titulo, descripcion, obras, vacio }: Props) {
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-16 pb-24">
      <header className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-xs tracking-[0.32em] text-ocre uppercase font-semibold mb-4">{eyebrow}</p>
        <h1 className="text-4xl sm:text-5xl text-tinta">{titulo}</h1>
        <div className="filete mx-auto my-6" />
        <p className="text-tinta-suave leading-relaxed">{descripcion}</p>
      </header>

      {obras.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {obras.map((obra) => (
            <TarjetaObra key={obra.slug} obra={obra} />
          ))}
        </div>
      ) : (
        <p className="text-center text-tinta-suave py-16">
          {vacio ?? "Aún no hay obras en esta sala."}
        </p>
      )}
    </div>
  );
}
