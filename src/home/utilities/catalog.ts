import { ProductTypes } from "../../products/types/product";
import { slugify } from "../../shared/utilities/slugify";

export type CatalogSection = {
  name: string;
  slug: string;
  items: ProductTypes[];
};

export const groupByCategory = (products: ProductTypes[]): CatalogSection[] => {
  const groups = new Map<string, ProductTypes[]>();

  products.forEach(product => {
    product.categories.forEach(({ categoryName }) => {
      const current = groups.get(categoryName) ?? [];
      groups.set(categoryName, [...current, product]);
    });
  });

  return [...groups.entries()]
    .map(([name, items]) => ({ name, slug: slugify(name), items }))
    .sort((a, b) => b.items.length - a.items.length);
};

export const pickCovers = (sections: CatalogSection[]) => {
  const used = new Set<string>();

  return new Map(
    sections.map(({ slug, items }) => {
      const cover = items.find(item => !used.has(item.id)) ?? items[0];
      if (cover) used.add(cover.id);

      return [slug, cover?.images[0]?.imageUrl];
    }),
  );
};

export const countLabel = (count: number) => `${count} ${count === 1 ? "producto" : "productos"}`;
