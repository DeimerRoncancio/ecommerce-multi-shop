import { PiCurrencyDollarSimpleBold } from "react-icons/pi";
import { envs } from "../../shared/config/env.config";
import { CartItemType } from "../types/cart";

type BuyButtonProps = {
  totalPrice: number;
  productsToBuy: CartItemType[];
};

export default function BuyButton({ totalPrice, productsToBuy }: BuyButtonProps) {
  const handleBuyNow = () => {
    const session = {
      currency: "COP",
      items: productsToBuy.map(product => ({
        name: product.productName,
        price: product.productPrice + "00",
        quantity: product.quantity
      }))
    }

    fetch(`${envs.API}/app/payments/create-payment-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(session),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.href = data.sessionUrl;
      });
  }

  return (
    <button className="btn btn-accent py-5 w-full rounded" onClick={handleBuyNow}>
      Pagar/ Total
      <p className="flex items-center">
        <PiCurrencyDollarSimpleBold color="#ffd6a7" size={15} />
        {new Intl.NumberFormat("es-ES").format(totalPrice)}
      </p>
    </button>
  )
}