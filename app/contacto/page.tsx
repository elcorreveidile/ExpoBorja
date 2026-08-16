import type { Metadata } from "next";
import FormularioContacto from "@/components/FormularioContacto";
import { obraPorReferencia, etiquetaObra } from "@/lib/obras";
import { mensajeConsulta, urlWhatsapp } from "@/lib/contacto";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escribe a Borja Satrústegui para consultar cualquier obra, su disponibilidad o precio.",
};

export default async function Contacto({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  const obra = ref ? await obraPorReferencia(ref) : undefined;
  const etiqueta = obra ? etiquetaObra(obra) : undefined;
  const enlaceWhatsapp = urlWhatsapp(mensajeConsulta(obra));

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-6 pt-16 pb-24">
      <header className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-xs tracking-[0.32em] text-ocre uppercase font-semibold mb-4">Escríbenos</p>
        <h1 className="text-4xl sm:text-5xl text-tinta">Contacto</h1>
        <div className="filete mx-auto my-6" />
        <p className="text-tinta-suave leading-relaxed">
          Para consultar obras, precios o disponibilidad, o si tienes un cuadro de Borja
          y quieres ayudarnos a documentar su obra, escríbenos sin compromiso.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Canal directo */}
        <aside className="md:col-span-2 flex flex-col gap-8">
          <div>
            <h2 className="text-xs tracking-[0.25em] uppercase text-ocre mb-3">Por WhatsApp</h2>
            <p className="text-tinta-suave leading-relaxed mb-4">
              La forma más rápida. Toca el botón y se abre WhatsApp con el mensaje empezado.
            </p>
            <a
              href={enlaceWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-granate text-hueso px-5 py-4 text-sm tracking-[0.12em] uppercase font-semibold hover:bg-granate-claro transition-colors"
            >
              <span className="text-xl" aria-hidden="true">💬</span>
              Escribir por WhatsApp
            </a>
          </div>

          <div className="border-t border-linea pt-6">
            <h2 className="text-xs tracking-[0.25em] uppercase text-ocre mb-3">El artista</h2>
            <p className="text-tinta-suave leading-relaxed">
              Borja Satrústegui<br />
              Pintor de realismo social y expresionismo<br />
              Granada, España
            </p>
          </div>
        </aside>

        {/* Formulario */}
        <div className="md:col-span-3">
          <h2 className="text-xs tracking-[0.25em] uppercase text-ocre mb-4">O rellena el formulario</h2>
          <FormularioContacto obraTitulo={etiqueta} referencia={obra?.referencia} />
        </div>
      </div>
    </div>
  );
}
