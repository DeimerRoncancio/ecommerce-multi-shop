import { Link } from "react-router";
import { FiArrowRight, FiCreditCard, FiRefreshCw, FiShield, FiTruck } from "react-icons/fi";
import useCart from "../../cart/hooks/useCart";
import { mapApiToProducts } from "../../products/mappers/products.maper";
import { mapApiToCategories } from "../../products/mappers/categories.mapper";
import { getProducts } from "../../products/services/products.api";
import { getCategories } from "../../products/services/categories.api";
import useWishList from "../../wishlist/hooks/useWishList";
import ProductCard from "../../products/components/ProductCard";
import ProductCardSkeleton from "../../products/components/ProductCardSkeleton";
import Container from "../../shared/ui/Container";
import type { Route } from "./+types/Home";

export async function loader() {
  const apiProducts = await getProducts();
  const products = apiProducts.map(mapApiToProducts);

  const apiCategories = await getCategories();
  const categories = apiCategories.map(mapApiToCategories);

  return { products, categories };
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

export default function Home({ loaderData }: Route.ComponentProps) {
  const { wishList, handleAddWishListItem, handleRemoveWishListItem } = useWishList();
  const { products, categories } = loaderData;
  const { cartItems, handleAddItem, handleRemoveItem } = useCart();

  const featured = products[0];

  const toggleCart = (product: typeof products[number]) => {
    cartItems.some(item => item.id === product.id)
      ? handleRemoveItem(product)
      : handleAddItem(product);
  };

  const toggleWishList = (product: typeof products[number]) => {
    wishList.some(item => item.id === product.id)
      ? handleRemoveWishListItem(product.id)
      : handleAddWishListItem(product);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-base-100">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full
            bg-brand-soft blur-3xl"
        />
        <Container className="relative grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">
          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-line
              bg-brand-soft px-4 py-1.5 text-xs font-medium uppercase tracking-[0.08em] text-secondary-content">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Tecnología, gaming y mucho más
            </span>

            <h1 className="font-display text-4xl font-bold leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
              Todo lo que buscas,
              <span className="text-brand"> en una sola tienda</span>
            </h1>

            <p className="max-w-md text-lg leading-relaxed text-ink-soft">
              Explora cientos de productos seleccionados, con envío rápido, pago seguro
              y garantía en cada compra.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#productos"
                className="btn gap-2 rounded-xl border-0 bg-brand px-7 text-primary-content
                  shadow-none hover:bg-brand-dark"
              >
                Ver productos
                <FiArrowRight size={18} />
              </a>
              <Link
                to="/profile/wish-list"
                className="btn gap-2 rounded-xl border border-line bg-base-100 px-7 text-ink
                  shadow-none hover:bg-cream"
              >
                Mi lista de deseos
              </Link>
            </div>

            <dl className="mt-2 flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <dt className="font-display text-2xl font-semibold text-ink">{products.length}+</dt>
                <dd className="text-sm text-ink-muted">Productos disponibles</dd>
              </div>
              <div>
                <dt className="font-display text-2xl font-semibold text-ink">{categories.length}</dt>
                <dd className="text-sm text-ink-muted">Categorías</dd>
              </div>
              <div>
                <dt className="font-display text-2xl font-semibold text-ink">24 h</dt>
                <dd className="text-sm text-ink-muted">Tiempo de despacho</dd>
              </div>
            </dl>
          </div>

          {featured && (
            <div className="relative">
              <div className="absolute inset-0 -rotate-3 rounded-[2rem] bg-brand-soft" aria-hidden />
              <Link
                to={`/product/${featured.id}`}
                className="relative flex flex-col gap-4 rounded-[2rem] border border-line bg-base-100
                  p-8 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <span className="w-fit rounded-full bg-neutral px-3 py-1 text-xs font-medium
                  uppercase tracking-[0.08em] text-neutral-content">
                  Destacado
                </span>
                <img
                  src={featured.images[0]?.imageUrl}
                  alt={featured.name}
                  className="mx-auto h-64 w-full object-contain lg:h-80"
                />
                <div className="flex items-end justify-between gap-4 border-t border-line pt-4">
                  <p className="font-medium text-ink">{featured.name}</p>
                  <FiArrowRight className="shrink-0 text-brand" size={22} />
                </div>
              </Link>
            </div>
          )}
        </Container>
      </section>

      {/* Beneficios */}
      <section className="border-b border-line bg-cream">
        <Container className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
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

      {/* Productos */}
      <section id="productos" className="scroll-mt-nav py-14 lg:py-20">
        <Container>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-bold text-ink">Productos destacados</h2>
              <p className="mt-1 text-ink-soft">Lo más buscado por nuestros clientes esta semana</p>
            </div>
            {categories.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {categories.slice(0, 5).map(category => (
                  <li key={category.id}>
                    <span className="rounded-full border border-line bg-base-100 px-4 py-1.5 text-sm text-ink-soft">
                      {category.name}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {products.map(product => (
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
        </Container>
      </section>
    </>
  );
}
