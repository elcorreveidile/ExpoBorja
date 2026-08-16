import type { MetadataRoute } from "next";
import { slugsPublicados } from "@/lib/obras";

export const dynamic = "force-dynamic";

const BASE = "https://borjasatrustegui.online";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fijas = ["", "/obra-nueva", "/obra-antigua", "/disponibles", "/sobre-borja", "/contacto"].map(
    (ruta) => ({ url: `${BASE}${ruta}`, changeFrequency: "monthly" as const, priority: ruta === "" ? 1 : 0.8 })
  );

  const obras = (await slugsPublicados()).map((slug) => ({
    url: `${BASE}/obra/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...fijas, ...obras];
}
