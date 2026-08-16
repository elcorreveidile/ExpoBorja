"use client";

import { useEffect, useState } from "react";

export default function BotonSubir() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Subir al principio"
      className="fixed bottom-6 right-6 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-granate text-hueso text-xl shadow-lg hover:bg-granate-claro transition-colors"
    >
      ↑
    </button>
  );
}
