import { Link } from "react-router";
import {
  FiArrowRight,
  FiCreditCard,
  FiRefreshCw,
  FiShield,
  FiTruck,
} from "react-icons/fi";
import useCart from "../../cart/hooks/useCart";
import { mapApiToProducts } from "../../products/mappers/products.maper";
import { getProducts } from "../../products/services/products.api";
import useWishList from "../../wishlist/hooks/useWishList";
import ProductCard from "../../products/components/ProductCard";
import ProductCardSkeleton from "../../products/components/ProductCardSkeleton";
import Container from "../../shared/ui/Container";
import { formatPrice } from "../../shared/utilities/format-price";
import ProductImage from "../../shared/ui/ProductImage";
import { ProductTypes } from "../../products/types/product";
import type { Route } from "./+types/Home";

export async function loader() {
  const apiProducts = await getProducts();
  return { products: apiProducts.map(mapApiToProducts) };
}

export function HydrateFallBack() {
  return (
    <Container className="grid grid-cols-2 gap-6 py-16 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </Container>
  );
}

const benefits = [
  { icon: FiTruck, title: "Envío a todo el país", text: "Despachamos en 24 horas" },
  { icon: FiShield, title: "Compra protegida", text: "Pagos cifrados con Stripe" },
  { icon: FiRefreshCw, title: "30 días de garantía", text: "Devoluciones sin preguntas" },
  { icon: FiCreditCard, title: "Paga como quieras", text: "Tarjeta, PSE o efectivo" },
];

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const groupByCategory = (products: ProductTypes[]) => {
  const groups = new Map<string, ProductTypes[]>();

  products.forEach(product => {
    product.categories.forEach(({ categoryName }) => {
      const current = groups.get(categoryName) ?? [];
      groups.set(categoryName, [...current, product]);
    });
  });

  return [...groups.entries()]
    .map(([name, items]) => ({ name, slug: slugify(name), items }))
    .sort((a, b) => b.items.length - a.items.length);
};

