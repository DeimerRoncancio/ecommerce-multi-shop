import ProductGallery from "../components/product-gallery/ProductGallery";
import Breadcrumb from "../../profile/components/Breadcrumb";
import ProductInfo from "../components/ProductInfo";
import BuyProduct from "../components/BuyProduct";
import ProductRecommendations from "../components/product-details-recommendations/ProductRecommendations";
import { WarrantyCard } from "../components/WarrantyCard";
import Container from "../../shared/ui/Container";
import { categoryStyle } from "../../shared/utilities/category-color";
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
  const rest = others.filter(item => !sameCategory.includes(item));

  return { sameCategory, list: sameCategory.length >= 4 ? sameCategory : [...sameCategory, ...rest] };
};

export default function ProductDetails({ loaderData }: Route.ComponentProps) {
  const { product, products } = loaderData;

  const related = relatedProducts(product, products);
  const mainCategory = product.categories[0]?.categoryName;
  const categoryNames = product.categories.map(category => category.categoryName).join(" y ");
  const relatedTitle = related.sameCategory.length >= 4 ? `Más de ${categoryNames}` : "También te puede gustar";

  return (
    <>
      <Breadcrumb namePage={product.productName} isProduct={true} />

      <Container className="flex flex-col gap-8 py-6 lg:py-8">
        <div
          style={categoryStyle(mainCategory)}
          className="grid gap-8 border border-t-4 border-line border-t-(--cat,var(--color-brand)) bg-base-100 p-4
            sm:p-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:p-8"
        >
          <div className="min-w-0 lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start">
            <ProductGallery images={product.productImages} />
          </div>
          <div className="flex min-w-0 flex-col gap-6">
            <ProductInfo product={product} variants={product.variants} />
            <BuyProduct productFromApi={product} />
            <WarrantyCard />
          </div>
        </div>

        <section style={categoryStyle(mainCategory)} className="flex flex-col gap-4">
          <div className="border-l-[6px] border-(--cat,var(--color-brand)) pl-3">
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{relatedTitle}</h2>
            <p className="text-sm font-semibold text-ink-muted">Con el mismo envío gratis y la misma garantía</p>
          </div>
          <ProductRecommendations products={related.list} />
        </section>
      </Container>
    </>
  );
}
