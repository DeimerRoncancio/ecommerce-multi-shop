import { Link } from "react-router";
import { FiArrowRight } from "react-icons/fi";
import ProductImage from "../../../shared/ui/ProductImage";
import { categoryStyle } from "../../../shared/utilities/category-color";
import { formatPrice } from "../../../shared/utilities/format-price";
import { ProductTypes } from "../../../products/types/product";

type Props = {
  products: ProductTypes[];
};

const cardPositions = [
  "left-[6%] top-1 z-10 -rotate-3",
  "right-[8%] top-0 rotate-3",
  "bottom-0 right-[2%] z-20 -rotate-2",
];

export default function HeroBanner({ products }: Props) {
  return (
    <section className="relative grid overflow-hidden rounded-2xl bg-brand text-white lg:grid-cols-[1.05fr_1fr]">
      <span aria-hidden className="absolute -right-24 -top-28 h-96 w-96 rounded-full bg-brand-dark" />
      <span aria-hidden className="absolute -bottom-40 right-1/3 h-72 w-72 rounded-full bg-brand-dark/60" />

      <div className="relative flex flex-col items-start gap-4 p-7 sm:p-10">
        <span className="bg-ink px-2.5 py-1 text-[0.7rem] font-extrabold uppercase tracking-[0.08em]">
          Semana Multi · 14 al 20 de octubre
        </span>

        <h1 className="text-4xl font-extrabold leading-[1.1] sm:text-5xl">
          Hasta <mark className="whitespace-nowrap bg-sun px-2 text-ink">40% off</mark>
          <br />
          en todo el carrito
        </h1>

        <p className="max-w-sm font-semibold text-white/95">
          Tecnología, gamer, cocina y más. Envío gratis a toda Colombia y 30 días para devolver.
        </p>

        <div className="mt-2 flex flex-wrap gap-2.5">
          <a
            href="#precios-bajos"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 font-bold text-white transition-colors
              hover:bg-white hover:text-ink"
          >
            Ver ofertas
            <FiArrowRight size={17} />
          </a>
          <a
            href="#catalogo"
            className="inline-flex h-12 items-center rounded-full bg-white px-6 font-bold text-ink transition-colors
              hover:bg-ink hover:text-white"
          >
            Explorar categorías
          </a>
        </div>
      </div>

      <div className="relative hidden min-h-88 lg:block">
        <span aria-hidden className="absolute -right-10 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-lilac" />

        <div className="absolute inset-x-6 inset-y-7">
          {products.slice(0, cardPositions.length).map((product, index) => {
            const category = product.categories[0]?.categoryName;

            return (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                style={categoryStyle(category)}
                className={`absolute block w-44 rounded-xl bg-white p-2.5 text-ink shadow-card-hover transition-transform
                  duration-200 hover:z-30 hover:rotate-0 hover:scale-105 xl:w-48 ${cardPositions[index]}`}
              >
                <span className="block h-20 rounded-lg bg-cream p-2">
                  <ProductImage
                    src={product.images[0]?.imageUrl}
                    width={240}
                    alt={product.name}
                    className="mix-blend-darken"
                    loading="eager"
                  />
                </span>
                {category && (
                  <span className="mt-2 flex items-center gap-1.5 text-[0.7rem] font-semibold text-ink-soft">
                    <span className="h-1.5 w-1.5 rounded-full bg-(--cat)" />
                    {category}
                  </span>
                )}
                <span className="block truncate text-sm font-extrabold">{product.name}</span>
                <span className="mt-1 flex items-center gap-1.5 text-[0.7rem] text-ink-muted">
                  desde
                  <b className="bg-sun px-1.5 py-0.5 text-xs font-extrabold text-ink">{formatPrice(product.price)}</b>
                </span>
              </Link>
            );
          })}

          <span
            aria-hidden
            className="absolute bottom-1 left-0 z-20 grid h-24 w-24 -rotate-12 place-items-center rounded-full bg-sun
              text-center text-ink shadow-card-hover"
          >
            <span className="leading-none">
              <small className="block text-[0.65rem] font-extrabold uppercase tracking-wide">Hasta</small>
              <b className="text-3xl font-extrabold tracking-tight">-40%</b>
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
