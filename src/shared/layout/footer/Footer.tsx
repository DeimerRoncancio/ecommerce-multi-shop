import { Link, useLoaderData } from "react-router";
import CustomLink from "./CustomLink";
import SocialButton from "./SocialButton";
import ContactItem from "./ContactItem";
import Container from "../../ui/Container";
import { categoryColor, categoryStyle } from "../../utilities/category-color";
import { catalogLink } from "../../../products/utilities/catalog-filters";
import { CategoriesType } from "../../../products/types/categories";
import { paymentIcons, aboutLinks, legalLinks } from "../../constants/footer.helper";

const countCategories = (categories: CategoriesType[]) => {
  return categories
    .map(({ name, productCount }): [string, number] => [name, productCount])
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);
};

export default function Footer() {
  const categories = countCategories(useLoaderData().categories as CategoriesType[]);

  return (
    <footer className="mt-4 bg-base-100 text-sm text-ink-soft">
      <div aria-hidden className="flex h-1.5">
        <span className="flex-[4] bg-brand" />
        {categories.map(([name]) => (
          <span key={name} className="flex-1" style={{ backgroundColor: categoryColor(name).strong }} />
        ))}
      </div>

      <Container className="flex flex-col items-center gap-7 py-12 text-center">
        <div className="flex flex-col items-center gap-3">
          <Link to="/" className="block transition-transform hover:-rotate-2" aria-label="Ir al inicio">
            <img src="/svg/logo.svg" alt="Multi Shop" className="h-16 w-auto" />
          </Link>
          <p className="max-w-md leading-relaxed">
            Ropa, cocina, deporte y tecnología en un solo lugar. Productos seleccionados, envío rápido y garantía en
            cada compra.
          </p>
        </div>

        <ul className="flex flex-wrap justify-center gap-2">
          {categories.map(([name, count]) => (
            <li key={name} style={categoryStyle(name)}>
              <Link
                to={catalogLink({ category: name })}
                className="inline-flex items-center gap-1.5 rounded-full bg-(--cat-soft) px-4 py-2 font-bold text-(--cat)
                  transition-colors hover:bg-(--cat) hover:text-white"
              >
                {name}
                <span className="text-xs opacity-60">{count}</span>
              </Link>
            </li>
          ))}
        </ul>

        <ul className="flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-2">
          {[...aboutLinks, ...legalLinks].map(label => (
            <li key={label}>
              <CustomLink to="">{label}</CustomLink>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-left">
          <ContactItem title="Llámanos" label="+1 (555) 123-4567" iconName="phone" href="tel:+15551234567" />
          <ContactItem title="Escríbenos" label="hello@example.com" iconName="email" href="mailto:hello@example.com" />
          <ContactItem title="Visítanos" label="123 Fashion Street, New York" iconName="location" />
        </div>

        <div className="flex gap-2">
          <SocialButton iconName="instagram" />
          <SocialButton iconName="facebook" />
          <SocialButton iconName="tiktok" />
          <SocialButton iconName="youtube" />
          <SocialButton iconName="linkedin" />
        </div>
      </Container>

      <div className="bg-ink text-white/70">
        <Container className="flex flex-col items-center justify-between gap-4 py-5 lg:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <p className="mr-1 font-semibold text-white">Aceptamos</p>
            {paymentIcons.map((Icon, index) => (
              <span key={index} className="grid h-8 w-11 place-items-center rounded-md bg-white/10 text-white">
                <Icon size={18} />
              </span>
            ))}
          </div>

          <p className="text-center lg:text-right">
            © <b className="font-semibold text-white">MultiShop</b>. Todos los derechos reservados · Desarrollado por{" "}
            <Link to="" className="font-semibold text-brand hover:underline">
              DeimerRoncancio
            </Link>
          </p>
        </Container>
      </div>
    </footer>
  );
}
