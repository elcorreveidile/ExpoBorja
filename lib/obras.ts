// Fuente única de datos de las obras.
// Consolida los antiguos arrays dispersos (galería, obra antigua, tienda) en un
// solo catálogo con títulos canónicos. Este mismo modelo alimentará después el
// seed de la base de datos (ver plan, Fase 1), por eso los campos coinciden con
// el futuro esquema de Postgres.

import { leerOverrides, leerNuevas } from "./store";

export type Epoca = "nueva" | "antigua";

export interface Obra {
  slug: string;
  referencia: string; // código de catálogo, p.ej. "BS-001" (para el formulario "Consultar")
  numero: number | null; // nº correlativo por sala; el pintor no titula las obras
  // Etiqueta interna para reconocer la obra en el admin. NO se muestra en público
  // (el pintor no quiere títulos): en la web las obras aparecen como «Sin título · Nº N».
  titulo: string;
  epoca: Epoca;
  tecnica: string | null;
  anio: number | null;
  medidas: string | null;
  descripcion: string | null;
  imagen: string;
  disponible: boolean;
  publicada: boolean;
  destacada: boolean;
  oculta?: boolean; // "eliminada" por Borja (recuperable desde la papelera)
}

// Datos "en bruto" (sin referencia ni número, que se asignan al final).
type ObraRaw = Omit<Obra, "referencia" | "numero">;

