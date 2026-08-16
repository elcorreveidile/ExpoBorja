import { NextRequest, NextResponse } from "next/server";
import { sesionValida, COOKIE_SESION } from "@/lib/auth";
import { obrasOcultas } from "@/lib/obras";

export async function GET(req: NextRequest) {
  if (!sesionValida(req.cookies.get(COOKIE_SESION)?.value)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const ocultas = (await obrasOcultas()).map((o) => ({
    slug: o.slug,
    referencia: o.referencia,
    imagen: o.imagen,
  }));
  return NextResponse.json({ ok: true, ocultas });
}
