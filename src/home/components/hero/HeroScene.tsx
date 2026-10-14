import { CSSProperties } from "react";
import { Link } from "react-router";

export type SceneProduct = {
  name: string;
  href: string;
  image: string;
};

type Props = {
  products: SceneProduct[];
  crop: number;
  imageOf: (url: string, width: number) => string;
  className?: string;
};

const slots = [
  { x: 53, w: 19, bottom: 45, h: 46, z: 1 },
  { x: 78, w: 19, bottom: 25, h: 19, z: 5 },
  { x: 58, w: 13, bottom: 21, h: 16, z: 6 },
  { x: 83, w: 13, bottom: 40, h: 34, z: 1 },
  { x: 70, w: 15, bottom: 33, h: 26, z: 3 },
  { x: 42, w: 13, bottom: 35, h: 27, z: 2 },
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
      {products.slice(0, slots.length).map(({ name, href, image }, index) => {
        const { x, w, bottom, h, z } = slots[index];

        return (
          <Link
            key={href}
            to={href}
            aria-label={`Ver ${name}`}
            className="group absolute flex items-end justify-center"
            style={{ left: left(x), width: width(w), bottom: `${bottom}%`, height: `${h}%`, zIndex: z }}
          >
            <img
              src={imageOf(image, 500)}
              alt=""
              className="max-h-full max-w-full object-contain drop-shadow-[0_14px_14px_rgb(17_17_17/0.18)]
                transition-transform group-hover:-translate-y-1.5"
            />
          </Link>
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
