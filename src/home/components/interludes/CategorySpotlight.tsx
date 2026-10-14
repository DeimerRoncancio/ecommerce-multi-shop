import { Link } from "react-router";
import { FiArrowRight } from "react-icons/fi";
import Container from "../../../shared/ui/Container";
import PriceTag from "../../../shared/ui/PriceTag";
import { categoryStyle } from "../../../shared/utilities/category-color";
import { productImageCutout } from "../../../shared/utilities/product-image";
import { ProductTypes } from "../../../products/types/product";

type SpotlightProps = {
  category: string;
  slug: string;
  product: ProductTypes;
  count: number;
};

const extraPositions = [
  "left-0 -rotate-6 group-hover/spot:-translate-x-2",
  "right-0 rotate-6 group-hover/spot:translate-x-2",
];

export default function CategorySpotlight({ category, slug, product, count }: SpotlightProps) {
  const [main, ...extras] = product.images;

  return (
    <Container as="section">
      <div
        style={categoryStyle(category)}
        className="group/spot relative grid overflow-hidden rounded-2xl bg-(--cat) text-white md:grid-cols-[1.1fr_1fr]"
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
          className="relative grid min-h-72 place-items-center p-8"
          aria-label={`Ver ${product.name}`}
        >
          <span
            aria-hidden
            className="absolute right-0 top-1/2 h-[140%] w-[90%] -translate-y-1/2 rounded-l-full bg-white/15"
          />
          <span className="relative block h-64 w-full max-w-md sm:h-72">
            {extras.slice(0, extraPositions.length).map((image, index) => (
              <img
                key={image.imageId}
                src={productImageCutout(image.imageUrl, 320)}
                alt=""
                aria-hidden
                className={`absolute top-1/2 h-1/2 w-2/5 -translate-y-1/2 object-contain opacity-95
                  drop-shadow-[0_14px_16px_rgb(17_17_17/0.25)] transition-transform duration-300 ${extraPositions[index]}`}
              />
            ))}
            <img
              src={productImageCutout(main?.imageUrl, 500)}
              alt={product.name}
              className="absolute left-1/2 top-0 h-full w-3/5 -translate-x-1/2 -rotate-3 object-contain
                drop-shadow-[0_18px_22px_rgb(17_17_17/0.3)] transition-transform duration-300 group-hover/spot:rotate-0"
            />
          </span>
        </Link>
      </div>
    </Container>
  );
}
