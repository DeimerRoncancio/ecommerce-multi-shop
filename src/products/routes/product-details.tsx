import ProductGallery from "../components/ProductGallery";
import { getProduct } from "../services/products.api";
import { Route } from "./+types/product-details";

export async function loader({ params }: Route.LoaderArgs) {
  const product = await getProduct(params.id);
  return { product };
}

export default function ProductDetails({ loaderData }: Route.ComponentProps) {
  const { product } = loaderData;

  return (
    <div className="ajust-width grid grid-cols-2 pt-14">
      <div className="relative w-5/6 m-auto">
        <ProductGallery images={product.productImages} />
      </div>
      <div>
        <h2>
          {product.productName}
        </h2>
        <h2>
          {product.description}
        </h2>
        <h2>
          {product.price}
        </h2>
        <ul>
          {
            product.categories.map(cat => <li>{cat.categoryName}</li>)
          }
        </ul>
      </div>
    </div>
  )
}
