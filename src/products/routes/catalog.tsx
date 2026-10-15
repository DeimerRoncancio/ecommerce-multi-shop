import { useState } from "react";
import { redirect, useRouteLoaderData } from "react-router";
import type { loader as appLoader } from "../../App";
import useProductCard from "../../home/hooks/useProductCard";
import Breadcrumb from "../../profile/components/Breadcrumb";
import Container from "../../shared/ui/Container";
import CatalogEmpty from "../components/catalog/CatalogEmpty";
import CatalogFilters from "../components/catalog/CatalogFilters";
import CatalogPagination from "../components/catalog/CatalogPagination";
import CatalogToolbar from "../components/catalog/CatalogToolbar";
import FiltersDrawer from "../components/catalog/FiltersDrawer";
import { CATALOG_PAGE_SIZE } from "../constants/catalog.helper";
import useCatalogFilters from "../hooks/useCatalogFilters";
import { mapApiToProducts } from "../mappers/products.mapper";
import { getSearchFacets, searchCatalog } from "../services/products.api";
import { emptyFilters, readFilters, sortToApi, toCatalogQuery, toSearchParams } from "../utilities/catalog-filters";
import type { Route } from "./+types/catalog";

export async function loader({ request }: Route.LoaderArgs) {
  const filters = readFilters(new URL(request.url).searchParams);
  const query = toCatalogQuery(filters);

  const [page, facets] = await Promise.all([
    searchCatalog({ ...query, sort: sortToApi(filters.sort), page: filters.page - 1, size: CATALOG_PAGE_SIZE }),
    getSearchFacets(query),
  ]);

  if (filters.page > 1 && filters.page > page.totalPages)
    throw redirect(`/catalog${toSearchParams({ ...filters, page: Math.max(page.totalPages, 1) })}`);

  return {
    filters,
    facets,
    products: page.content.map(mapApiToProducts),
    total: page.totalElements,
    pages: page.totalPages,
  };
}

export default function Catalog({ loaderData }: Route.ComponentProps) {
  const { filters, facets, products, total, pages } = loaderData;
  const renderCard = useProductCard();
  const { update, loading } = useCatalogFilters(filters);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const storeCategories = (useRouteLoaderData<typeof appLoader>("App")?.categories ?? [])
    .filter(({ productCount }) => productCount > 0)
    .map(({ name }) => name);

  const filtersPanel = <CatalogFilters filters={filters} facets={facets} onChange={update} />;

  return (
    <>
      <Breadcrumb namePage={filters.text ? `Resultados para "${filters.text}"` : "Catálogo"} />

      <Container className="grid gap-8 py-8 lg:grid-cols-[250px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-[calc(var(--nav-h)+1.5rem)]">{filtersPanel}</div>
        </aside>

        <div className="flex min-w-0 flex-col gap-6">
          <CatalogToolbar filters={filters} total={total} onChange={update} onOpenFilters={() => setDrawerOpen(true)} />

          <div className={`transition-opacity duration-200 ${loading ? "opacity-50" : ""}`} aria-busy={loading}>
            {products.length ? (
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {products.map(product => (
                  <li key={product.id}>{renderCard(product)}</li>
                ))}
              </ul>
            ) : (
              <CatalogEmpty
                text={filters.text}
                categories={storeCategories}
                onClear={() => update(emptyFilters(filters))}
              />
            )}
          </div>

          <CatalogPagination filters={filters} pages={pages} />
        </div>
      </Container>

      <FiltersDrawer open={drawerOpen} total={total} onClose={() => setDrawerOpen(false)}>
        {filtersPanel}
      </FiltersDrawer>
    </>
  );
}
