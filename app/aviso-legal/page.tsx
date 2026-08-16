import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Aviso legal del sitio web de Borja Satrústegui.",
};

export default function AvisoLegal() {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-6 pt-16 pb-24">
      <header className="mb-12">
        <p className="text-xs tracking-[0.32em] text-ocre uppercase font-semibold mb-4">Información legal</p>
        <h1 className="text-4xl sm:text-5xl text-tinta">Aviso legal</h1>
        <div className="filete mt-6" />
      </header>

      <div className="flex flex-col gap-8 text-tinta-suave leading-relaxed">
        <section>
          <h2 className="font-display text-xl text-tinta mb-3">Titular del sitio</h2>
          <p>
            En cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información y de
            Comercio Electrónico (LSSI-CE), se informa de que este sitio web es titularidad de:
          </p>
          <ul className="mt-3 flex flex-col gap-1">
            <li><strong className="text-tinta">Titular:</strong> Borja Satrústegui</li>
            <li><strong className="text-tinta">Actividad:</strong> exhibición de obra pictórica</li>
            <li><strong className="text-tinta">Localidad:</strong> Granada, España</li>
            <li><strong className="text-tinta">Contacto:</strong> a través del formulario de la web</li>
            <li><strong className="text-tinta">Sitio web:</strong> borjasatrustegui.online</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl text-tinta mb-3">Objeto</h2>
          <p>
            Este sitio tiene carácter informativo y divulgativo: presenta la obra pictórica del
            artista. No se realizan ventas ni transacciones económicas a través de la web; las
            consultas sobre obras se atienden por los canales de contacto indicados.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-tinta mb-3">Propiedad intelectual</h2>
          <p>
            Las obras, imágenes, textos y demás contenidos del sitio son propiedad de Borja
            Satrústegui o se utilizan con su autorización, y están protegidos por la normativa de
            propiedad intelectual. No está permitida su reproducción, distribución o uso sin
            consentimiento del titular.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-tinta mb-3">Responsabilidad</h2>
          <p>
            El titular procura mantener la información actualizada y libre de errores, pero no
            garantiza la ausencia de estos ni la disponibilidad ininterrumpida del sitio. El uso de
            la web se realiza bajo la responsabilidad del usuario.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-tinta mb-3">Legislación aplicable</h2>
          <p>
            Este aviso legal se rige por la legislación española. Para cualquier controversia serán
            competentes los juzgados y tribunales que correspondan conforme a la normativa vigente.
          </p>
        </section>
      </div>
    </div>
  );
}
