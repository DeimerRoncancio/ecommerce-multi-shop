import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProductTypes } from "./products/types/product";
import { InitialValues } from "./products/helpers/InitialValues.helper";
import { useCart } from "./cart/storage/cartItems";

function App() {
  const [products, setProducts] = useState<ProductTypes[]>(InitialValues);
  const { cartItems, addItem, setItemsFromStorage, removeItem } = useCart();

  const handleAddItem = (product: ProductTypes) => {
    const productItem = {
      id: product.id,
      productName: product.productName,
      productDescription: product.description,
      productImage: product.productImages[0].imageUrl,
      isExists: true,
      productPrice: product.price,
      quantity: 1
    }

    addItem(productItem);
  }

  const handleRemoveItem = (product: ProductTypes) => {
    const productItem = cartItems.filter(item => item.id === product.id);
    const itemToRemove = { ...productItem[0], quantity: 1 }

    removeItem(itemToRemove);
  }

  useEffect(() => {
    if (cartItems.length === 0) setItemsFromStorage();

    axios('https://multi-shop-api-76abbcfe5b70.herokuapp.com/app/products')
      .then(res => setProducts(res.data));
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
