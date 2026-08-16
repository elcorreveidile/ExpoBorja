// Almacén de los cambios de Borja (sala, disponibilidad, eliminadas y obras nuevas).
//
// Híbrido: si hay DATABASE_URL (Neon, en producción) usa Postgres; si no (tu
// local sin claves) usa data/*.json. El resto de la app no nota la diferencia.

import fs from "fs";
import path from "path";
import { neon } from "@neondatabase/serverless";
import type { Epoca } from "./obras";

export interface OverrideObra {
  epoca?: Epoca;
  disponible?: boolean;
  oculta?: boolean; // "eliminada" por Borja (recuperable)
}

export interface NuevaObra {
  slug: string;
  referencia: string;
  epoca: Epoca;
  disponible: boolean;
  imagen: string;
  creada: string;
}

export interface Verificacion {
  token: string;
  codigo: string;
  nombre: string;
  email: string;
  mensaje: string;
  referencia: string | null;
  expira: string; // fecha ISO
}

// --- Conexión Neon (solo si hay URL) ---
const URL_DB = process.env.DATABASE_URL || process.env.POSTGRES_URL || "";
const sql = URL_DB ? neon(URL_DB) : null;

let preparado: Promise<void> | null = null;
function preparar(): Promise<void> {
  if (!sql) return Promise.resolve();
  if (!preparado) {
    preparado = (async () => {
      await sql`CREATE TABLE IF NOT EXISTS overrides (
        slug text PRIMARY KEY, epoca text, disponible boolean, oculta boolean
      )`;
      await sql`CREATE TABLE IF NOT EXISTS obras_nuevas (
        slug text PRIMARY KEY, referencia text NOT NULL, epoca text NOT NULL,
        disponible boolean NOT NULL DEFAULT false, imagen text NOT NULL,
        creada timestamptz DEFAULT now()
      )`;
      await sql`CREATE TABLE IF NOT EXISTS verificaciones (
        token text PRIMARY KEY, codigo text NOT NULL, nombre text NOT NULL,
        email text NOT NULL, mensaje text NOT NULL, referencia text,
        expira timestamptz NOT NULL, creada timestamptz DEFAULT now()
      )`;
    })();
  }
  return preparado;
}

// --- Respaldo en archivos (local) ---
const F_OVERRIDES = path.join(process.cwd(), "data", "overrides.json");
const F_NUEVAS = path.join(process.cwd(), "data", "nuevas.json");
function leerJSON<T>(f: string, porDefecto: T): T {
  try {
    return JSON.parse(fs.readFileSync(f, "utf8"));
  } catch {
    return porDefecto;
  }
}
function escribirJSON(f: string, datos: unknown): void {
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, JSON.stringify(datos, null, 2), "utf8");
}

// --- API pública ---

export async function leerOverrides(): Promise<Record<string, OverrideObra>> {
  if (!sql) return leerJSON<Record<string, OverrideObra>>(F_OVERRIDES, {});
  try {
    await preparar();
    const filas = (await sql`SELECT slug, epoca, disponible, oculta FROM overrides`) as Array<{
      slug: string; epoca: Epoca | null; disponible: boolean | null; oculta: boolean | null;
    }>;
    const out: Record<string, OverrideObra> = {};
    for (const f of filas) {
      const o: OverrideObra = {};
      if (f.epoca) o.epoca = f.epoca;
      if (f.disponible !== null) o.disponible = f.disponible;
      if (f.oculta !== null) o.oculta = f.oculta;
      out[f.slug] = o;
    }
    return out;
  } catch (e) {
    // Red de seguridad: si la BD falla, la web pública sigue con las obras base.
    console.error("leerOverrides:", e);
    return {};
  }
}

export async function guardarOverride(slug: string, cambio: OverrideObra): Promise<void> {
  if (!sql) {
    const actual = leerJSON<Record<string, OverrideObra>>(F_OVERRIDES, {});
    actual[slug] = { ...actual[slug], ...cambio };
    escribirJSON(F_OVERRIDES, actual);
    return;
  }
  await preparar();
  const [existe] = (await sql`SELECT epoca, disponible, oculta FROM overrides WHERE slug=${slug}`) as Array<{
    epoca: Epoca | null; disponible: boolean | null; oculta: boolean | null;
  }>;
  const epoca = cambio.epoca !== undefined ? cambio.epoca : existe?.epoca ?? null;
  const disponible = cambio.disponible !== undefined ? cambio.disponible : existe?.disponible ?? null;
  const oculta = cambio.oculta !== undefined ? cambio.oculta : existe?.oculta ?? null;
  await sql`INSERT INTO overrides (slug, epoca, disponible, oculta)
    VALUES (${slug}, ${epoca}, ${disponible}, ${oculta})
    ON CONFLICT (slug) DO UPDATE SET epoca=${epoca}, disponible=${disponible}, oculta=${oculta}`;
}

export async function leerNuevas(): Promise<NuevaObra[]> {
  if (!sql) return leerJSON<NuevaObra[]>(F_NUEVAS, []);
  try {
    await preparar();
    const filas = (await sql`SELECT slug, referencia, epoca, disponible, imagen, creada
      FROM obras_nuevas ORDER BY creada ASC`) as Array<{
      slug: string; referencia: string; epoca: Epoca; disponible: boolean; imagen: string; creada: string;
    }>;
    return filas.map((f) => ({
      slug: f.slug, referencia: f.referencia, epoca: f.epoca,
      disponible: f.disponible, imagen: f.imagen, creada: String(f.creada),
    }));
  } catch (e) {
    console.error("leerNuevas:", e);
    return [];
  }
}

export async function anadirNueva(obra: NuevaObra): Promise<void> {
  if (!sql) {
    const lista = leerJSON<NuevaObra[]>(F_NUEVAS, []);
    lista.push(obra);
    escribirJSON(F_NUEVAS, lista);
    return;
  }
  await preparar();
  await sql`INSERT INTO obras_nuevas (slug, referencia, epoca, disponible, imagen)
    VALUES (${obra.slug}, ${obra.referencia}, ${obra.epoca}, ${obra.disponible}, ${obra.imagen})`;
}

// --- Verificaciones del formulario (código por email). En local, en memoria. ---
const memVerif = new Map<string, Verificacion>();

export async function crearVerificacion(v: Verificacion): Promise<void> {
  if (!sql) {
    memVerif.set(v.token, v);
    return;
  }
  await preparar();
  await sql`INSERT INTO verificaciones (token, codigo, nombre, email, mensaje, referencia, expira)
    VALUES (${v.token}, ${v.codigo}, ${v.nombre}, ${v.email}, ${v.mensaje}, ${v.referencia}, ${v.expira})`;
}

export async function leerVerificacion(token: string): Promise<Verificacion | null> {
  if (!sql) return memVerif.get(token) ?? null;
  await preparar();
  const [f] = (await sql`SELECT token, codigo, nombre, email, mensaje, referencia, expira
    FROM verificaciones WHERE token=${token}`) as Array<{
    token: string; codigo: string; nombre: string; email: string;
    mensaje: string; referencia: string | null; expira: string;
  }>;
  if (!f) return null;
  return { ...f, expira: String(f.expira) };
}

export async function borrarVerificacion(token: string): Promise<void> {
  if (!sql) {
    memVerif.delete(token);
    return;
  }
  await preparar();
  await sql`DELETE FROM verificaciones WHERE token=${token}`;
}
