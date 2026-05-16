import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Borja Satrústegui — Pintor",
  description:
    "Galería de pintura de Borja Satrústegui. Realismo social, expresionismo y costumbrismo urbano desde Granada. Obras originales y láminas disponibles.",
  keywords: ["Borja Satrústegui", "pintura", "pintor", "Granada", "arte contemporáneo", "realismo social", "expresionismo"],
  openGraph: {
    title: "Borja Satrústegui — Pintor",
    description: "Realismo social, expresionismo y costumbrismo urbano desde Granada.",
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
