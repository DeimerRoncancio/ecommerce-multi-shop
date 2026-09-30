import { FiArrowRight } from "react-icons/fi";
import Container from "../../../shared/ui/Container";
import ProductImage from "../../../shared/ui/ProductImage";
import { categoryStyle } from "../../../shared/utilities/category-color";

type PromoPairProps = {
  highlight: {
    tone: "sun" | "ink";
    eyebrow: string;
    title: string;
    linkLabel: string;
    href: string;
    images: (string | undefined)[];
  };
  category: { name: string; slug: string; count: number; image?: string };
  reversed?: boolean;
};

const tones = {
  sun: { box: "bg-sun text-ink", eyebrow: "text-ink/70", thumb: "bg-white" },
  ink: { box: "bg-ink text-white", eyebrow: "text-brand", thumb: "bg-white" },
};

export default function PromoPair({ highlight, category, reversed = false }: PromoPairProps) {
  const tone = tones[highlight.tone];

  return (
    <Container as="section" className="grid gap-4 md:grid-cols-2">
      <a
        href={highlight.href}
        className={`group flex items-center justify-between gap-4 overflow-hidden p-7 ${tone.box} ${
          reversed ? "md:order-2" : ""
        }`}
      >
        <span className="flex flex-col items-start gap-2">
          <span className={`text-sm font-bold uppercase tracking-wider ${tone.eyebrow}`}>{highlight.eyebrow}</span>
          <span className="text-3xl font-extrabold leading-tight">{highlight.title}</span>
          <span className="mt-2 inline-flex items-center gap-1.5 font-bold underline-offset-4 group-hover:underline">
            {highlight.linkLabel} <FiArrowRight size={16} />
          </span>
        </span>
        <span className="grid shrink-0 grid-cols-2 gap-2">
          {highlight.images.slice(0, 4).map((image, index) => (
            <span key={index} className={`block h-16 w-16 p-1.5 sm:h-20 sm:w-20 ${tone.thumb}`}>
              <ProductImage src={image} width={160} alt="" />
            </span>
          ))}
        </span>
      </a>

      <a
        href={`#${category.slug}`}
        style={categoryStyle(category.name)}
        className="group flex items-center justify-between gap-4 overflow-hidden border-4 border-(--cat)
          bg-(--cat-soft) p-7"
      >
        <span className="flex flex-col items-start gap-2">
          <span className="text-sm font-bold uppercase tracking-wider text-(--cat)">Explora</span>
          <span className="text-3xl font-extrabold leading-tight text-ink">Todo en {category.name}</span>
          <span className="text-ink-soft">{category.count} productos con envío gratis</span>
          <span className="mt-1 inline-flex items-center gap-1.5 font-bold text-(--cat) underline-offset-4
            group-hover:underline">
            Ir a {category.name.toLowerCase()} <FiArrowRight size={16} />
          </span>
        </span>
        <span className="block h-32 w-32 shrink-0 rotate-3 bg-white p-3 shadow-card-hover transition-transform
          group-hover:rotate-0 sm:h-40 sm:w-40">
          <ProductImage src={category.image} width={300} alt="" />
        </span>
      </a>
    </Container>
  );
}
