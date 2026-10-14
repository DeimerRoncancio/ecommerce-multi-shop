import { ProductTypes } from "../../../products/types/product";
import { CatalogSection } from "../../utilities/catalog";
import HeroBanner from "./HeroBanner";
import HeroPerks from "./HeroPerks";
import HeroPromos from "./HeroPromos";

type Props = {
  products: ProductTypes[];
  sections: CatalogSection[];
  covers: Map<string, string | undefined>;
};

export default function HomeHero({ products, sections, covers }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <HeroBanner products={products} />
      <HeroPerks />
      <HeroPromos sections={sections} covers={covers} />
    </div>
  );
}
