import { AiOutlineThunderbolt } from "react-icons/ai";
import { envs } from "../../shared/config/env.config";
import { ProductsFromApiType } from "../types/product";

type BuyButtonProps = {
  product: ProductsFromApiType;
};

export default function BuyButton({ product }: BuyButtonProps) {
  const handleBuyNow = () => {
    fetch(`${envs.API}/app/payments/create-payment-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "currency": "COP",
        "items": [
          {
            "name": product.productName,
            "price": product.price + "00",
            "quantity": 1
          }
        ]
      }),
    })
    .then((response) => response.json())
    .then((data) => window.location.href = data.sessionUrl);
  };

  return (
    <button className="btn btn-outline btn-primary border border-gray-300 rounded-2xl
    hover:bg-gray-100 hover:text-black focus-visible:!outline-[#f04913] shadow-none 
    focus-visible:bg-white focus-visible:text-black focus-visible:outline-none" onClick={handleBuyNow}>
      <AiOutlineThunderbolt size={17} />
      Comprar ahora
    </button>
  );
}
