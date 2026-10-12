import { ProductTypes } from "../../products/types/product";

export type CatalogSection = {
  name: string;
  slug: string;
  items: ProductTypes[];
  count: number;
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
