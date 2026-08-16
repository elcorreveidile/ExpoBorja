import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { put } from "@vercel/blob";
import { sesionValida, COOKIE_SESION } from "@/lib/auth";
import { anadirNueva } from "@/lib/store";
import { catalogo } from "@/lib/obras";
import type { Epoca } from "@/lib/obras";

const MAX_BYTES = 12 * 1024 * 1024; // 12 MB
const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function POST(req: NextRequest) {
  if (!sesionValida(req.cookies.get(COOKIE_SESION)?.value)) {
    return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("imagen");
  if (!form || !(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "Falta la foto" }, { status: 400 });
  }
  if (!EXT[file.type]) {
    return NextResponse.json({ ok: false, error: "Formato no válido (usa JPG, PNG o WEBP)" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: "La foto es demasiado grande (máx. 12 MB)" }, { status: 400 });
  }

  const epocaRaw = form.get("epoca");
  const epoca: Epoca = epocaRaw === "antigua" ? "antigua" : "nueva";
  const disponible = form.get("disponible") === "true";

  // Guardar la imagen: Vercel Blob si hay token (producción), si no en local.
  const id = crypto.randomUUID();
  const nombre = `${id}.${EXT[file.type]}`;
  let imagen: string;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`obras/${nombre}`, file, { access: "public", addRandomSuffix: false });
    imagen = blob.url;
  } else {
    const dir = path.join(process.cwd(), "public", "subidas");
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, nombre), Buffer.from(await file.arrayBuffer()));
    imagen = `/subidas/${nombre}`;
  }

  const total = (await catalogo()).length;
  const referencia = `BS-${String(total + 1).padStart(3, "0")}`;
  const slug = `obra-${id.slice(0, 8)}`;

  await anadirNueva({ slug, referencia, epoca, disponible, imagen, creada: new Date().toISOString() });

  return NextResponse.json({ ok: true, slug });
}
