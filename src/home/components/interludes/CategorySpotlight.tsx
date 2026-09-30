import { Link } from "react-router";
import { FiArrowRight } from "react-icons/fi";
import Container from "../../../shared/ui/Container";
import PriceTag from "../../../shared/ui/PriceTag";
import ProductImage from "../../../shared/ui/ProductImage";
import { categoryStyle } from "../../../shared/utilities/category-color";
import { ProductTypes } from "../../../products/types/product";

type SpotlightProps = {
  category: string;
  slug: string;
  product: ProductTypes;
  count: number;
};

export default function CategorySpotlight({ category, slug, product, count }: SpotlightProps) {
  return (
    <Container as="section">
      <div
        style={categoryStyle(category)}
        className="group/spot relative grid overflow-hidden bg-(--cat) text-white md:grid-cols-[1.1fr_1fr]"
      >
        <div className="relative z-10 flex flex-col items-start justify-center gap-4 p-8 sm:p-10">
          <span className="bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">
            Destacado en {category}
          </span>
          <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">{product.name}</h2>
          <p className="max-w-sm text-white/85">
            Uno de los {count} productos de {category.toLowerCase()}, con envío gratis a todo el país.
          </p>
          <PriceTag price={product.price} size="lg" />
          <div className="flex flex-wrap gap-3">
            <Link
              to={`/product/${product.id}`}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 font-bold text-(--cat)
                transition-colors hover:bg-ink hover:text-white"
            >
              Ver producto
              <FiArrowRight size={16} />
            </Link>
            <a
              href={`#${slug}`}
              className="inline-flex h-11 items-center rounded-full border-2 border-white/60 px-6 font-bold
                transition-colors hover:border-white hover:bg-white/10"
            >
              Todo en {category}
            </a>
          </div>
        </div>

        <Link
          to={`/product/${product.id}`}
          className="relative grid min-h-64 place-items-center p-8"
          aria-label={`Ver ${product.name}`}
        >
          <span
            aria-hidden
            className="absolute right-0 top-1/2 h-[140%] w-[90%] -translate-y-1/2 rounded-l-full bg-white/15"
          />
          <span className="relative block w-3/4 max-w-xs -rotate-3 bg-white p-5 shadow-card-hover transition-transform
            duration-300 group-hover/spot:rotate-0">
            <ProductImage src={product.images[0]?.imageUrl} width={500} alt={product.name} />
          </span>
        </Link>
      </div>
    </Container>
  );
}
