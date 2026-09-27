import ProductGallery from "../components/product-gallery/ProductGallery";
import Breadcrumb from "../../profile/components/Breadcrumb";
import ProductInfo from "../components/ProductInfo";
import BuyProduct from "../components/BuyProduct";
import ProductRecommendations from "../components/product-details-recommendations/ProductRecommendations";
import { WarrantyCard } from "../components/WarrantyCard";
import Container from "../../shared/ui/Container";
import { getProduct, getProducts } from "../services/products.api";
import { ProductsFromApiType } from "../types/product";
import type { Route } from "./+types/product-details";

import "swiper/css";
import "swiper/css/navigation";

export async function loader({ params }: Route.LoaderArgs) {
  const product = await getProduct(params.id);
  const products = await getProducts();

  return { product, products };
}

const relatedProducts = (product: ProductsFromApiType, products: ProductsFromApiType[]) => {
  const categories = new Set(product.categories.map(category => category.categoryName));
  const others = products.filter(item => item.id !== product.id);

  const sameCategory = others.filter(item =>
    item.categories.some(category => categories.has(category.categoryName)),
  );

  return sameCategory.length >= 4 ? sameCategory : others;
};

export default function ProductDetails({ loaderData }: Route.ComponentProps) {
  const { product, products } = loaderData;

  const related = relatedProducts(product, products);
  const mainCategory = product.categories[0]?.categoryName;

  return (
    <>
      <Breadcrumb namePage={product.productName} isProduct={true} />

      <Container className="grid gap-10 pb-16 pt-8 lg:grid-cols-2 lg:gap-14 lg:pt-12">
        <div className="min-w-0 lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start">
          <ProductGallery images={product.productImages} />
        </div>
        <div className="flex min-w-0 flex-col gap-6">
          <ProductInfo product={product} variants={product.variants} />
          <BuyProduct productFromApi={product} />
          <WarrantyCard />
        </div>
      </Container>

      <section className="brand-block relative overflow-hidden py-14 lg:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/10"
        />
        <Container className="relative mb-10 flex flex-col items-center gap-3 text-center">
          <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase
            tracking-[0.08em] text-white ring-1 ring-white/25">
            También te puede gustar
          </span>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            {mainCategory ? `Más de ${mainCategory}` : "Más productos"}
          </h2>
          <p className="max-w-xl text-white/90">
            Productos parecidos a este, con el mismo envío rápido y la misma garantía.
          </p>
        </Container>
        <ProductRecommendations products={related} />
      </section>
    </>
  );
}
