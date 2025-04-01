import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProductTypes } from "./products/types/product";
import { InitialValues } from "./products/helpers/InitialValues.helper";
import { useCartItems } from "./cart/storage/cartItems";

function App() {
  const [products, setProducts] = useState<ProductTypes[]>(InitialValues);
  const { cartItems, addItem, setItemsFromStorage, removeItem } = useCartItems();

  const handleAddItem = (item: ProductTypes) => {
    addItem(item);
  }

  useEffect(() => {
    axios('https://multi-shop-api-76abbcfe5b70.herokuapp.com/app/products')
      .then(res => setProducts(res.data));
    
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
                : removeItem(product.id);
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
