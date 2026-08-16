import { NextResponse } from "next/server";
import { leerVerificacion, borrarVerificacion } from "@/lib/store";
import { enviarEmail } from "@/lib/email";

// Paso 2: comprueba el código y, si es correcto, envía el mensaje a Borja.
const DESTINO = process.env.CONTACTO_TO || "informa@blablaele.com";

export async function POST(req: Request) {
  try {
    const { token, codigo } = await req.json();
    if (!token || !codigo) {
      return NextResponse.json({ ok: false, error: "Faltan datos" }, { status: 400 });
    }

    const v = await leerVerificacion(token);
    if (!v) {
      return NextResponse.json({ ok: false, error: "Solicitud no encontrada. Vuelve a empezar." }, { status: 400 });
    }
    if (new Date(v.expira).getTime() < Date.now()) {
      await borrarVerificacion(token);
      return NextResponse.json({ ok: false, error: "El código ha caducado. Vuelve a empezar." }, { status: 400 });
    }
    if (String(codigo).trim() !== v.codigo) {
      return NextResponse.json({ ok: false, error: "El código no es correcto." }, { status: 400 });
    }

    const asunto = `Web Satrústegui — ${v.referencia ? `Consulta ${v.referencia}` : "Consulta"}`;
    const cuerpo = [
      `Nombre: ${v.nombre}`,
      `Email: ${v.email}`,
      v.referencia ? `Obra: ${v.referencia}` : null,
      "",
      v.mensaje,
    ]
      .filter((l) => l !== null)
      .join("\n");

    const enviado = await enviarEmail({
      to: DESTINO,
      subject: asunto,
      text: cuerpo,
      replyTo: { email: v.email, name: v.nombre },
    });

    await borrarVerificacion(token);

    if (!enviado) {
      return NextResponse.json({ ok: false, error: "No se pudo enviar el mensaje" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Error de servidor" }, { status: 500 });
  }
}
