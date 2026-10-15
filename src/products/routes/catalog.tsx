import { useState } from "react";
import { redirect, useRouteLoaderData } from "react-router";
import type { loader as appLoader } from "../../App";
import CatalogSection from "../../home/components/CatalogSection";
import StoreBenefits from "../../home/components/StoreBenefits";
import useProductCard from "../../home/hooks/useProductCard";
import Container from "../../shared/ui/Container";
import CatalogEmpty from "../components/catalog/CatalogEmpty";
import CatalogFilters from "../components/catalog/CatalogFilters";
import CatalogHeader from "../components/catalog/CatalogHeader";
import CatalogPagination from "../components/catalog/CatalogPagination";
import CatalogToolbar from "../components/catalog/CatalogToolbar";
import FiltersDrawer from "../components/catalog/FiltersDrawer";
import ProductCarousel from "../components/ProductCarousel";
import { CATALOG_PAGE_SIZE, NEWEST_SIZE } from "../constants/catalog.helper";
import useCatalogFilters from "../hooks/useCatalogFilters";
import { mapApiToProducts } from "../mappers/products.mapper";
import { getSearchFacets, searchCatalog } from "../services/products.api";
import {
  countActiveFilters,
  emptyFilters,
  readFilters,
  sortToApi,
  toCatalogQuery,
  toSearchParams,
} from "../utilities/catalog-filters";
import type { Route } from "./+types/catalog";

export async function loader({ request }: Route.LoaderArgs) {
  const filters = readFilters(new URL(request.url).searchParams);
  const query = toCatalogQuery(filters);

  const [page, facets, newest] = await Promise.all([
    searchCatalog({ ...query, sort: sortToApi(filters.sort), page: filters.page - 1, size: CATALOG_PAGE_SIZE }),
    getSearchFacets(query),
    searchCatalog({ sort: sortToApi("nuevos"), page: 0, size: NEWEST_SIZE }),
  ]);

  if (filters.page > 1 && filters.page > page.totalPages)
    throw redirect(`/catalog${toSearchParams({ ...filters, page: Math.max(page.totalPages, 1) })}`);

  return {
    filters,
    facets,
    products: page.content.map(mapApiToProducts),
    total: page.totalElements,
    pages: page.totalPages,
    newest: newest.content.map(mapApiToProducts),
  };
}

export default function Catalog({ loaderData }: Route.ComponentProps) {
  const { filters, facets, products, total, pages, newest } = loaderData;
  const renderCard = useProductCard();
  const renderMiniCard = useProductCard(true);
  const { update, loading } = useCatalogFilters(filters);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const storeCategories = (useRouteLoaderData<typeof appLoader>("App")?.categories ?? []).filter(
    ({ productCount }) => productCount > 0,
  );

  const filtersPanel = <CatalogFilters filters={filters} facets={facets} onChange={update} />;

  return (
    <>
      <Container className="pt-6">
        <CatalogHeader
          filters={filters}
          total={total}
          minPrice={facets.minPrice}
          products={products}
          categories={storeCategories}
          onChange={update}
        />
      </Container>

      <Container className="grid gap-8 py-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-[calc(var(--nav-h)+1.5rem)] rounded-xl border border-line bg-base-100 p-5">
            <div className="mb-5 flex items-center justify-between border-b border-line pb-4">
              <p className="text-lg font-extrabold text-ink">Filtros</p>
              {countActiveFilters(filters) > 0 && (
                <button
                  type="button"
                  onClick={() => update(emptyFilters(filters))}
                  className="text-xs font-bold text-ink-muted underline underline-offset-4 hover:text-brand"
                >
                  Limpiar
                </button>
              )}
            </div>
            {filtersPanel}
          </div>
        </aside>

        <div className="flex min-w-0 flex-col gap-6">
          <CatalogToolbar
            filters={filters}
            total={total}
            shown={products.length}
            onChange={update}
            onOpenFilters={() => setDrawerOpen(true)}
          />

          <div className={`transition-opacity duration-200 ${loading ? "opacity-50" : ""}`} aria-busy={loading}>
            {products.length ? (
              <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 xl:grid-cols-4">
                {products.map(product => (
                  <li key={product.id}>{renderCard(product)}</li>
                ))}
              </ul>
            ) : (
              <CatalogEmpty
                text={filters.text}
                categories={storeCategories.map(({ name }) => name)}
                onClear={() => update(emptyFilters(filters))}
              />
            )}
          </div>

          <CatalogPagination filters={filters} pages={pages} />
        </div>
      </Container>

      {newest.length > 0 && (
        <div className="pt-4">
          <CatalogSection
            id="novedades"
            title="Lo más nuevo"
            subtitle="Recién llegados a la tienda, con envío gratis."
            link={{ to: "/catalog?orden=nuevos", label: "Ver novedades" }}
          >
            <ProductCarousel products={newest} renderItem={product => renderMiniCard(product)} label="Lo más nuevo" />
          </CatalogSection>
        </div>
      )}

      <div className="pb-12 pt-12">
        <StoreBenefits />
      </div>

      <FiltersDrawer open={drawerOpen} total={total} onClose={() => setDrawerOpen(false)}>
        {filtersPanel}
      </FiltersDrawer>
    </>
  );
}
