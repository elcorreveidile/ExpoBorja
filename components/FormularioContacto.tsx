"use client";

import { useState } from "react";

interface Props {
  obraTitulo?: string;
  referencia?: string;
}

export default function FormularioContacto({ obraTitulo, referencia }: Props) {
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: obraTitulo
      ? `Me interesa la obra «${obraTitulo}»${referencia ? ` (Ref. ${referencia})` : ""}. `
      : "",
    // honeypot anti-spam: debe quedar vacío
    empresa: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.empresa) return; // bot
    setEnviando(true);
    setError(false);
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          mensaje: form.mensaje,
          referencia,
          empresa: form.empresa,
        }),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (res.ok && data.ok) setEnviado(true);
      else setError(true);
    } catch {
      setError(true);
    }
    setEnviando(false);
  };

  if (enviado) {
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

  const campo =
    "w-full bg-hueso border border-linea text-tinta px-4 py-3.5 text-base focus:outline-none focus:border-granate transition-colors";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {obraTitulo && (
        <div className="bg-superficie border border-linea px-4 py-3 text-sm">
          <span className="text-tinta-tenue">Consulta sobre: </span>
          <span className="font-display italic text-tinta">{obraTitulo}</span>
          {referencia && <span className="text-tinta-tenue"> · Ref. {referencia}</span>}
        </div>
      )}

      {/* honeypot: oculto para humanos */}
      <div aria-hidden="true" className="absolute -left-[9999px]" tabIndex={-1}>
        <label>
          No rellenar
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.empresa}
            onChange={(e) => setForm({ ...form, empresa: e.target.value })}
          />
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

      {error && (
        <p className="text-granate text-sm">
          No se ha podido enviar. Inténtalo de nuevo o escríbenos por WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="w-full bg-granate text-hueso text-sm tracking-[0.15em] uppercase font-semibold py-4 hover:bg-granate-claro transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {enviando ? "Enviando…" : "Enviar mensaje"}
      </button>

      <p className="text-sm text-tinta-tenue text-center">Tus datos no se comparten con terceros.</p>
    </form>
  );
}
