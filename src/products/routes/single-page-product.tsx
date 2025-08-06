import { getProduct } from "../services/products.api";
import { Route } from "./+types/single-page-product";

export async function loader({ params }: Route.LoaderArgs) {
  const product = await getProduct(params.id);
  return { product };
}

export default function SinglePageProduct({ loaderData }: Route.ComponentProps) {
  const { product } = loaderData;

  return (
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
      <div>
        {
          product.productImages.map(img => <img src={`${img.imageUrl}`} />)
        }
      </div>
    </div>
  )
}
