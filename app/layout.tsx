import type { Metadata } from "next";
import { Fraunces, Mulish } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AdminProvider from "@/components/AdminProvider";
import BarraEdicion from "@/components/BarraEdicion";
import BotonSubir from "@/components/BotonSubir";

const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  style: ["normal", "italic"],
});

const sans = Mulish({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mulish",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://borjasatrustegui.online"),
  title: {
    default: "Borja Satrústegui — Pintor",
    template: "%s · Borja Satrústegui",
  },
  description:
    "Obra pictórica de Borja Satrústegui. Realismo social y expresionismo desde Granada. Dos salas —obra antigua y obra nueva— y consulta de obra disponible.",
  keywords: ["Borja Satrústegui", "pintura", "pintor", "Granada", "realismo social", "expresionismo"],
  openGraph: {
    title: "Borja Satrústegui — Pintor",
    description: "Realismo social y expresionismo desde Granada.",
    url: "https://borjasatrustegui.online",
    siteName: "Borja Satrústegui",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <AdminProvider>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
          <BotonSubir />
          <BarraEdicion />
        </AdminProvider>
      </body>
    </html>
  );
}
