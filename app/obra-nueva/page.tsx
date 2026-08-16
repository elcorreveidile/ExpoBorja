import type { Metadata } from "next";
import SeccionSala from "@/components/SeccionSala";
import { obrasPorEpoca } from "@/lib/obras";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Obra nueva",
  description: "Obra reciente de Borja Satrústegui: realismo social y expresionismo desde Granada.",
};

export default async function ObraNueva() {
  return (
    <SeccionSala
      eyebrow="Sala"
      titulo="Obra nueva"
      descripcion="La etapa más reciente del pintor. Multitudes, memoria y condición humana, en óleo sobre tabla, lienzo y cartón. Toca cualquier obra para verla en grande."
      obras={await obrasPorEpoca("nueva")}
    />
  );
}