export default function Home({ loaderData }: Route.ComponentProps) {
  const { wishList, handleAddWishListItem, handleRemoveWishListItem } = useWishList();
  const { products } = loaderData;
  const { cartItems, handleAddItem, handleRemoveItem } = useCart();

  const sections = groupByCategory(products);
  const featured = [...products].sort((a, b) => b.price - a.price)[0];

  const toggleCart = (product: ProductTypes) => {
    cartItems.some(item => item.id === product.id)
      ? handleRemoveItem(product)
      : handleAddItem(product);
  };

  const toggleWishList = (product: ProductTypes) => {
    wishList.some(item => item.id === product.id)
      ? handleRemoveWishListItem(product.id)
      : handleAddWishListItem(product);
  };

  const renderGrid = (items: ProductTypes[]) => (
    <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      {items.map(product => (
        <li key={product.id} className="flex">
          <div className="w-full">
            <ProductCard
              product={product}
              isInCart={cartItems.some(item => item.id === product.id)}
              isInWishList={wishList.some(item => item.id === product.id)}
              onToggleCart={toggleCart}
              onToggleWishList={toggleWishList}
            />
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <section className="brand-block relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-40 h-130 w-130 rounded-full
            bg-white/10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 left-1/4 h-105 w-105 rounded-full
            bg-white/5"
        />

        <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5
              text-xs font-semibold uppercase tracking-[0.08em] text-white ring-1 ring-white/25">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              {sections.length} categorías · {products.length} productos
            </span>

            <h1 className="font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl
              lg:text-6xl">
              Ropa, cocina, deporte
              <br />
              y tecnología
              <span className="block text-brand-tint">en una sola tienda</span>
            </h1>

            <p className="max-w-md text-lg leading-relaxed text-white/90">
              Desde una sartén hasta una consola. Envío rápido, pago seguro y garantía
              en todo lo que compres.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#catalogo"
                className="btn gap-2 rounded-xl border-0 bg-white px-7 font-semibold text-brand
                  shadow-none hover:bg-brand-tint"
              >
                Ver catálogo
                <FiArrowRight size={18} />
              </a>
              <Link
                to="/profile/wish-list"
                className="btn gap-2 rounded-xl border border-white/40 bg-transparent px-7
                  font-medium text-white shadow-none hover:border-white hover:bg-white/10"
              >
                Mi lista de deseos
              </Link>
            </div>

            <dl className="mt-2 flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <dt className="font-display text-2xl font-bold text-white">{products.length}</dt>
                <dd className="text-sm text-white/70">Productos disponibles</dd>
              </div>
              <div>
                <dt className="font-display text-2xl font-bold text-white">{sections.length}</dt>
                <dd className="text-sm text-white/70">Categorías</dd>
              </div>
              <div>
                <dt className="font-display text-2xl font-bold text-white">24 h</dt>
                <dd className="text-sm text-white/70">Tiempo de despacho</dd>
              </div>
            </dl>
          </div>

          {featured && (
            <Link
              to={`/product/${featured.id}`}
              className="group relative flex flex-col gap-4 rounded-4xl bg-base-100 p-8
                shadow-card-hover transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="w-fit rounded-full bg-brand px-3 py-1 text-xs font-semibold
                uppercase tracking-[0.08em] text-primary-content">
                Lo más top
              </span>
              <div className="aspect-square w-full overflow-hidden rounded-2xl">
                <ProductImage
                  src={featured.images[0]?.imageUrl}
                  width={800}
                  alt={featured.name}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-end justify-between gap-4 border-t border-line pt-4">
                <div>
                  <p className="font-medium text-ink">{featured.name}</p>
                  <p className="font-display text-xl font-bold text-brand">
                    {formatPrice(featured.price)}
                  </p>
                </div>
                <FiArrowRight
                  className="shrink-0 text-brand transition-transform group-hover:translate-x-1"
                  size={22}
                />
              </div>
            </Link>
          )}
        </Container>
      </section>

      <section className="border-b border-line bg-base-100">
        <Container className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-soft
                text-brand">
                <Icon size={20} />
              </span>
              <div className="leading-tight">
                <p className="font-medium text-ink">{title}</p>
                <p className="text-sm text-ink-muted">{text}</p>
              </div>
            </div>
          ))}
        </Container>
      </section>

      <section id="catalogo" className="brand-block scroll-mt-nav">
        <Container className="flex flex-col gap-5 py-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Compra por categoría
            </h2>
            <p className="text-sm text-white/75">
              Salta directo al rubro que te interesa
            </p>
          </div>

          <ul className="flex flex-wrap gap-2.5">
            {sections.map(({ name, slug, items }) => (
              <li key={slug}>
                <a
                  href={`#${slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2
                    text-sm font-medium text-white ring-1 ring-white/25 transition-colors
                    hover:bg-white hover:text-brand"
                >
                  {name}
                  <span className="rounded-full bg-white/20 px-2 text-xs font-semibold">
                    {items.length}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {sections.map(({ name, slug, items }, index) => (
        <section
          key={slug}
          id={slug}
          className={`scroll-mt-nav py-14 lg:py-16 ${
            index % 2 === 0 ? "bg-base-100" : "bg-cream"
          }`}
        >
          <Container>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div className="flex items-center gap-4">
                <span aria-hidden className="h-10 w-1.5 rounded-full bg-brand" />
                <div>
                  <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{name}</h2>
                  <p className="mt-0.5 text-sm text-ink-muted">
                    {items.length} {items.length === 1 ? "producto" : "productos"}
                  </p>
                </div>
              </div>
              <a
                href="#catalogo"
                className="text-sm font-medium text-brand transition-colors hover:text-brand-dark"
              >
                Ver otras categorías
              </a>
            </div>

            {renderGrid(items)}
          </Container>
        </section>
      ))}

      <section className="brand-block relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10"
        />
        <Container className="relative flex flex-col items-center gap-5 py-16 text-center lg:py-20">
          <h2 className="max-w-2xl font-display text-3xl font-bold text-white sm:text-4xl">
            ¿Listo para armar tu pedido?
          </h2>
          <p className="max-w-xl text-white/90">
            Agrega lo que quieras al carrito y paga en minutos. Si algo no te convence,
            tienes 30 días para devolverlo.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/cart"
              className="btn gap-2 rounded-xl border-0 bg-white px-7 font-semibold text-brand
                shadow-none hover:bg-brand-tint"
            >
              Ir al carrito
              <FiArrowRight size={18} />
            </Link>
            <a
              href="#catalogo"
              className="btn rounded-xl border border-white/40 bg-transparent px-7 font-medium
                text-white shadow-none hover:border-white hover:bg-white/10"
            >
              Seguir viendo
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
