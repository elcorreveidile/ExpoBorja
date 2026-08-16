import { NextRequest, NextResponse } from "next/server";
import { sesionValida, COOKIE_SESION } from "@/lib/auth";
import { guardarOverride } from "@/lib/store";
import { obraPorSlug } from "@/lib/obras";
import type { OverrideObra } from "@/lib/store";

export async function POST(req: NextRequest) {
  if (!sesionValida(req.cookies.get(COOKIE_SESION)?.value)) {
    return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }

  const { slug, epoca, disponible, oculta } = await req.json().catch(() => ({}));
  if (!slug || !(await obraPorSlug(slug))) {
    return NextResponse.json({ ok: false, error: "Obra no encontrada" }, { status: 400 });
  }

  const cambio: OverrideObra = {};
  if (epoca === "nueva" || epoca === "antigua") cambio.epoca = epoca;
  if (typeof disponible === "boolean") cambio.disponible = disponible;
  if (typeof oculta === "boolean") cambio.oculta = oculta;

  if (Object.keys(cambio).length === 0) {
    return NextResponse.json({ ok: false, error: "Nada que cambiar" }, { status: 400 });
  }

  await guardarOverride(slug, cambio);
  return NextResponse.json({ ok: true });
}
