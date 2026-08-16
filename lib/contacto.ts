import type { Obra } from "./obras";
import { etiquetaObra } from "./obras";

// WhatsApp de Borja. No se muestra el número: los botones abren el chat.
export const WHATSAPP = "34680342180";

// Mensaje de consulta, idéntico en el formulario y en WhatsApp.
export function mensajeConsulta(obra?: Obra): string {
  return obra
    ? `Me interesa la obra «${etiquetaObra(obra)}» (Ref. ${obra.referencia}). `
    : "Hola, me gustaría consultar sobre una obra.";
}

export function urlWhatsapp(texto: string): string {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
}
