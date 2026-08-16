import { NextRequest, NextResponse } from "next/server";
import { sesionValida, COOKIE_SESION } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get(COOKIE_SESION)?.value;
  return NextResponse.json({ editable: sesionValida(cookie) });
}
