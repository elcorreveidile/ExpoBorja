import { NextRequest, NextResponse } from "next/server";
import { codigoCorrecto, crearSesion, COOKIE_SESION } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { codigo } = await req.json().catch(() => ({ codigo: "" }));

  if (!codigoCorrecto(codigo)) {
    return NextResponse.json({ ok: false, error: "Código incorrecto" }, { status: 401 });
  }

  const { valor, maxAge } = crearSesion();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_SESION, valor, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
  return res;
}
