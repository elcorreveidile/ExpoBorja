import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Borja Satrústegui — Exposición de Pintura",
  description:
    "Exposición de pintura de Borja Satrústegui. Del 6 al 19 de abril en el Centro Cívico del Albayzín, Granada. Obras originales y láminas disponibles.",
  keywords: ["Borja Satrústegui", "pintura", "exposición", "Granada", "Albayzín", "arte contemporáneo"],
  openGraph: {
    title: "Borja Satrústegui — Exposición de Pintura",
    description: "Del 6 al 19 de abril en el Centro Cívico del Albayzín, Granada.",
    url: "https://borjasatrustegui.com",
    siteName: "Borja Satrústegui",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col bg-[#0c0b09] text-[#ede4d2]">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
