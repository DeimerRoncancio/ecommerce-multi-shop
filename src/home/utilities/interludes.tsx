import { ReactNode } from "react";
import { ProductTypes } from "../../products/types/product";
import { formatPrice } from "../../shared/utilities/format-price";
import CategorySpotlight from "../components/interludes/CategorySpotlight";
import HowItWorks from "../components/interludes/HowItWorks";
import PromoPair from "../components/interludes/PromoPair";
import { interludeOrder } from "../constants/home.helper";
import { CatalogSection } from "./catalog";

type InterludesInput = {
  sections: CatalogSection[];
  covers: Map<string, string | undefined>;
  products: ProductTypes[];
  byPrice: ProductTypes[];
  featured?: ProductTypes;
  budget: ProductTypes[];
};

export const buildInterludes = ({ sections, covers, products, byPrice, featured, budget }: InterludesInput) => {
  const shown = new Set(featured ? [featured.id] : []);
  let promoCount = 0;

  return sections.map((_, index): ReactNode => {
    if (index === sections.length - 1) return null;

    const turn = interludeOrder[index % interludeOrder.length];
    const next = sections[index + 1];

    if (turn === "spotlight" && next) {
      const ranked = [...next.items].sort((a, b) => b.price - a.price);
      const star = ranked.find(product => !shown.has(product.id)) ?? ranked[0];
      shown.add(star.id);
      return <CategorySpotlight category={next.name} slug={next.slug} product={star} count={next.items.length} />;
    }

    if (turn === "steps") return <HowItWorks />;

    const other = next ?? sections[0];
    const category = { name: other.name, slug: other.slug, count: other.items.length, image: covers.get(other.slug) };
    const isFirstPair = promoCount++ % 2 === 0;

    if (isFirstPair) {
      const ceiling = budget.length ? budget[Math.min(3, budget.length - 1)].price : 0;
      return (
        <PromoPair
          category={category}
          highlight={{
            tone: "sun",
            eyebrow: "Precios bajos",
            title: `${products.filter(product => product.price <= ceiling).length} productos por menos de ${formatPrice(ceiling)}`,
            linkLabel: "Ver precios bajos",
            href: "#precios-bajos",
            images: budget.slice(0, 4).map(product => product.images[0]?.imageUrl),
          }}
        />
      );
    }

    const top = [...byPrice].reverse().slice(0, 4);
    return (
      <PromoPair
        reversed
        category={category}
        highlight={{
          tone: "ink",
          eyebrow: "Lo más top",
          title: `Desde ${formatPrice(top[top.length - 1]?.price ?? 0)}, lo mejor de la tienda`,
          linkLabel: `Ver ${top[0]?.name ?? "lo más top"}`,
          href: top[0] ? `/product/${top[0].id}` : "#catalogo",
          images: top.map(product => product.images[0]?.imageUrl),
        }}
      />
    );
  });
};
