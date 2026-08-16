import type { Metadata } from "next";
import SeccionSala from "@/components/SeccionSala";
import { obrasDisponibles } from "@/lib/obras";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Obra disponible",
  description: "Obras de Borja Satrústegui disponibles para adquisición. Consulta sin compromiso.",
};

export default async function Disponibles() {
  return (
    <SeccionSala
      eyebrow="Adquisición"
      titulo="Obra disponible"
      descripcion="Estas obras están disponibles para su adquisición. No mostramos precios: escríbenos desde la ficha de cada obra y te informamos sin compromiso."
      obras={await obrasDisponibles()}
      vacio="En este momento no hay obra marcada como disponible. Escríbenos y te avisamos cuando la haya."
    />
  );
}
