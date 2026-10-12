import ProductGallery from "../components/product-gallery/ProductGallery";
import Breadcrumb from "../../profile/components/Breadcrumb";
import ProductInfo from "../components/ProductInfo";
import BuyProduct from "../components/BuyProduct";
import ProductRecommendations from "../components/product-details-recommendations/ProductRecommendations";
import { WarrantyCard } from "../components/WarrantyCard";
import Container from "../../shared/ui/Container";
import { categoryStyle } from "../../shared/utilities/category-color";
import { getCategoryProducts, getProduct, getProducts } from "../services/products.api";
import type { Route } from "./+types/product-details";
import { data } from "react-router";
import { isAxiosError } from "axios";

import "swiper/css";
import "swiper/css/navigation";

const RELATED_SIZE = 12;
const MIN_SAME_CATEGORY = 4;

export async function loader({ params }: Route.LoaderArgs) {
  const product = await getProduct(params.id).catch((error) => {
    if (isAxiosError(error) && error.response?.status === 404) throw data(null, { status: 404 });
    throw error;
  });
  const categories = product.categories.map(category => category.categoryName).join(",");
  const found = categories ? (await getCategoryProducts(categories, RELATED_SIZE + 1)).content : [];
  const sameCategory = found.filter(item => item.id !== product.id).slice(0, RELATED_SIZE);

  if (sameCategory.length >= MIN_SAME_CATEGORY) return { product, related: sameCategory, isSameCategory: true };

  const known = new Set([product.id, ...sameCategory.map(item => item.id)]);
  const others = await getProducts(RELATED_SIZE + known.size);
  const rest = others.filter(item => !known.has(item.id));

  return { product, related: [...sameCategory, ...rest].slice(0, RELATED_SIZE), isSameCategory: false };
}

export default function ProductDetails({ loaderData }: Route.ComponentProps) {
  const { product, related, isSameCategory } = loaderData;

  const mainCategory = product.categories[0]?.categoryName;
  const categoryNames = product.categories.map(category => category.categoryName).join(" y ");
  const relatedTitle = isSameCategory ? `Más de ${categoryNames}` : "También te puede gustar";

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
          <ProductRecommendations products={related} />
        </section>
      </Container>
    </>
  );
}
