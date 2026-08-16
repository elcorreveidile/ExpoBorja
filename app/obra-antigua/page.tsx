import type { Metadata } from "next";
import SeccionSala from "@/components/SeccionSala";
import { obrasPorEpoca } from "@/lib/obras";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Obra antigua",
  description: "Obra de las primeras etapas de Borja Satrústegui.",
};

export default async function ObraAntigua() {
  return (
    <SeccionSala
      eyebrow="Sala"
      titulo="Obra antigua"
      descripcion="Piezas de las primeras etapas del pintor. Toca cualquier obra para verla en grande."
      obras={await obrasPorEpoca("antigua")}
    />
  );
}
