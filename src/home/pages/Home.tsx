import useCart from "../../cart/hooks/useCart";
import useGetProducts from "../../shared/hooks/api/useGetProducts";
import { useEffect } from "react";

export default function Home() {
  const { products } = useGetProducts();

  const {
    items,
    handleAddItem,
    handleRemoveItem,
    loadItemsFromStorage
  } = useCart();

  useEffect(() => {
    if (!items.length) loadItemsFromStorage();
  }, []);

  return (
    <div className="ajust-screen flex gap-6 justify-center p-7 items-center w-full my-7">
      {
        products.map(product => {
          const isProductInCart = items.some(item => item.id === product.id);

          return (
            <div key={product.id}>
              <img src={`${product.productImages[0].imageUrl}`} />
              <h2>{product.productName}</h2>
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
            </div>
          )
        })
      }
    </div>
  );
}
