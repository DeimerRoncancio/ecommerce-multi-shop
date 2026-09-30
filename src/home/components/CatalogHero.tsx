import { useState } from "react";
import { Link } from "react-router";
import { FiArrowRight, FiCheckCircle, FiTruck } from "react-icons/fi";
import PriceTag from "../../shared/ui/PriceTag";
import ProductImage from "../../shared/ui/ProductImage";
import { categoryStyle } from "../../shared/utilities/category-color";
import { slugify } from "../../shared/utilities/slugify";
import { ProductTypes } from "../../products/types/product";
import { heroPerks } from "../constants/home.helper";

type Props = {
  product: ProductTypes;
};

export default function CatalogHero({ product }: Props) {
  const mainCategory = product.categories[0]?.categoryName;
  const thumbs = product.images.slice(0, 4);
  const [current, setCurrent] = useState(0);
  const image = thumbs[current] ?? thumbs[0];

  return (
    <section
      style={categoryStyle(mainCategory)}
      className="grid border border-t-4 border-line border-t-(--cat,var(--color-brand)) md:grid-cols-2"
    >
      <div className="relative flex flex-col bg-(--cat-soft,var(--color-cream))">
        <span className="absolute left-4 top-4 z-10 bg-ink px-2.5 py-1 text-xs font-bold uppercase tracking-wider
          text-white">
          Destacado
        </span>

        <span
          aria-hidden
          className="absolute right-5 top-5 z-10 grid h-20 w-20 rotate-12 place-items-center rounded-full bg-brand
            text-center text-xs font-extrabold leading-tight text-white shadow-card-hover"
        >
          <span>
            <FiTruck size={18} className="mx-auto mb-0.5" />
            Envío
            <br />
            gratis
          </span>
        </span>

        <Link
          to={`/product/${product.id}`}
          className="group grid flex-1 place-items-center p-8 lg:min-h-96"
          aria-label={`Ver ${product.name}`}
        >
          <span className="block w-3/4 max-w-sm">
            <ProductImage
              key={image?.imageId}
              src={image?.imageUrl}
              width={700}
              alt={product.name}
              className="mix-blend-darken transition-transform duration-300 group-hover:scale-105"
            />
          </span>
        </Link>

        {thumbs.length > 1 && (
          <ul className="flex justify-center gap-2 pb-5">
            {thumbs.map((thumb, index) => (
              <li key={thumb.imageId}>
                <button
                  type="button"
                  onClick={() => setCurrent(index)}
                  onMouseEnter={() => setCurrent(index)}
                  aria-label={`Ver foto ${index + 1} de ${product.name}`}
                  aria-pressed={index === current}
                  className={`block h-14 w-14 border-2 bg-base-100 p-1.5 transition-colors ${
                    index === current ? "border-(--cat,var(--color-brand))" : "border-transparent hover:border-line"
                  }`}
                >
                  <ProductImage src={thumb.imageUrl} width={120} alt="" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-col">
        <div className="flex flex-1 flex-col justify-center gap-4 p-7 sm:p-10">
          {product.categories.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {product.categories.map(({ categoryName }) => (
                <li
                  key={categoryName}
                  style={categoryStyle(categoryName)}
                  className="bg-(--cat) px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white"
                >
                  {categoryName}
                </li>
              ))}
            </ul>
          )}

          <h1 className="text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl">{product.name}</h1>

          {product.description && (
            <p className="line-clamp-2 max-w-md text-ink-soft">{product.description}</p>
          )}

          <div className="flex flex-wrap items-end gap-x-5 gap-y-3">
            <PriceTag price={product.price} label="Precio" size="lg" />
            <p className="flex items-center gap-1.5 pb-1 text-sm font-bold text-success">
              <FiCheckCircle size={16} />
              En stock · listo para despacho
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to={`/product/${product.id}`}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-7 font-bold text-white
                transition-colors hover:bg-ink"
            >
              Ver producto
              <FiArrowRight size={17} />
            </Link>
            {mainCategory && (
              <Link
                to={`/#${slugify(mainCategory)}`}
                className="inline-flex h-12 items-center rounded-full border-2 border-(--cat) px-6 font-bold
                  text-(--cat) transition-colors hover:bg-(--cat) hover:text-white"
              >
                Más de {mainCategory}
              </Link>
            )}
          </div>
        </div>

        <ul className="grid grid-cols-3 divide-x divide-line border-t border-line">
          {heroPerks.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex flex-col items-center gap-1.5 px-2 py-3 text-center xl:flex-row xl:gap-2.5 xl:px-5 xl:py-4
              xl:text-left">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-(--cat-soft,var(--color-cream))
                text-(--cat,var(--color-brand))">
                <Icon size={16} />
              </span>
              <span className="min-w-0 leading-tight xl:whitespace-nowrap">
                <span className="block text-sm font-bold text-ink">{title}</span>
                <span className="block text-xs text-ink-muted">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
