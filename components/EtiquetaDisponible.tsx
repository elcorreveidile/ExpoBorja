export default function EtiquetaDisponible({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] tracking-[0.12em] uppercase font-semibold text-hueso bg-granate px-2.5 py-1 rounded-sm ${className}`}
    >
      <span className="block w-1.5 h-1.5 rounded-full bg-hueso/90" aria-hidden="true" />
      Disponible
    </span>
  );
}
