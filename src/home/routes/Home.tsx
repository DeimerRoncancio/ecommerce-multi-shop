import useCart from "../../cart/hooks/useCart";
import { mapApiToProducts } from "../../products/mappers/products.maper";
import { getProducts } from "../../products/services/products.api";
import useWishList from "../../wishlist/hooks/useWishList";
import { Route } from "./+types/Home";

export async function loader(){
  const apiProducts = await getProducts()
  const products = apiProducts.map(mapApiToProducts);
  return { products };
}

export function HydrateFallBack() {
  return <span className="loading loading-ring loading-lg"></span>;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { wishList, handleAddWishListItem, handleRemoveWishListItem } = useWishList();
  const { products } = loaderData;

  const {
    cartItems,
    handleAddItem,
    handleRemoveItem,
  } = useCart();

  return (
    <div className="ajust-screen flex gap-6 justify-center p-7 items-center w-full my-7">
      {
        products.map(product => {
          const isProductInCart = cartItems.some(item => item.id === product.id);
          const isProductInWishList = wishList.some(item => item.id === product.id);

          return (
            <div key={product.id}>
              <img src={`${product.images[0].imageUrl}`} />
              <h2>{product.name}</h2>
              <button className={`btn ${!isProductInCart ? 'btn-neutral' : 'btn-secondary'}`}
                onClick={() => {
                  !isProductInCart
                    ? handleAddItem(product)
                    : handleRemoveItem(product);
                }}>
                {
                  !isProductInCart
                    ? 'Add to Cart'
                    : 'Remove to Cart'
                }
              </button>
              <button className="btn" onClick={() => {
                !isProductInWishList
                ? handleAddWishListItem(product)
                : handleRemoveWishListItem(product.id)
              }}>
                {
                  !isProductInWishList
                  ? 'Add to WishList'
                  : 'Remove to WishList'
                }
              </button>
            </div>
          )
        })
      }
    </div>
  );
}
