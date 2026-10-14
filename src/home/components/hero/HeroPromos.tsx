import { FiArrowRight } from "react-icons/fi";
import ProductImage from "../../../shared/ui/ProductImage";
import { categoryStyle } from "../../../shared/utilities/category-color";
import { formatPrice } from "../../../shared/utilities/format-price";
import { slugify } from "../../../shared/utilities/slugify";
import { heroPromos } from "../../constants/home.helper";
import { CatalogSection } from "../../utilities/catalog";

type Props = {
  sections: CatalogSection[];
  covers: Map<string, string | undefined>;
};

const tones = {
  light: { box: "text-white", tag: "bg-white text-(--cat)", text: "text-white/90", button: "bg-white text-ink" },
  dark: { box: "text-ink", tag: "bg-ink text-white", text: "text-ink/80", button: "bg-ink text-white" },
};

export default function HeroPromos({ sections, covers }: Props) {
  const promos = heroPromos.flatMap(promo => {
    const section = sections.find(({ slug }) => slug === slugify(promo.category));
    return section ? [{ ...promo, section }] : [];
  });

  if (!promos.length) return null;

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {promos.map(({ category, title, text, tone, showPrice, section }) => (
        <a
          key={category}
          href={`#${section.slug}`}
          style={categoryStyle(category)}
          className={`group relative flex items-center justify-between gap-4 overflow-hidden rounded-xl bg-(--cat) p-6
            sm:p-7 ${tones[tone].box}`}
        >
          <span
            aria-hidden
            className="absolute -right-12 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-white/15"
          />

          <span className="relative flex flex-col items-start gap-2">
            <span className={`px-2 py-0.5 text-[0.7rem] font-extrabold uppercase tracking-[0.08em] ${tones[tone].tag}`}>
              {category}
            </span>
            <span className="text-3xl font-extrabold leading-tight">{title}</span>
            <span className={`max-w-xs text-sm ${tones[tone].text}`}>{text}</span>
            <span
              className={`mt-2 inline-flex h-10 items-center gap-1.5 rounded-full px-5 text-sm font-bold
                transition-transform group-hover:translate-x-1 ${tones[tone].button}`}
            >
              Ver {category} <FiArrowRight size={15} />
            </span>
          </span>

          <span className="relative shrink-0">
            <span
              className="block h-28 w-28 rotate-3 rounded-xl bg-white p-2.5 shadow-card-hover transition-transform
                group-hover:rotate-0 sm:h-36 sm:w-36"
            >
              <ProductImage src={covers.get(section.slug)} width={300} alt="" />
            </span>
            {showPrice && (
              <span
                className="absolute -right-2 -top-4 rotate-6 bg-sun px-2.5 py-1 text-center leading-none text-ink
                  shadow-card-hover"
              >
                <small className="block text-[0.65rem] font-bold">desde</small>
                <b className="text-base font-extrabold">
                  {formatPrice(Math.min(...section.items.map(item => item.price)))}
                </b>
              </span>
            )}
          </span>
        </a>
      ))}
    </section>
  );
}
