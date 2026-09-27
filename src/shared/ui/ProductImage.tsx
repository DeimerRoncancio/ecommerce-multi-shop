import { useEffect, useState } from "react";
import { productImage, productImageFull } from "../utilities/product-image";

const STORAGE_KEY = "multishop:fondos-opacos";

const LIMIT = 8;
const memory = new Map<string, boolean>();
const inFlight = new Map<string, Promise<boolean>>();

const readStorage = (): Record<string, boolean> => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
};

const writeStorage = (id: string, opaque: boolean) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...readStorage(), [id]: opaque }));
  } catch {
    // Modo incógnito o almacenamiento bloqueado: se vive sin caché.
  }
};

const idOf = (url: string) => url.split("/").pop() ?? url;

const measure = async (url: string) => {
  const small = url.replace(/w_\d+/, "w_40");
  const bitmap = await createImageBitmap(await fetch(small).then(r => r.blob()));

  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;

  const context = canvas.getContext("2d");
  if (!context) return false;

  context.fillStyle = "#fff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(bitmap, 0, 0);

  const right = canvas.width - 1;
  const bottom = canvas.height - 1;

  const corners = [[0, 0], [right, 0], [0, bottom], [right, bottom]].map(
    ([x, y]) => context.getImageData(x, y, 1, 1).data,
  );

  const total = corners.reduce((sum, [r, g, b]) => {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    return sum + (max === 0 ? 0 : (max - min) / max);
  }, 0);

  return (100 * total) / corners.length > LIMIT;
};

const isOpaque = (url: string) => {
  const id = idOf(url);

  const known = memory.get(id) ?? readStorage()[id];
  if (known !== undefined) return Promise.resolve(known);

  const running = inFlight.get(id);
  if (running) return running;

  const promise = measure(url)
    .catch(() => false)
    .then(result => {
      memory.set(id, result);
      writeStorage(id, result);
      inFlight.delete(id);

      return result;
    });

  inFlight.set(id, promise);

  return promise;
};

const blurOf = (width: number) => {
  if (width >= 800) return "blur-2xl";
  if (width >= 400) return "blur-xl";
  if (width >= 250) return "blur-lg";

  return "blur-sm";
};

type Props = {
  src: string | undefined | null;
  alt: string;
  width: number;
  className?: string;
  loading?: "lazy" | "eager";
};

export default function ProductImage({ src, alt, width, className, loading }: Props) {
  const [opaque, setOpaque] = useState(false);

  const padded = productImage(src, width);

  useEffect(() => {
    if (!padded) return;

    let vivo = true;
    isOpaque(padded).then(result => vivo && setOpaque(result));

    return () => {
      vivo = false;
    };
  }, [padded]);

  const classes = `h-full w-full object-contain ${className ?? ""}`;

  if (!opaque) return <img src={padded} alt={alt} loading={loading} className={classes} />;

  const full = productImageFull(src, width);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <img
        src={full}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full scale-150 object-cover saturate-125 ${blurOf(width)}`}
      />

      <img src={full} alt={alt} loading={loading} className={`relative ${classes}`} />
    </div>
  );
}
