import ProductGallery from "../components/ProductGallery";
import Breadcrumb from "../../profile/components/Breadcrumb";
import ProductInfo from "../components/ProductInfo";
import BuyProduct from "../components/BuyProduct";
import ProductRecommendations from "../components/ProductRecommendations";
import { WarrantyCard } from "../components/WarrantyCard";
import { getProduct, getProducts } from "../services/products.api";
import { Route } from "./+types/product-details";

import "swiper/css";
import 'swiper/css/navigation';

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

      <div className="ajust-width grid grid-cols-2 gap-6 pt-14">
        <div className="relative w-full mx-auto">
          <ProductGallery images={product.productImages} />
        </div>
        <div className="flex flex-col gap-5 text-[#101828]">
          <ProductInfo product={product} />
          <BuyProduct productFromApi={product} />
          <WarrantyCard />
        </div>
      </div>

      <div className="w-screen flex flex-col text-black border-b border-[#e5e5e5]">
        <div className="ajust-width flex flex-col items-center !mt-20 !mb-10 gap-4">
          <h2 className="text-3xl font-bold">Encuentra lo que quieres</h2>
          <h2 className="text-[#4a5565]">
            Descubre productos que suplan todas tus necesidades. Los mejores productos de tecnología
            y videojuegos están aquí.
          </h2>
        </div>
        <ProductRecommendations products={products} />
      </div>
    </>
  )
}