// --- SALA: OBRA NUEVA (títulos canónicos procedentes de la antigua tienda) ---
const nueva: ObraRaw[] = [
  { slug: "reflejos", titulo: "Las Bañistas", epoca: "nueva", tecnica: "Óleo sobre lienzo", anio: null, medidas: null, imagen: "/obras/reflejos.jpg", disponible: false, publicada: true, destacada: false, descripcion: "Figuras femeninas y sus reflejos invertidos en el agua. Composición serena que dialoga con la tradición clásica del desnudo." },
  { slug: "justicia", titulo: "Justicia Social", epoca: "nueva", tecnica: "Óleo sobre lienzo", anio: null, medidas: null, imagen: "/obras/justicia.jpg", disponible: false, publicada: true, destacada: true, descripcion: "Marea humana de puños alzados. El marco mismo se convierte en soporte del texto: palabras que son grito." },
  { slug: "planideras", titulo: "Las Plañideras", epoca: "nueva", tecnica: "Óleo sobre lienzo", anio: null, medidas: null, imagen: "/obras/planideras.jpg", disponible: false, publicada: true, destacada: false, descripcion: "Figuras envueltas en oro y blanco, tendidas en larga procesión. Duelo colectivo de resonancias antiguas." },
  { slug: "puente", titulo: "El Puente", epoca: "nueva", tecnica: "Óleo sobre lienzo", anio: null, medidas: null, imagen: "/obras/puente.jpg", disponible: true, publicada: true, destacada: true, descripcion: "Una familia avanza entre la multitud sobre un puente nocturno. El éxodo contemporáneo, la soledad en la marea." },
  { slug: "republica", titulo: "República", epoca: "nueva", tecnica: "Óleo sobre tabla", anio: null, medidas: null, imagen: "/obras/republica.jpg", disponible: false, publicada: true, destacada: true, descripcion: "Una figura femenina alza la palabra República sobre una masa de cráneos. Alegoría de la memoria histórica." },
  { slug: "camino", titulo: "El Camino", epoca: "nueva", tecnica: "Óleo sobre lienzo", anio: null, medidas: null, imagen: "/obras/camino.jpg", disponible: false, publicada: true, destacada: false, descripcion: "Dos filas de figuras en blanco convergen hacia una esfera dorada alada. Imagen de búsqueda y trascendencia." },
  { slug: "arquero", titulo: "El Arquero", epoca: "nueva", tecnica: "Óleo sobre lienzo", anio: null, medidas: null, imagen: "/obras/arquero.jpg", disponible: false, publicada: true, destacada: false, descripcion: "Un arquero desnudo apunta a una multitud flanqueada por un esqueleto. Danza de la muerte de raíz medieval." },
  { slug: "manos", titulo: "Las Manos", epoca: "nueva", tecnica: "Óleo sobre lienzo", anio: null, medidas: null, imagen: "/obras/manos.jpg", disponible: false, publicada: true, destacada: false, descripcion: "Un bosque de brazos y manos con texto superpuesto. La escritura y el cuerpo como materia inseparable." },
  { slug: "arlequin", titulo: "El Arlequín", epoca: "nueva", tecnica: "Óleo sobre lienzo", anio: null, medidas: null, imagen: "/obras/arlequin.jpg", disponible: false, publicada: true, destacada: true, descripcion: "Un arlequín y una figura desnuda juegan a las cartas sobre fondos rojos. Guiño a Picasso, tensión y complicidad." },
  { slug: "tablao", titulo: "El Tablao", epoca: "nueva", tecnica: "Óleo sobre lienzo", anio: null, medidas: null, imagen: "/obras/tablao.jpg", disponible: false, publicada: true, destacada: false, descripcion: "Escena de flamenco: brazos, cuerpos y guitarras en la calidez de un tablao granadino." },
  { slug: "multitud", titulo: "La Multitud", epoca: "nueva", tecnica: "Óleo sobre tabla", anio: null, medidas: null, imagen: "/obras/multitud.jpg", disponible: false, publicada: true, destacada: false, descripcion: "Una muchedumbre densa ante la figura de la muerte. Lo cotidiano y lo existencial en un espacio expresionista." },
  { slug: "encuentro", titulo: "El Encuentro", epoca: "nueva", tecnica: "Óleo sobre tabla", anio: null, medidas: null, imagen: "/obras/encuentro.jpg", disponible: false, publicada: true, destacada: false, descripcion: "Dos rostros en tensión expresionista. Trazo libre y colores de gran intensidad." },
  { slug: "flores", titulo: "Adelfas", epoca: "nueva", tecnica: "Óleo sobre lienzo", anio: null, medidas: null, imagen: "/obras/flores.jpg", disponible: false, publicada: true, destacada: false, descripcion: "Flores amarillas sobre azul violeta. Rareza botánica en la obra de Satrústegui: belleza sin más pretensión." },
  { slug: "jubilo", titulo: "Júbilo", epoca: "nueva", tecnica: "Óleo sobre lienzo", anio: null, medidas: null, imagen: "/obras/jubilo.jpg", disponible: false, publicada: true, destacada: false, descripcion: "Una multitud de figuras alza los brazos bajo un cielo estrellado. Éxtasis colectivo de la humanidad congregada entre haces de luz." },
  { slug: "eden", titulo: "Edén", epoca: "nueva", tecnica: "Óleo sobre lienzo", anio: null, medidas: null, imagen: "/obras/eden.jpg", disponible: false, publicada: true, destacada: false, descripcion: "Adán y Eva flanquean un arco de cielo azul sobre una multitud de rostros. El mito del origen ante la muchedumbre." },
  { slug: "monjas", titulo: "Monjas", epoca: "nueva", tecnica: "Óleo sobre cartón", anio: null, medidas: null, imagen: "/obras/monjas.jpg", disponible: false, publicada: true, destacada: false, descripcion: "Religiosas y figuras desnudas habitan mundos paralelos separados por un umbral." },
  { slug: "espejo", titulo: "El Espejo", epoca: "nueva", tecnica: "Óleo sobre cartón", anio: null, medidas: null, imagen: "/obras/espejo.jpg", disponible: false, publicada: true, destacada: false, descripcion: "Una mujer de amarillo y su reflejo en un espacio surreal. La identidad y el doble en tonos verdes y ocres." },
  { slug: "calle", titulo: "Calle", epoca: "nueva", tecnica: "Óleo sobre cartón", anio: null, medidas: null, imagen: "/obras/calle.jpg", disponible: false, publicada: true, destacada: false, descripcion: "Dos figuras avanzan por una calle de tonos azules y cálidos. El tiempo detenido de la vida ordinaria." },
  { slug: "poder", titulo: "El Poder", epoca: "nueva", tecnica: "Óleo sobre tabla", anio: null, medidas: null, imagen: "/obras/poder.jpg", disponible: false, publicada: true, destacada: false, descripcion: "Una mano gigante desciende sobre una masa de humanidad. Símbolo crudo del dominio y la pequeñez." },
  { slug: "cabinas", titulo: "Las Cabinas", epoca: "nueva", tecnica: "Óleo sobre cartón", anio: null, medidas: null, imagen: "/obras/cabinas.jpg", disponible: false, publicada: true, destacada: false, descripcion: "Figuras atrapadas en cabinas transparentes, un pájaro en el suelo. El absurdo kafkiano hecho pintura." },
  { slug: "medicos", titulo: "Los Médicos", epoca: "nueva", tecnica: "Óleo sobre lienzo", anio: null, medidas: null, imagen: "/obras/medicos.jpg", disponible: false, publicada: true, destacada: false, descripcion: "Tres figuras con bata blanca ante una mesa con especímenes. La ciencia y sus rituales en clave de misterio." },
  { slug: "exodus", titulo: "El Éxodo", epoca: "nueva", tecnica: "Óleo sobre tabla", anio: null, medidas: null, imagen: "/obras/exodus.jpg", disponible: false, publicada: true, destacada: false, descripcion: "Dos manos blancas y enormes flanquean una multitud en marcha con un niño. La huida, lo sagrado, el miedo." },
  { slug: "pensamiendia", titulo: "Pensamendía", epoca: "nueva", tecnica: "Óleo sobre lienzo", anio: null, medidas: null, imagen: "/obras/pensamiendia.jpg", disponible: false, publicada: true, destacada: false, descripcion: "Dos hileras de figuras coronadas de flores se miran sobre fondo dorado. El pensamiento como diálogo infinito." },
  { slug: "umbral", titulo: "El Umbral", epoca: "nueva", tecnica: "Óleo sobre lienzo", anio: null, medidas: null, imagen: "/obras/umbral.jpg", disponible: false, publicada: true, destacada: false, descripcion: "Una figura desnuda se abraza a un pilar oscuro mirando al cielo. El gesto de quien está en el límite entre dos mundos." },
  { slug: "arena", titulo: "La Arena", epoca: "nueva", tecnica: "Óleo sobre tabla", anio: null, medidas: null, imagen: "/obras/arena.jpg", disponible: true, publicada: true, destacada: false, descripcion: "Una multitud de cuerpos se agolpa en un espacio oval rosado. El rebaño, la masa, la soledad en el número." },
  { slug: "corredor", titulo: "El Corredor", epoca: "nueva", tecnica: "Óleo sobre lienzo", anio: null, medidas: null, imagen: "/obras/corredor.jpg", disponible: false, publicada: true, destacada: false, descripcion: "Figuras en bata forman una fila en un corredor institucional nocturno. La burocracia como jaula." },
  { slug: "primavera", titulo: "La Primavera", epoca: "nueva", tecnica: "Óleo sobre tabla", anio: null, medidas: null, imagen: "/obras/primavera.jpg", disponible: false, publicada: true, destacada: false, descripcion: "Madres e hijos desnudos en un campo verde bajo cielo azul. La vida que florece sin permiso ni pudor." },
  { slug: "pandemia", titulo: "Pandemia", epoca: "nueva", tecnica: "Óleo sobre tabla", anio: null, medidas: null, imagen: "/obras/coleccion-particular.jpg", disponible: false, publicada: true, destacada: false, descripcion: "Obra que refleja la crisis sanitaria global desde la mirada única de Satrústegui. Colección particular." },
];

