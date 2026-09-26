import ProductGallery from "../components/product-gallery/ProductGallery";
import Breadcrumb from "../../profile/components/Breadcrumb";
import ProductInfo from "../components/ProductInfo";
import BuyProduct from "../components/BuyProduct";
import ProductRecommendations from "../components/product-details-recommendations/ProductRecommendations";
import { WarrantyCard } from "../components/WarrantyCard";
import Container from "../../shared/ui/Container";
import { getProduct, getProducts } from "../services/products.api";
import type { Route } from "./+types/product-details";

import "swiper/css";
import "swiper/css/navigation";

export async function loader({ params }: Route.LoaderArgs) {
  const product = await getProduct(params.id);
  const products = await getProducts();

  return { product, products };
}

export default function ProductDetails({ loaderData }: Route.ComponentProps) {
  const { product, products } = loaderData;

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

      <section className="border-t border-line bg-base-100 py-14 lg:py-20">
        <Container className="mb-10 flex flex-col items-center gap-3 text-center">
          <h2 className="font-display text-3xl font-bold text-ink">Encuentra lo que quieres</h2>
          <p className="max-w-xl text-ink-soft">
            Descubre productos que suplan todas tus necesidades. Los mejores productos de
            tecnología y videojuegos están aquí.
          </p>
        </Container>
        <ProductRecommendations products={products} />
      </section>
    </>
  );
}
