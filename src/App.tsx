import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProductTypes } from "./products/types/product";
import { InitialValues } from "./products/helpers/InitialValues.helper";
import { useCartItems } from "./cart/storage/cartItems";
import { CartItem } from "./cart/types/cart";

function App() {
  const [products, setProducts] = useState<ProductTypes[]>(InitialValues);
  const { cartItems, addItem, removeItem } = useCartItems();

  const handleAddItem = (item: CartItem) => {
    addItem(item);
  }

  useEffect(() => {
    axios('https://multi-shop-api-76abbcfe5b70.herokuapp.com/app/products')
      .then(res => setProducts(res.data));
  }, []);

  return (
    <div className="flex gap-6 justify-center p-7 items-center w-full my-7">
      {
        products.map(product => {
          const isProductInCart = cartItems.some(item => item.id === product.id);
          
          const productItem = {
            id: product.id,
            productName: product.productName,
            productImage: product.productImages[0].imageUrl,
            isExists: true,
            productPrice: product.price
          }

          return (
            <div key={product.id}>
              <img src={`${product.productImages[0].imageUrl}`} />
              <h2>{product.productName}</h2>
              <button className={`btn ${!isProductInCart ? 'btn-neutral' : 'btn-secondary'}`} 
              onClick={() => {
                !isProductInCart
                ? handleAddItem(productItem)
                : removeItem(productItem.id);
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