// --- SALA: OBRA ANTIGUA (obras con nombre propio) ---
const antiguaNombrada: ObraRaw[] = [
  { slug: "madre", titulo: "La Madre", epoca: "antigua", tecnica: "Pastel sobre papel", anio: null, medidas: null, imagen: "/obras/madre.jpg", disponible: false, publicada: true, destacada: false, descripcion: "Dos figuras sostienen un bebé entre campos dorados. Ternura y simbolismo de fuerza primitiva." },
  { slug: "procesion", titulo: "La Procesión", epoca: "antigua", tecnica: "Óleo sobre tabla", anio: null, medidas: null, imagen: "/obras/procesion.jpg", disponible: true, publicada: true, destacada: false, descripcion: "Una escena dentro de un cuadro. Figuras enmarcadas por rostros que observan desde los bordes del lienzo." },
  { slug: "maternidad", titulo: "Maternidad", epoca: "antigua", tecnica: "Óleo sobre lienzo", anio: null, medidas: null, imagen: "/obras/maternidad.jpg", disponible: true, publicada: true, destacada: false, descripcion: "La fuerza primigenia de la maternidad. Figura femenina que sostiene la vida con gesto protector y mirada serena." },
  { slug: "retrato-i", titulo: "Retrato I", epoca: "antigua", tecnica: "Óleo sobre tabla", anio: null, medidas: null, imagen: "/obras/retrato1.jpg", disponible: false, publicada: true, destacada: false, descripcion: "Rostro humano capturado con la intensidad expresionista característica del autor." },
  { slug: "retrato-ii", titulo: "Retrato II", epoca: "antigua", tecnica: "Óleo sobre tabla", anio: null, medidas: null, imagen: "/obras/retrato2.jpg", disponible: false, publicada: true, destacada: false, descripcion: "Segunda aproximación al género del retrato. El rostro como territorio de emociones y narrativas silenciosas." },
  // Retirada de las salas en su día; se conserva como borrador (no publicada) para que la revises en el admin.
  { slug: "panadero", titulo: "El Panadero", epoca: "antigua", tecnica: "Óleo sobre lienzo", anio: null, medidas: null, imagen: "/obras/panadero.jpg", disponible: false, publicada: false, destacada: false, descripcion: "La dignidad del trabajo cotidiano en una cocina de suelo a cuadros." },
];

