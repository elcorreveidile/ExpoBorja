"use client";

import { useState } from "react";

export default function Contacto() {
  const [enviado, setEnviado] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", asunto: "info", mensaje: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Con Formspree o similar — aquí el email destino
    const res = await fetch("https://formsubmit.co/ajax/informa@blablaele.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        nombre: form.nombre,
        email: form.email,
        asunto: form.asunto,
        mensaje: form.mensaje,
        _subject: `Web Borja Satrústegui — ${form.asunto}`,
        _captcha: "false",
      }),
    });
    if (res.ok) setEnviado(true);
  };

  return (
    <div className="pt-24 pb-20 px-6 max-w-4xl mx-auto">
      {/* Encabezado */}
      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.4em] text-[#c8962a] uppercase mb-4">Escríbenos</p>
        <h1
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="text-4xl md:text-5xl text-[#ede4d2] font-normal mb-4"
        >
          Contacto
        </h1>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c8962a] to-transparent mx-auto mb-6" />
        <p className="text-[#9e8e78] max-w-xl mx-auto text-sm leading-relaxed">
          Para consultas sobre obras originales, láminas, precios o cualquier otra cuestión, escríbenos directamente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* Info */}
        <div className="md:col-span-2 flex flex-col gap-8">
          <div>
            <p className="text-xs tracking-[0.3em] text-[#c8962a] uppercase mb-3">Exposición</p>
            <p
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-lg text-[#ede4d2] mb-2"
            >
              Del 6 al 19 de abril
            </p>
            <p className="text-sm text-[#9e8e78] leading-relaxed">
              Centro Cívico del Albayzín<br />
              Plaza Aliatar<br />
              Granada
            </p>
          </div>

          <div className="w-full h-px bg-[#2e2416]" />

          <div>
            <p className="text-xs tracking-[0.3em] text-[#c8962a] uppercase mb-3">Obras y láminas</p>
            <p className="text-sm text-[#9e8e78] leading-relaxed">
              Para consultar precios de obras originales o realizar pedidos de láminas personalizados, usa el formulario o escríbenos directamente.
            </p>
          </div>
        </div>

        {/* Formulario */}
        <div className="md:col-span-3">
          {enviado ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
              <div className="text-4xl">✉️</div>
              <p
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-2xl text-[#ede4d2]"
              >
                Mensaje enviado
              </p>
              <p className="text-sm text-[#9e8e78]">
                Te responderemos lo antes posible. Gracias por tu interés en la obra de Borja Satrústegui.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-[#9e8e78] mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    required
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    className="w-full bg-[#1a150d] border border-[#2e2416] text-[#ede4d2] px-4 py-3 text-sm focus:outline-none focus:border-[#c8962a] transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-[#9e8e78] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#1a150d] border border-[#2e2416] text-[#ede4d2] px-4 py-3 text-sm focus:outline-none focus:border-[#c8962a] transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-[#9e8e78] mb-2">
                  Asunto
                </label>
                <select
                  value={form.asunto}
                  onChange={(e) => setForm({ ...form, asunto: e.target.value })}
                  className="w-full bg-[#1a150d] border border-[#2e2416] text-[#ede4d2] px-4 py-3 text-sm focus:outline-none focus:border-[#c8962a] transition-colors"
                >
                  <option value="info">Información general</option>
                  <option value="original">Consulta sobre obra original</option>
                  <option value="lamina">Pedido de lámina</option>
                  <option value="expo">Sobre la exposición</option>
                  <option value="prensa">Prensa / medios</option>
                </select>
              </div>

              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-[#9e8e78] mb-2">
                  Mensaje
                </label>
                <textarea
                  required
                  rows={6}
                  value={form.mensaje}
                  onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                  className="w-full bg-[#1a150d] border border-[#2e2416] text-[#ede4d2] px-4 py-3 text-sm focus:outline-none focus:border-[#c8962a] transition-colors resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#c8962a] text-[#0c0b09] text-xs tracking-[0.2em] uppercase font-semibold py-4 hover:bg-[#e2b24a] transition-all duration-300"
              >
                Enviar mensaje
              </button>

              <p className="text-xs text-[#6a5e50] text-center">
                Tus datos no serán compartidos con terceros.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
