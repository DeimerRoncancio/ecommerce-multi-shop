import { Fragment } from "react";
import { mapApiToProducts } from "../../products/mappers/products.maper";
import { getProducts } from "../../products/services/products.api";
import ProductCardSkeleton from "../../products/components/ProductCardSkeleton";
import ProductCarousel from "../../products/components/ProductCarousel";
import Container from "../../shared/ui/Container";
import CatalogHero from "../components/CatalogHero";
import CatalogSection from "../components/CatalogSection";
import CategoryGrid from "../components/CategoryGrid";
import StoreBenefits from "../components/StoreBenefits";
import useProductCard from "../hooks/useProductCard";
import useScrollToHash from "../hooks/useScrollToHash";
import { countLabel, groupByCategory, pickCovers } from "../utilities/catalog";
import { buildInterludes } from "../utilities/interludes";
import type { Route } from "./+types/Home";

export async function loader() {
  const apiProducts = await getProducts();
  return { products: apiProducts.map(mapApiToProducts) };
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
  const { products } = loaderData;
  const renderCard = useProductCard();
  useScrollToHash();

  const sections = groupByCategory(products);
  const covers = pickCovers(sections);
  const byPrice = [...products].sort((a, b) => a.price - b.price);
  const featured = byPrice[byPrice.length - 1];
  const budget = byPrice.slice(0, 12);
  const interludes = buildInterludes({ sections, covers, products, byPrice, featured, budget });

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

      {sections.map(({ name, slug, items }, index) => (
        <Fragment key={slug}>
          <CatalogSection id={slug} title={name} subtitle={countLabel(items.length)} category={name}>
            <ProductCarousel products={items} renderItem={product => renderCard(product, name)} label={name} />
          </CatalogSection>
          {interludes[index]}
        </Fragment>
      ))}

      <StoreBenefits />
    </div>
  );
}
