import { Link, useLoaderData } from "react-router";
import CustomLink from "./CustomLink";
import SocialButton from "./SocialButton";
import ContactItem from "./ContactItem";
import Container from "../../ui/Container";
import { categoryStyle } from "../../utilities/category-color";
import { slugify } from "../../utilities/slugify";
import { ProductTypes } from "../../../products/types/product";
import { paymentIcons, aboutLinks, legalLinks } from "../../constants/footer.helper";

const countCategories = (products: ProductTypes[]) => {
  const counts = new Map<string, number>();
  products.forEach(product =>
    product.categories.forEach(({ categoryName }) => counts.set(categoryName, (counts.get(categoryName) ?? 0) + 1))
  );
  return [...counts].sort((a, b) => b[1] - a[1]);
};

export default function Footer() {
  const products = useLoaderData().products as ProductTypes[];
  const categories = countCategories(products);

  return (
    <footer className="mt-4 border-t-4 border-brand bg-base-100 text-sm text-ink-soft">
      <div className="border-b border-brand/20 bg-brand-soft">
        <Container className="grid px-0! sm:grid-cols-3 sm:divide-x divide-brand/20 max-sm:divide-y">
          <ContactItem title="Llámanos" label="+1 (555) 123-4567" iconName="phone" href="tel:+15551234567" />
          <ContactItem title="Escríbenos" label="hello@example.com" iconName="email" href="mailto:hello@example.com" />
          <ContactItem title="Visítanos" label="123 Fashion Street, New York" iconName="location" />
        </Container>
      </div>

      <Container className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-8">
        <div className="flex flex-col items-start gap-4">
          <Link to="/" className="block transition-transform hover:-rotate-2" aria-label="Ir al inicio">
            <img src="/svg/logo.svg" alt="Multi Shop" className="-ml-3 h-16 w-auto" />
          </Link>
          <p className="max-w-xs leading-relaxed">
            Ropa, cocina, deporte y tecnología en un solo lugar. Productos seleccionados, envío rápido
            y garantía en cada compra.
          </p>
          <div className="flex gap-2">
            <SocialButton iconName="instagram" />
            <SocialButton iconName="facebook" />
            <SocialButton iconName="tiktok" />
            <SocialButton iconName="youtube" />
            <SocialButton iconName="linkedin" />
          </div>
        </div>

        <FooterColumn title="Categorías">
          {categories.map(([name, count]) => (
            <li key={name} style={categoryStyle(name)}>
              <Link to={`/#${slugify(name)}`} className="group inline-flex items-center gap-2.5">
                <span className="h-2 w-2 shrink-0 rounded-full bg-(--cat)" />
                <span className="transition-colors group-hover:text-(--cat)">{name}</span>
                <span className="text-xs text-ink-muted">{count}</span>
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Sobre nosotros">
          {aboutLinks.map(label => (
            <li key={label}><CustomLink to="">{label}</CustomLink></li>
          ))}
        </FooterColumn>

        <FooterColumn title="Legal">
          {legalLinks.map(label => (
            <li key={label}><CustomLink to="">{label}</CustomLink></li>
          ))}
        </FooterColumn>
      </Container>

      <div className="bg-ink text-white/70">
        <Container className="flex flex-col items-center justify-between gap-4 py-5 lg:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <p className="mr-1 font-semibold text-white">Aceptamos</p>
            {paymentIcons.map((Icon, index) => (
              <span
                key={index}
                className="grid h-8 w-11 place-items-center bg-white text-ink"
              >
                <Icon size={18} />
              </span>
            ))}
          </div>

          <p className="text-center lg:text-right">
            © <b className="font-semibold text-white">MultiShop</b>. Todos los derechos reservados · Desarrollado por{" "}
            <Link to="" className="font-semibold text-brand hover:underline">DeimerRoncancio</Link>
          </p>
        </Container>
      </div>
    </footer>
  );
}

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
};

function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div>
      <h2 className="mb-4 inline-block border-b-2 border-brand pb-2 text-base font-extrabold text-ink">{title}</h2>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
}
