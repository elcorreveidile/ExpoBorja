// Envío de emails con Brevo, con plantilla HTML coherente con la web.
// En local (sin clave) escribe el correo en consola.

const BREVO_KEY = process.env.BREVO_API_KEY;
const BREVO_SENDER = process.env.BREVO_SENDER || process.env.CONTACTO_TO || "informa@blablaele.com";

interface Opciones {
  to: string;
  toName?: string;
  subject: string;
  text: string;
  html?: string;
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
        sender: { email: BREVO_SENDER, name: "Borja Satrústegui" },
        to: [{ email: opts.to, ...(opts.toName ? { name: opts.toName } : {}) }],
        ...(opts.replyTo ? { replyTo: opts.replyTo } : {}),
        subject: opts.subject,
        textContent: opts.text,
        ...(opts.html ? { htmlContent: opts.html } : {}),
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

// --- Plantilla HTML (estilo "Cal y granate", con colores en línea para email) ---
function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function plantilla(contenido: string): string {
  return `<div style="margin:0;padding:24px;background-color:#eae4d7;font-family:Arial,Helvetica,sans-serif;color:#201a13;">
  <div style="max-width:520px;margin:0 auto;background-color:#f7f3ea;border:1px solid #d8cfbc;">
    <div style="padding:28px 32px 22px;border-bottom:1px solid #d8cfbc;text-align:center;">
      <div style="font-family:Georgia,'Times New Roman',serif;font-size:23px;color:#201a13;font-weight:bold;">Borja Satrústegui</div>
      <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#9c7434;margin-top:6px;">Pintor</div>
    </div>
    <div style="padding:32px;">${contenido}</div>
    <div style="padding:16px 32px;border-top:1px solid #d8cfbc;text-align:center;font-size:12px;color:#877a65;">borjasatrustegui.online</div>
  </div>
</div>`;
}

// Email con el código de verificación (para el visitante).
export function construirEmailCodigo(nombre: string, codigo: string) {
  const subject = "Tu código para contactar con Borja Satrústegui";
  const text = `Hola ${nombre},\n\nTu código de confirmación es: ${codigo}\n\nEscríbelo en la web para que tu mensaje se envíe. Caduca en 15 minutos.\n\nSi no has solicitado esto, ignora este correo.`;
  const html = plantilla(
    `<p style="font-size:16px;line-height:1.6;margin:0 0 18px;">Hola ${esc(nombre)},</p>
     <p style="font-size:16px;line-height:1.6;margin:0 0 22px;color:#5f5443;">Para enviar tu mensaje, escribe este código en la web:</p>
     <div style="text-align:center;margin:0 0 22px;">
       <span style="display:inline-block;background-color:#8f332a;color:#f7f3ea;font-size:30px;letter-spacing:8px;font-weight:bold;padding:16px 26px;border-radius:4px;">${esc(codigo)}</span>
     </div>
     <p style="font-size:13px;line-height:1.6;color:#877a65;margin:0;">Caduca en 15 minutos. Si no has solicitado esto, puedes ignorar este correo.</p>`
  );
  return { subject, text, html };
}

// Email con la consulta (para Borja).
export function construirEmailConsulta(v: {
  nombre: string; email: string; mensaje: string; referencia: string | null;
}) {
  const subject = `Web Satrústegui — ${v.referencia ? `Consulta ${v.referencia}` : "Consulta"}`;
  const text = [
    `Nombre: ${v.nombre}`, `Email: ${v.email}`, v.referencia ? `Obra: ${v.referencia}` : null, "", v.mensaje,
  ].filter((l) => l !== null).join("\n");
  const fila = (etiqueta: string, valor: string) =>
    `<tr><td style="padding:6px 0;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#877a65;width:90px;vertical-align:top;">${etiqueta}</td><td style="padding:6px 0;font-size:15px;color:#201a13;">${valor}</td></tr>`;
  const html = plantilla(
    `<p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#9c7434;margin:0 0 18px;">Nueva consulta desde la web</p>
     <table style="width:100%;border-collapse:collapse;margin:0 0 20px;">
       ${fila("Nombre", esc(v.nombre))}
       ${fila("Email", `<a href="mailto:${esc(v.email)}" style="color:#8f332a;text-decoration:none;">${esc(v.email)}</a>`)}
       ${v.referencia ? fila("Obra", esc(v.referencia)) : ""}
     </table>
     <div style="border-top:1px solid #d8cfbc;padding-top:18px;font-size:15px;line-height:1.6;color:#201a13;white-space:pre-wrap;">${esc(v.mensaje)}</div>`
  );
  return { subject, text, html };
}
