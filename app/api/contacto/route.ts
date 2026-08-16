import { NextResponse } from "next/server";
import crypto from "crypto";
import { crearVerificacion } from "@/lib/store";
import { enviarEmail, construirEmailCodigo } from "@/lib/email";

// Paso 1: valida el formulario, genera un código y lo envía por email al visitante.
// El mensaje NO llega a Borja hasta que el visitante confirma el código (paso 2).
const TTL_MIN = 15;

export async function POST(req: Request) {
  try {
    const { nombre, email, mensaje, referencia, empresa } = await req.json();

    // Honeypot: si viene relleno, es un bot. Fingimos éxito y descartamos.
    if (empresa) return NextResponse.json({ ok: true, token: "descartado" });

    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ ok: false, error: "Faltan campos" }, { status: 400 });
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "El email no es válido" }, { status: 400 });
    }

    const token = crypto.randomUUID();
    const codigo = String(crypto.randomInt(0, 1_000_000)).padStart(6, "0");
    const expira = new Date(Date.now() + TTL_MIN * 60_000).toISOString();

    await crearVerificacion({ token, codigo, nombre, email, mensaje, referencia: referencia || null, expira });

    const enviado = await enviarEmail({ to: email, toName: nombre, ...construirEmailCodigo(nombre, codigo) });

    if (!enviado && process.env.BREVO_API_KEY) {
      return NextResponse.json({ ok: false, error: "No se pudo enviar el código" }, { status: 502 });
    }

    // En local (sin Brevo) devolvemos el código para poder probar el flujo.
    const codigoDev = process.env.BREVO_API_KEY ? undefined : codigo;
    return NextResponse.json({ ok: true, token, ...(codigoDev ? { codigoDev } : {}) });
  } catch {
    return NextResponse.json({ ok: false, error: "Error de servidor" }, { status: 500 });
  }
}
