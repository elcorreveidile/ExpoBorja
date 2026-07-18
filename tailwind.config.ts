import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fondo: "#0c0b09",
        carta: "#1a150d",
        borde: "#2e2416",
        oro: "#c8962a",
        "oro-claro": "#e2b24a",
        "oro-oscuro": "#8a6418",
        crema: "#ede4d2",
        "crema-suave": "#b8aa96",
        ocre: "#c47a20",
        azul: "#2a3d5c",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Montserrat", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.3em",
      },
    },
  },
  plugins: [],
};

export default config;
