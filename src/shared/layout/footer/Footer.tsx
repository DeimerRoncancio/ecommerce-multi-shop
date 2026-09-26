import { BsCashStack, BsPaypal, BsShop } from "react-icons/bs";
import { FaApple, FaGoogle } from "react-icons/fa6";
import { IoCardOutline } from "react-icons/io5";
import { Link, useLoaderData } from "react-router";
import CustomLink from "./CustomLink";
import SocialButton from "./SocialButton";
import ContactItem from "./ContactItem";
import Container from "../../ui/Container";
import { ProductTypes } from "../../../products/types/product";

const paymentIcons = [IoCardOutline, BsPaypal, FaApple, FaGoogle, BsShop, BsCashStack];

export default function Footer() {
  const products = useLoaderData().products as ProductTypes[];

  return (
    <footer className="border-t border-line bg-base-100 text-sm text-ink-soft">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="flex flex-col items-start gap-4">
          <Link to="/" className="block w-[150px]">
            <img src="/images/logo.webp" alt="Multi Shop" className="w-full" />
          </Link>
          <p className="max-w-xs leading-relaxed">
            Tu tienda de tecnología, gaming y hogar. Productos seleccionados, envío rápido
            y garantía en cada compra.
          </p>
          <div className="mt-2 flex gap-3">
            <SocialButton iconName="instagram" />
            <SocialButton iconName="facebook" />
            <SocialButton iconName="tiktok" />
            <SocialButton iconName="youtube" />
            <SocialButton iconName="linkedin" />
          </div>
        </div>

        <div>
          <h2 className="mb-5 font-display text-base font-semibold text-ink">Productos</h2>
          <ul className="flex flex-col gap-3">
            {products.slice(0, 6).map(item => (
              <li key={item.id}>
                <CustomLink to={`/product/${item.id}`}>{item.name}</CustomLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-5 font-display text-base font-semibold text-ink">Sobre nosotros</h2>
          <ul className="flex flex-col gap-3">
            <li><CustomLink to="">Nosotros</CustomLink></li>
            <li><CustomLink to="">Política de calidad</CustomLink></li>
            <li><CustomLink to="">Garantías y devoluciones</CustomLink></li>
            <li><CustomLink to="">Tratamiento de datos</CustomLink></li>
            <li><CustomLink to="">Contáctenos</CustomLink></li>
          </ul>
        </div>

        <div>
          <h2 className="mb-5 font-display text-base font-semibold text-ink">Contáctanos</h2>
          <div className="flex flex-col gap-4">
            <ContactItem label="123 Fashion Street, New York, NY 10001" iconName="location" size={18} />
            <ContactItem label="+1 (555) 123-4567" iconName="phone" size={18} />
            <ContactItem label="hello@example.com" iconName="email" size={18} />
          </div>
        </div>
      </Container>

      <div className="border-t border-line bg-cream">
        <Container className="flex flex-col items-center gap-5 py-8">
          <div className="flex flex-wrap items-center justify-center gap-3 text-ink-muted">
            <p className="font-medium text-ink-soft">Aceptamos:</p>
            {paymentIcons.map((Icon, index) => (
              <Icon key={index} size={22} className="transition-colors hover:text-brand" />
            ))}
          </div>

          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <li><CustomLink to="" theme="secondary">Términos de servicio</CustomLink></li>
            <li><CustomLink to="" theme="secondary">Política de privacidad</CustomLink></li>
            <li><CustomLink to="" theme="secondary">Política de cookies</CustomLink></li>
          </ul>

          <div className="flex flex-col items-center gap-1 text-center text-ink-muted">
            <p>© Copyright <b className="font-semibold text-ink">MultiShop</b>. Todos los derechos reservados</p>
            <p className="flex gap-1">
              Desarrollado por
              <CustomLink to="" theme="terciary">DeimerRoncancio</CustomLink>
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
