import { useRouteLoaderData } from "react-router";
import { FiArrowRight } from "react-icons/fi";
import type { loader as appLoader } from "../../App";
import { categoryStyle } from "../../shared/utilities/category-color";
import { formatPrice } from "../../shared/utilities/format-price";
import { productImageCutout } from "../../shared/utilities/product-image";
import { CatalogSection, countLabel } from "../utilities/catalog";

type CategoryGridProps = {
  sections: CatalogSection[];
  covers: Map<string, string | undefined>;
};

export default function CategoryGrid({ sections, covers }: CategoryGridProps) {
  const summaries = useRouteLoaderData<typeof appLoader>("App")?.categories ?? [];

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {sections.map(({ name, slug, count }) => {
        const cover = covers.get(slug);
        const fromPrice = summaries.find(category => category.name === name)?.fromPrice ?? null;

        return (
          <li key={slug} style={categoryStyle(name)}>
            <a
              href={`#${slug}`}
              className="group relative flex h-full flex-col overflow-hidden border-b-4 border-(--cat) bg-(--cat-soft)
                p-4 transition-shadow hover:shadow-card-hover"
            >
              <span className="block text-lg font-extrabold leading-tight text-ink">{name}</span>
              <span className="block text-xs font-bold text-(--cat)">{countLabel(count)}</span>

              <span className="relative my-3 block aspect-[4/3]">
                <span
                  aria-hidden
                  className="absolute bottom-0 left-1/2 h-[22%] w-[85%] -translate-x-1/2 rounded-[50%] bg-(--cat)
                    opacity-90"
                />
                {cover && (
                  <img
                    src={productImageCutout(cover, 500)}
                    alt=""
                    loading="lazy"
                    className="absolute inset-x-[6%] bottom-[9%] top-0 h-[91%] w-[88%] object-contain object-bottom
                      drop-shadow-[0_10px_10px_rgb(17_17_17/0.18)] transition-transform duration-300
                      group-hover:-translate-y-1.5 group-hover:scale-105"
                  />
                )}
              </span>

              <span className="mt-auto flex items-center justify-between gap-2">
                <span className="text-xs leading-tight text-ink-muted">
                  {fromPrice !== null && (
                    <>
                      desde <b className="block text-sm font-extrabold text-ink">{formatPrice(fromPrice)}</b>
                    </>
                  )}
                </span>
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-(--cat)
                    transition-colors group-hover:bg-(--cat) group-hover:text-white"
                >
                  <FiArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
