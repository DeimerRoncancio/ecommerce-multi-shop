import { FaChevronRight, FaTag } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import { productImageCutout } from "../../../shared/utilities/product-image";
import { heroChips, heroFeatures } from "../../constants/home.helper";
import { HeroCategory } from "./HomeHero";
import HeroScene, { SceneProduct } from "./HeroScene";
import { ProductTypes } from "../../../products/types/product";

type Props = {
  categories: HeroCategory[];
  picks: ProductTypes[];
};

export default function HeroBanner({ categories, picks }: Props) {
  const picked: SceneProduct[] = picks.flatMap(({ id, name, images }) =>
    images[0] ? [{ name, href: `/product/${id}`, image: images[0].imageUrl }] : [],
  );
  const images = new Set(picked.map(({ image }) => image));
  const products: SceneProduct[] = [
    ...picked,
    ...categories.flatMap(({ name, slug, cover }) =>
      cover && !images.has(cover) ? [{ name, href: `#${slug}`, image: cover }] : [],
    ),
  ];

  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-line bg-[#f4f0fc] xl:aspect-[1877/838]
        xl:bg-[url(/images/hero-background.png)] xl:bg-cover"
    >
      <div className="relative z-10 flex flex-col items-start gap-4 p-6 sm:p-9 xl:max-w-[48%]">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-1.5 text-sm font-bold text-white">
          <FaTag size={13} />
          Ofertas de la semana
        </span>

        <h1 className="text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl">
          Encuentra lo mejor
          <br />
          <span className="text-brand">para tu día a día</span>
        </h1>

        <p className="max-w-md text-ink-soft">
          Tecnología, hogar, moda, cocina, gamer y mucho más en un solo lugar. Las mejores marcas, ofertas increíbles y
          envío a todo Colombia.
        </p>

        <div className="mt-1 flex flex-wrap gap-3">
          <a
            href="#precios-bajos"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-7 font-bold text-white
              transition-colors hover:bg-ink"
          >
            Comprar ahora
            <FiArrowRight size={17} />
          </a>
          <a
            href="#catalogo"
            className="inline-flex h-12 items-center rounded-full border-2 border-[#7b4bd6] bg-white px-7 font-bold
              text-[#7b4bd6] transition-colors hover:bg-[#7b4bd6] hover:text-white"
          >
            Ver categorías
          </a>
        </div>

        <ul className="mt-1 flex flex-wrap gap-2 xl:flex-nowrap">
          {heroChips.map(({ label, icon: Icon, color, href, active }) => (
            <li key={label}>
              <a
                href={href}
                className={`inline-flex h-10 items-center gap-1.5 rounded-full border px-3 text-[0.8rem] font-semibold
                  shadow-[0_6px_16px_-10px_rgb(17_17_17/0.35)] transition-colors hover:border-[#c9b6f2] ${
                    active ? "border-[#c9b6f2] bg-lilac text-[#7b4bd6]" : "border-transparent bg-white text-ink"
                  }`}
              >
                <Icon size={18} style={{ color }} />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {products.length > 0 && (
        <>
          <HeroScene
            products={products}
            crop={0}
            imageOf={productImageCutout}
            className="absolute inset-0 hidden xl:block"
          />

          <div className="px-6 sm:px-9 xl:hidden">
            <HeroScene
              products={products}
              crop={0.38}
              imageOf={productImageCutout}
              className="relative aspect-[1164/838] overflow-hidden rounded-xl bg-[url(/images/hero-background.png)]
                bg-[length:161.3%_100%] bg-right"
            />
          </div>
        </>
      )}

      <ul
        className="relative z-10 grid gap-3 p-6 sm:grid-cols-2 sm:p-9 lg:grid-cols-4 xl:absolute xl:inset-x-6 xl:bottom-5
          xl:p-0"
      >
        {heroFeatures.map(({ icon: Icon, title, text, tone, href }) => (
          <li key={title}>
            <a
              href={href}
              className="group flex items-center gap-3 rounded-xl bg-white/90 p-3
                shadow-[0_8px_20px_-14px_rgb(17_17_17/0.35)] backdrop-blur-sm transition-shadow hover:shadow-card-hover"
            >
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-white ${tone}`}>
                <Icon size={18} />
              </span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block text-sm font-extrabold text-ink">{title}</span>
                <span className="block text-xs text-ink-muted">{text}</span>
              </span>
              <span
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lilac text-[#7b4bd6]
                  transition-transform group-hover:translate-x-0.5"
              >
                <FaChevronRight size={11} />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
