// Envío de emails con Brevo. En local (sin clave) escribe el correo en consola.

const BREVO_KEY = process.env.BREVO_API_KEY;
const BREVO_SENDER = process.env.BREVO_SENDER || process.env.CONTACTO_TO || "informa@blablaele.com";

interface Opciones {
  to: string;
  toName?: string;
  subject: string;
  text: string;
  replyTo?: { email: string; name?: string };
}

export async function enviarEmail(opts: Opciones): Promise<boolean> {
  if (!BREVO_KEY) {
    console.log(`[email dev] Para: ${opts.to} · ${opts.subject}\n${opts.text}`);
    return true;
  }
  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": BREVO_KEY, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        sender: { email: BREVO_SENDER, name: "Web Borja Satrústegui" },
        to: [{ email: opts.to, ...(opts.toName ? { name: opts.toName } : {}) }],
        ...(opts.replyTo ? { replyTo: opts.replyTo } : {}),
        subject: opts.subject,
        textContent: opts.text,
      }),
    });
    if (!res.ok) {
      console.error("Brevo:", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (e) {
    console.error("Brevo excepción:", e);
    return false;
  }
}
