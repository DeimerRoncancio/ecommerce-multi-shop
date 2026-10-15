import { catalogSorts } from "../constants/catalog.helper";
import { CatalogFilters, CatalogQuery } from "../types/catalog";

const toPrice = (value: string | null) => {
  if (!value) return null;
  const price = Number(value);
  return Number.isFinite(price) && price >= 0 ? Math.round(price) : null;
};

export const readFilters = (params: URLSearchParams): CatalogFilters => {
  const sort = params.get("orden");

  return {
    text: params.get("q")?.trim() ?? "",
    categories: params.getAll("categoria"),
    min: toPrice(params.get("min")),
    max: toPrice(params.get("max")),
    sort: catalogSorts.some(({ value }) => value === sort) ? sort! : catalogSorts[0].value,
    page: Math.max(1, Math.floor(Number(params.get("pagina"))) || 1),
  };
};

export const toCatalogQuery = ({ text, categories, min, max }: CatalogFilters): CatalogQuery => ({
  query: text || undefined,
  categories: categories.length ? categories.join(",") : undefined,
  minPrice: min ?? undefined,
  maxPrice: max ?? undefined,
});

export const sortToApi = (sort: string) => catalogSorts.find(({ value }) => value === sort)?.api;

export const toSearchParams = ({ text, categories, min, max, sort, page }: CatalogFilters) => {
  const params = new URLSearchParams();

  if (text) params.set("q", text);
  categories.forEach(category => params.append("categoria", category));
  if (min !== null) params.set("min", String(min));
  if (max !== null) params.set("max", String(max));
  if (sort !== catalogSorts[0].value) params.set("orden", sort);
  if (page > 1) params.set("pagina", String(page));

  return `?${params}`;
};

export const countActiveFilters = ({ text, categories, min, max }: CatalogFilters) =>
  (text ? 1 : 0) + categories.length + (min !== null || max !== null ? 1 : 0);

export const emptyFilters = (filters: CatalogFilters): CatalogFilters => ({
  ...filters,
  text: "",
  categories: [],
  min: null,
  max: null,
  page: 1,
});
