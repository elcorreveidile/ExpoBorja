"use client";

import { useState } from "react";

interface Props {
  obraTitulo?: string;
  referencia?: string;
}

type Paso = "form" | "codigo" | "enviado";

export default function FormularioContacto({ obraTitulo, referencia }: Props) {
  const [paso, setPaso] = useState<Paso>("form");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [codigo, setCodigo] = useState("");
  const [codigoDev, setCodigoDev] = useState<string | null>(null);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: obraTitulo
      ? `Me interesa la obra «${obraTitulo}»${referencia ? ` (Ref. ${referencia})` : ""}. `
      : "",
    empresa: "", // honeypot
  });

  const campo =
    "w-full bg-hueso border border-linea text-tinta px-4 py-3.5 text-base focus:outline-none focus:border-granate transition-colors";

  const pedirCodigo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.empresa) return; // bot
    setEnviando(true);
    setError(null);
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, referencia }),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (res.ok && data.ok) {
        setToken(data.token);
        setCodigoDev(data.codigoDev ?? null);
        setPaso("codigo");
      } else {
        setError(data.error || "No se pudo enviar. Inténtalo de nuevo.");
      }
    } catch {
      setError("Error de conexión. Inténtalo de nuevo.");
    }
    setEnviando(false);
  };

  const confirmar = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setError(null);
    try {
      const res = await fetch("/api/contacto/verificar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, codigo }),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (res.ok && data.ok) setPaso("enviado");
      else setError(data.error || "No se pudo confirmar. Inténtalo de nuevo.");
    } catch {
      setError("Error de conexión. Inténtalo de nuevo.");
    }
    setEnviando(false);
  };

  if (paso === "enviado") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 gap-4">
        <div className="text-4xl">✉️</div>
        <h2 className="text-2xl text-tinta">Mensaje enviado</h2>
        <p className="text-tinta-suave max-w-sm">
          Gracias por tu interés en la obra de Borja. Te responderemos lo antes posible.
        </p>
      </div>
    );
  }

  if (paso === "codigo") {
    return (
      <form onSubmit={confirmar} className="flex flex-col gap-5">
        <div className="bg-superficie border border-linea px-4 py-4">
          <p className="text-tinta">
            Te hemos enviado un <strong>código de 6 cifras</strong> a{" "}
            <strong>{form.email}</strong>. Escríbelo aquí para enviar tu mensaje.
          </p>
          {codigoDev && (
            <p className="text-xs text-tinta-tenue mt-2">(Modo local · código: {codigoDev})</p>
          )}
        </div>

        <div>
          <label htmlFor="codigo" className="block text-sm tracking-[0.08em] uppercase text-tinta-suave mb-2">
            Código
          </label>
          <input
            id="codigo"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className={`${campo} text-center text-2xl tracking-[0.4em]`}
            placeholder="······"
            maxLength={6}
            autoFocus
          />
        </div>

        {error && <p className="text-granate text-sm">{error}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="w-full bg-granate text-hueso text-sm tracking-[0.15em] uppercase font-semibold py-4 hover:bg-granate-claro transition-colors disabled:opacity-60"
        >
          {enviando ? "Enviando…" : "Confirmar y enviar"}
        </button>
        <button
          type="button"
          onClick={() => { setPaso("form"); setError(null); setCodigo(""); }}
          className="text-sm text-tinta-suave hover:text-granate transition-colors"
        >
          ← Volver y corregir mis datos
        </button>
      </form>
    );
  }

  // paso "form"
  return (
    <form onSubmit={pedirCodigo} className="flex flex-col gap-5">
      {obraTitulo && (
        <div className="bg-superficie border border-linea px-4 py-3 text-sm">
          <span className="text-tinta-tenue">Consulta sobre: </span>
          <span className="font-display italic text-tinta">{obraTitulo}</span>
          {referencia && <span className="text-tinta-tenue"> · Ref. {referencia}</span>}
        </div>
      )}

      {/* honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px]" tabIndex={-1}>
        <label>
          No rellenar
          <input type="text" tabIndex={-1} autoComplete="off" value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} />
        </label>
      </div>

      <div>
        <label htmlFor="nombre" className="block text-sm tracking-[0.08em] uppercase text-tinta-suave mb-2">Nombre</label>
        <input id="nombre" type="text" required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className={campo} placeholder="Tu nombre" />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm tracking-[0.08em] uppercase text-tinta-suave mb-2">Email</label>
        <input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={campo} placeholder="tu@email.com" />
      </div>

      <div>
        <label htmlFor="mensaje" className="block text-sm tracking-[0.08em] uppercase text-tinta-suave mb-2">Mensaje</label>
        <textarea id="mensaje" required rows={6} value={form.mensaje} onChange={(e) => setForm({ ...form, mensaje: e.target.value })} className={`${campo} resize-none`} placeholder="¿En qué podemos ayudarte?" />
      </div>

      <label className="flex items-start gap-2.5 text-sm text-tinta-suave cursor-pointer">
        <input type="checkbox" required className="mt-1 w-4 h-4 shrink-0 accent-[#8f332a]" />
        <span>
          He leído y acepto la{" "}
          <a href="/privacidad" target="_blank" rel="noopener noreferrer" className="text-granate hover:underline">
            política de privacidad
          </a>.
        </span>
      </label>

      {error && <p className="text-granate text-sm">{error}</p>}

      <button
        type="submit"
        disabled={enviando}
        className="w-full bg-granate text-hueso text-sm tracking-[0.15em] uppercase font-semibold py-4 hover:bg-granate-claro transition-colors disabled:opacity-60"
      >
        {enviando ? "Enviando…" : "Enviar mensaje"}
      </button>

      <p className="text-sm text-tinta-tenue text-center">
        Para evitar spam, te enviaremos un código a tu email para confirmar.
      </p>
    </form>
  );
}
