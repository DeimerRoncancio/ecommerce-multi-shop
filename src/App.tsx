import "./App.css";
import { useEffect } from "react";
import { ProductTypes } from "./products/types/product";
import { useCartStore } from "./cart/storage/cart";
import useGetProducts from "./shared/hooks/api/useGetProducts";
import { productToCar } from "./cart/mappers/items-mapper";

function App() {
  const { cartItems, addItem, setItemsFromStorage, removeItem } = useCartStore();
  const{ products } = useGetProducts();

  const handleAddItem = (product: ProductTypes) => {
    const productItem = productToCar({ product, quantity: 1, isExists: true });
    addItem(productItem);
  }

  const handleRemoveItem = (product: ProductTypes) => {
    const productItem = cartItems.filter(item => item.id === product.id);
    const itemToRemove = { ...productItem[0], quantity: 1 }

    removeItem(itemToRemove);
  }

  useEffect(() => {
    if (cartItems.length === 0) setItemsFromStorage();
  }, []);

  return (
    <div className="flex gap-6 justify-center p-7 items-center w-full my-7">
      {
        products.map(product => {
          const isProductInCart = cartItems.some(item => item.id === product.id);

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

export default App;
