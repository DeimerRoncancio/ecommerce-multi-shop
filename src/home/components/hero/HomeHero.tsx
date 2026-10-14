import { useRouteLoaderData } from "react-router";
import type { loader as appLoader } from "../../../App";
import { CatalogSection } from "../../utilities/catalog";
import HeroBanner from "./HeroBanner";
import HeroPerks from "./HeroPerks";
import HeroPromos from "./HeroPromos";

export type HeroCategory = {
  name: string;
  slug: string;
  cover?: string;
  fromPrice: number | null;
};

type Props = {
  sections: CatalogSection[];
  covers: Map<string, string | undefined>;
};

export default function HomeHero({ sections, covers }: Props) {
  const summaries = useRouteLoaderData<typeof appLoader>("App")?.categories ?? [];

  const categories: HeroCategory[] = sections.map(({ name, slug }) => ({
    name,
    slug,
    cover: covers.get(slug),
    fromPrice: summaries.find(category => category.name === name)?.fromPrice ?? null,
  }));

  return (
    <div className="flex flex-col gap-4">
      <HeroBanner categories={categories} />
      <HeroPerks />
      <HeroPromos categories={categories} />
    </div>
  );
}
