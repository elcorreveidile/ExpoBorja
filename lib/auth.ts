// Acceso de Borja: un código personal + sesión firmada en una cookie.
// Sencillo a propósito (un solo editor, sin datos sensibles). El endurecimiento
// (rate limiting) llega en la Fase 4.

import crypto from "crypto";

export const COOKIE_SESION = "bs_admin";

// En local hay valores por defecto para poder trabajar ya. En producción se
// definen ADMIN_CODE y ADMIN_SECRET como variables de entorno (nunca en el repo).
const CODIGO = process.env.ADMIN_CODE || "borja-2024";
const SECRETO = process.env.ADMIN_SECRET || "secreto-de-desarrollo-cambiar";
const DIAS = 90;

export function codigoCorrecto(codigo: string): boolean {
  if (!codigo || typeof codigo !== "string") return false;
  const a = Buffer.from(codigo);
  const b = Buffer.from(CODIGO);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function crearSesion(): { valor: string; maxAge: number } {
  const expira = Date.now() + DIAS * 24 * 60 * 60 * 1000;
  const payload = String(expira);
  const firma = crypto.createHmac("sha256", SECRETO).update(payload).digest("hex");
  return { valor: `${payload}.${firma}`, maxAge: DIAS * 24 * 60 * 60 };
}

export function sesionValida(cookie: string | undefined | null): boolean {
  if (!cookie) return false;
  const [payload, firma] = cookie.split(".");
  if (!payload || !firma) return false;
  const expira = Number(payload);
  if (!Number.isFinite(expira) || Date.now() > expira) return false;
  const esperada = crypto.createHmac("sha256", SECRETO).update(payload).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(firma), Buffer.from(esperada));
  } catch {
    return false;
  }
}
