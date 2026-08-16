import { NextResponse } from "next/server";

// Destinatario: solo en el servidor, nunca llega al navegador.
const DESTINO = process.env.CONTACTO_TO || "informa@blablaele.com";
const BREVO_KEY = process.env.BREVO_API_KEY;
const BREVO_SENDER = process.env.BREVO_SENDER || DESTINO;

// Envío por Brevo si hay clave; si no, FormSubmit (respaldo local).
// Fase 4 añadirá Cloudflare Turnstile + rate limiting sobre esta misma interfaz.
export async function POST(req: Request) {
  try {
    const { nombre, email, mensaje, referencia, empresa } = await req.json();

    // Honeypot: si viene relleno, es un bot. Fingimos éxito y descartamos.
    if (empresa) return NextResponse.json({ ok: true });

    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ ok: false, error: "Faltan campos" }, { status: 400 });
    }

    const asunto = `Web Satrústegui — ${referencia ? `Consulta ${referencia}` : "Consulta"}`;
    const cuerpo = [
      `Nombre: ${nombre}`,
      `Email: ${email}`,
      referencia ? `Obra: ${referencia}` : null,
      "",
      mensaje,
    ]
      .filter((l) => l !== null)
      .join("\n");

    if (BREVO_KEY) {
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": BREVO_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          sender: { email: BREVO_SENDER, name: "Web Borja Satrústegui" },
          to: [{ email: DESTINO }],
          replyTo: { email, name: nombre },
          subject: asunto,
          textContent: cuerpo,
        }),
      });
      if (!res.ok) {
        console.error("Brevo error:", res.status, await res.text().catch(() => ""));
        return NextResponse.json({ ok: false, error: "No se pudo enviar" }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    }

    // Respaldo local (sin Brevo): FormSubmit.
    const datos = new URLSearchParams({
      nombre, email, mensaje,
      ...(referencia ? { referencia } : {}),
      _subject: asunto,
      _captcha: "false",
    });
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(DESTINO)}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
      body: datos.toString(),
    });
    if (!res.ok) return NextResponse.json({ ok: false, error: "No se pudo enviar" }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Error de servidor" }, { status: 500 });
  }
}
