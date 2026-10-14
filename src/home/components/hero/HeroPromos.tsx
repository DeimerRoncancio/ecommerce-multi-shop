import { FiArrowRight } from "react-icons/fi";
import ProductImage from "../../../shared/ui/ProductImage";
import { categoryStyle } from "../../../shared/utilities/category-color";
import { formatPrice } from "../../../shared/utilities/format-price";
import { heroPromos } from "../../constants/home.helper";
import { HeroCategory } from "./HomeHero";

type Props = {
  categories: HeroCategory[];
};

export default function HeroPromos({ categories }: Props) {
  const promos = heroPromos.flatMap(promo => {
    const category = categories.find(({ name }) => name === promo.category);
    return category ? [{ ...promo, ...category }] : [];
  });

  if (!promos.length) return null;

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {promos.map(({ category, title, text, slug, cover, fromPrice }) => (
        <a
          key={category}
          href={`#${slug}`}
          style={categoryStyle(category)}
          className="group relative flex min-h-56 overflow-hidden rounded-xl bg-(--cat-soft) p-6 sm:p-7"
        >
          <span className="relative z-10 flex max-w-[55%] flex-col items-start gap-2">
            <span className="flex items-center gap-2 text-[0.7rem] font-extrabold uppercase tracking-[0.08em] text-(--cat)">
              <span className="h-2 w-2 rounded-full bg-(--cat)" />
              {category}
            </span>
            <span className="text-3xl font-extrabold leading-tight text-ink">{title}</span>
            <span className="text-sm text-ink-soft">{text}</span>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-bold text-ink group-hover:underline">
              Ver {category} <FiArrowRight size={15} className="text-brand" />
            </span>
          </span>

          <span
            aria-hidden
            className="absolute -bottom-12 right-2 h-24 w-52 rounded-[50%] bg-(--cat) sm:right-6 sm:w-60"
          />
          <span
            className="absolute bottom-8 right-8 block h-28 w-28 sm:right-16
              sm:h-36 sm:w-36"
          >
            <ProductImage
              src={cover}
              width={300}
              alt=""
              className="transition-transform group-hover:-translate-y-1.5"
              cutoutClassName="mix-blend-darken"
            />
          </span>

          {fromPrice !== null && (
            <span className="absolute right-4 top-4 z-10 rounded-full bg-white px-3 py-1 text-xs text-ink-muted shadow-card-hover">
              desde <b className="font-extrabold text-ink">{formatPrice(fromPrice)}</b>
            </span>
          )}
        </a>
      ))}
    </section>
  );
}
