import { AiOutlineThunderbolt } from "react-icons/ai";
import { ProductsFromApiType } from "../types/product";
import { payments } from "../../shared/api/payments/paymentsApi";

type BuyButtonProps = {
  product: ProductsFromApiType;
};

export default function BuyButton({ product }: BuyButtonProps) {
  const handleBuyNow = () => {
    payments.post("", {
      currency: "COP",
      items: [
        {
          name: product.productName,
          price: product.price + "00",
          description: product.description,
          quantity: 1
        }
      ]
    })
      .then((res) => res.data)
      .then((data) => window.location.href = data.sessionUrl);
  };

  return (
    <button
      type="button"
      onClick={handleBuyNow}
      className="btn h-12 gap-2 rounded-xl border-0 bg-neutral text-neutral-content shadow-none
        hover:bg-ink-soft"
    >
      <AiOutlineThunderbolt size={18} />
      Comprar ahora
    </button>
  );
}
