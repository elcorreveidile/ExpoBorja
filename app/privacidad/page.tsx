import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo se tratan tus datos en el sitio web de Borja Satrústegui.",
};

export default function Privacidad() {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-6 pt-16 pb-24">
      <header className="mb-12">
        <p className="text-xs tracking-[0.32em] text-ocre uppercase font-semibold mb-4">Protección de datos</p>
        <h1 className="text-4xl sm:text-5xl text-tinta">Política de privacidad</h1>
        <div className="filete mt-6" />
      </header>

      <div className="flex flex-col gap-8 text-tinta-suave leading-relaxed">
        <section>
          <h2 className="font-display text-xl text-tinta mb-3">Responsable del tratamiento</h2>
          <p>
            El responsable del tratamiento de los datos que facilites a través de este sitio es
            <strong className="text-tinta"> Borja Satrústegui</strong> (Granada, España). Puedes
            contactar a través del <Link href="/contacto" className="text-granate hover:underline">formulario de la web</Link>.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-tinta mb-3">Qué datos recogemos y para qué</h2>
          <p>
            Únicamente los que nos facilitas voluntariamente en el <strong className="text-tinta">formulario de contacto</strong>:
            tu <strong className="text-tinta">nombre</strong> y tu <strong className="text-tinta">correo electrónico</strong>,
            junto con el mensaje que escribas. Los usamos con una sola finalidad: <strong className="text-tinta">responder a tu consulta</strong>.
            No se emplean para publicidad ni para elaborar perfiles.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-tinta mb-3">Base legal</h2>
          <p>
            El tratamiento se basa en tu <strong className="text-tinta">consentimiento</strong>, que
            otorgas al enviar el formulario. Para verificar que la dirección es real y evitar el spam,
            te enviamos un código a tu correo antes de tramitar el mensaje.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-tinta mb-3">Conservación</h2>
          <p>
            Conservamos tus datos el tiempo necesario para atender tu consulta y, después, durante el
            plazo legalmente exigible. Cuando dejan de ser necesarios, se eliminan.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-tinta mb-3">Destinatarios</h2>
          <p>
            No cedemos tus datos a terceros con fines comerciales. Para el funcionamiento de la web
            colaboramos con proveedores que actúan como encargados del tratamiento y cumplen la
            normativa vigente: <strong className="text-tinta">Brevo</strong> (envío de correos),
            y <strong className="text-tinta">Vercel</strong> y <strong className="text-tinta">Neon</strong> (alojamiento
            y base de datos).
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-tinta mb-3">Tus derechos</h2>
          <p>
            Puedes ejercer tus derechos de <strong className="text-tinta">acceso, rectificación,
            supresión, oposición, limitación y portabilidad</strong> escribiéndonos por el
            formulario de contacto. También puedes reclamar ante la Agencia Española de Protección
            de Datos (<span className="whitespace-nowrap">www.aepd.es</span>) si lo consideras necesario.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl text-tinta mb-3">Cookies</h2>
          <p>
            Esta web <strong className="text-tinta">no utiliza cookies de análisis, seguimiento ni
            publicidad</strong>. Únicamente se emplea una cookie técnica de sesión cuando el artista
            accede a su panel privado de administración; es necesaria para su funcionamiento y está
            exenta de consentimiento. Como visitante, la web no instala cookies en tu dispositivo.
          </p>
        </section>
      </div>
    </div>
  );
}