// --- SALA: OBRA ANTIGUA · serie "Momentos" (sin título documentado todavía) ---
const numerosMomentos = [463, 466, 467, 470, 471, 473, 481, 484, 485, 489, 491, 492, 493, 494, 495, 496];
const momentos: ObraRaw[] = numerosMomentos.map((n) => ({
  slug: `momento-${n}`,
  titulo: "Sin título",
  epoca: "antigua",
  tecnica: "Óleo sobre papel",
  anio: null,
  medidas: null,
  imagen: `/obras-blog/abril-${n}.jpg`,
  disponible: false,
  publicada: true,
  destacada: false,
  descripcion: null,
}));

// --- SALA: OBRA ANTIGUA · resto de piezas (pendientes de titular en el admin) ---
const numerosAntigua = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27, 28, 29];
const antiguaExtra: ObraRaw[] = numerosAntigua.map((n) => ({
  slug: `obra-antigua-${n}`,
  titulo: "Sin título",
  epoca: "antigua",
  tecnica: "Óleo",
  anio: null,
  medidas: null,
  imagen: `/obras-nuevas/obra-nueva-${n}.jpg`,
  disponible: false,
  publicada: true,
  destacada: false,
  descripcion: null,
}));

// Catálogo combinado. La referencia BS-NNN se asigna por orden estable.
const crudas: ObraRaw[] = [...nueva, ...antiguaNombrada, ...momentos, ...antiguaExtra];

// Base con referencia estable (BS-NNN), independiente de los cambios de Borja.
const base: Obra[] = crudas.map((o, i) => ({
  ...o,
  referencia: `BS-${String(i + 1).padStart(3, "0")}`,
  numero: null,
}));

// Catálogo efectivo = base + cambios de Borja (sala y disponibilidad), con el
// número correlativo por sala recalculado sobre las obras publicadas.
export async function catalogo(): Promise<Obra[]> {
  const [overrides, nuevas] = await Promise.all([leerOverrides(), leerNuevas()]);
  // Obras añadidas por Borja (con foto subida) se suman a las del catálogo base.
  const anadidas: Obra[] = nuevas.map((n) => ({
    slug: n.slug,
    referencia: n.referencia,
    numero: null,
    titulo: "",
    epoca: n.epoca,
    tecnica: null,
    anio: null,
    medidas: null,
    descripcion: null,
    imagen: n.imagen,
    disponible: n.disponible,
    publicada: true,
    destacada: false,
  }));
  const todas = [...base, ...anadidas];
  const contadores: Record<Epoca, number> = { nueva: 0, antigua: 0 };
  return todas.map((o) => {
    const merged = overrides[o.slug] ? { ...o, ...overrides[o.slug] } : o;
    let numero: number | null = null;
    if (merged.publicada && !merged.oculta) {
      contadores[merged.epoca] += 1;
      numero = contadores[merged.epoca];
    }
    return { ...merged, numero };
  });
}

// Una obra es visible en público si está publicada y no la ha ocultado Borja.
function visible(o: Obra): boolean {
  return o.publicada && !o.oculta;
}

// Etiqueta pública de una obra (el pintor no titula): «Sin título · Nº N».
export function etiquetaObra(o: Obra): string {
  return o.numero ? `Sin título · Nº ${o.numero}` : "Sin título";
}

// --- Consultas de lectura ---

export async function obrasPorEpoca(epoca: Epoca): Promise<Obra[]> {
  return (await catalogo()).filter((o) => visible(o) && o.epoca === epoca);
}

export async function obrasDisponibles(): Promise<Obra[]> {
  return (await catalogo()).filter((o) => visible(o) && o.disponible);
}

export async function obrasDestacadas(): Promise<Obra[]> {
  return (await catalogo()).filter((o) => visible(o) && o.destacada);
}

// Obras "eliminadas" por Borja (para la papelera del acceso privado).
export async function obrasOcultas(): Promise<Obra[]> {
  return (await catalogo()).filter((o) => o.publicada && o.oculta);
}

export async function obraPorSlug(slug: string): Promise<Obra | undefined> {
  return (await catalogo()).find((o) => o.slug === slug);
}

export async function obraPorReferencia(referencia: string): Promise<Obra | undefined> {
  return (await catalogo()).find((o) => o.referencia === referencia);
}

export async function slugsPublicados(): Promise<string[]> {
  return (await catalogo()).filter(visible).map((o) => o.slug);
}
