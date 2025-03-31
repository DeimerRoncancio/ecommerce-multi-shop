import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProductTypes } from "./products/types/product";
import { InitialValues } from "./products/helpers/InitialValues.helper";

function App() {
  const [ products, setProducts ] = useState<ProductTypes[]>(InitialValues);

  useEffect(() => {
    axios('https://multi-shop-api-76abbcfe5b70.herokuapp.com/app/products')
      .then(res => setProducts(res.data));
  }, [])

  return (
    <div className="flex gap-6 justify-center p-7 items-center w-full my-7">
      {
        products.map(product => (
          <div key={product.id}>
            <img src={`${product.productImages[0].imageUrl}`} />
            <h2>{product.productName}</h2>
            <button className="btn btn-neutral">Cart</button>
          </div>
        ))
      }
    </div>
  );
}

export default App;
