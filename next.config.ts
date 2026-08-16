import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fija la raíz del proyecto para que Turbopack no infiera mal el workspace
  // por un package-lock.json suelto en el home del usuario.
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/galeria", destination: "/obra-nueva", permanent: true },
      { source: "/obras-siglo-xx", destination: "/obra-antigua", permanent: true },
      { source: "/tienda", destination: "/disponibles", permanent: true },
      { source: "/exposicion", destination: "/obra-nueva", permanent: true },
    ];
  },
};

export default nextConfig;
