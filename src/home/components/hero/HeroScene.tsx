import { CSSProperties } from "react";

type SceneProduct = {
  name: string;
  slug: string;
  image: string;
};

type Props = {
  products: SceneProduct[];
  crop: number;
  imageOf: (url: string, width: number) => string;
  className?: string;
};

const slots = [
  { x: 53, w: 19, bottom: 42, h: 30 },
  { x: 87, w: 10, bottom: 33, h: 40 },
  { x: 42, w: 13, bottom: 32, h: 27 },
  { x: 70, w: 14, bottom: 36, h: 28 },
  { x: 77, w: 18, bottom: 27, h: 18 },
  { x: 58, w: 13, bottom: 18, h: 16 },
];

const strokes = [
  { x: 50.5, y: 29, rotate: -35 },
  { x: 51.5, y: 34.5, rotate: 5 },
  { x: 84, y: 8, rotate: -40 },
  { x: 86.5, y: 13, rotate: 15 },
];

export default function HeroScene({ products, crop, imageOf, className }: Props) {
  const left = (x: number) => `${(x - crop * 100) / (1 - crop)}%`;
  const width = (w: number) => `${w / (1 - crop)}%`;

  const badge: CSSProperties = { left: left(71), top: "6%", width: width(9.5) };

  return (
    <div className={className}>
      {products.slice(0, slots.length).map(({ name, slug, image }, index) => {
        const { x, w, bottom, h } = slots[index];

        return (
          <a
            key={slug}
            href={`#${slug}`}
            aria-label={`Ver ${name}`}
            className="group absolute flex items-end justify-center"
            style={{ left: left(x), width: width(w), bottom: `${bottom}%`, height: `${h}%` }}
          >
            <img
              src={imageOf(image, 500)}
              alt=""
              className="max-h-full max-w-full object-contain drop-shadow-[0_14px_14px_rgb(17_17_17/0.18)]
                transition-transform group-hover:-translate-y-1.5"
            />
          </a>
        );
      })}

      <span
        aria-hidden
        style={badge}
        className="absolute grid aspect-square place-items-center rounded-full bg-[#7b4bd6] text-center text-white
          shadow-card-hover"
      >
        <span className="leading-none">
          <small className="block text-[0.6rem] font-bold sm:text-sm">Hasta</small>
          <b className="block text-xl font-extrabold tracking-tight sm:text-4xl">40%</b>
          <small className="block text-[0.6rem] font-extrabold sm:text-sm">OFF</small>
        </span>
      </span>

      {strokes.map(({ x, y, rotate }) => (
        <span
          key={`${x}-${y}`}
          aria-hidden
          className="absolute h-1.5 w-[2.2%] min-w-3 rounded-full bg-brand"
          style={{ left: left(x), top: `${y}%`, transform: `rotate(${rotate}deg)` }}
        />
      ))}
    </div>
  );
}
