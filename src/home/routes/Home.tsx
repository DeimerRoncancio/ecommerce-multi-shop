import { Fragment } from "react";
import { mapApiToProducts } from "../../products/mappers/products.maper";
import { getHome } from "../../products/services/products.api";
import ProductCardSkeleton from "../../products/components/ProductCardSkeleton";
import ProductCarousel from "../../products/components/ProductCarousel";
import { ProductsFromApiType, ProductTypes } from "../../products/types/product";
import Container from "../../shared/ui/Container";
import { slugify } from "../../shared/utilities/slugify";
import CatalogHero from "../components/CatalogHero";
import CatalogSection from "../components/CatalogSection";
import CategoryGrid from "../components/CategoryGrid";
import StoreBenefits from "../components/StoreBenefits";
import useProductCard from "../hooks/useProductCard";
import useScrollToHash from "../hooks/useScrollToHash";
import { countLabel, pickCovers } from "../utilities/catalog";
import { buildInterludes } from "../utilities/interludes";
import type { Route } from "./+types/Home";

export async function loader() {
  const home = await getHome();

  const mapped = new Map<string, ProductTypes>();
  const toProduct = (product: ProductsFromApiType) => {
    const known = mapped.get(product.id) ?? mapApiToProducts(product);
    mapped.set(product.id, known);
    return known;
  };

  const sections = home.sections.map(section => ({
    name: section.categoryName,
    slug: slugify(section.categoryName),
    items: section.products.map(toProduct),
    count: section.productCount,
  }));

  return { sections, top: home.top.map(toProduct), budget: home.budget.map(toProduct) };
}

export function HydrateFallBack() {
  return (
    <Container className="grid grid-cols-2 gap-3 py-8 sm:grid-cols-3 lg:grid-cols-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </Container>
  );
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { sections, top, budget } = loaderData;
  const renderCard = useProductCard();
  useScrollToHash();

  const covers = pickCovers(sections);
  const featured = top[0];
  const interludes = buildInterludes({ sections, covers, top, featured, budget });

  return (
    <div className="flex flex-col gap-12 pb-16 pt-6">
      {featured && (
        <Container>
          <CatalogHero product={featured} />
        </Container>
      )}

      <CatalogSection id="catalogo" title="Explora por categoría">
        <CategoryGrid sections={sections} covers={covers} />
      </CatalogSection>

      {budget.length > 0 && (
        <CatalogSection id="precios-bajos" title="Precios bajos" subtitle="Lo más económico de la tienda, con envío gratis.">
          <ProductCarousel products={budget} renderItem={renderCard} label="Precios bajos" />
        </CatalogSection>
      )}

      {sections.map(({ name, slug, items, count }, index) => (
        <Fragment key={slug}>
          <CatalogSection id={slug} title={name} subtitle={countLabel(count)} category={name}>
            <ProductCarousel products={items} renderItem={product => renderCard(product, name)} label={name} />
          </CatalogSection>
          {interludes[index]}
        </Fragment>
      ))}

      <StoreBenefits />
    </div>
  );
}
