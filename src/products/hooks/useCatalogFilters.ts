import { useNavigate, useNavigation } from "react-router";
import { CatalogFilters } from "../types/catalog";
import { toSearchParams } from "../utilities/catalog-filters";

export default function useCatalogFilters(filters: CatalogFilters) {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const update = (changes: Partial<CatalogFilters>) => {
    navigate(toSearchParams({ ...filters, page: 1, ...changes }), { preventScrollReset: true });
  };

  const loading = navigation.state === "loading" && navigation.location.pathname === "/catalog";

  return { update, loading };
}
