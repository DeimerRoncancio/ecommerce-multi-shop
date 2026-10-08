import { AiOutlineThunderbolt } from "react-icons/ai";
import { useNavigate } from "react-router";
import { ProductsFromApiType } from "../types/product";
import { mapApiToProducts } from "../mappers/products.maper";
import useCart from "../../cart/hooks/useCart";

type BuyButtonProps = {
  product: ProductsFromApiType;
  quantity: number;
};

export default function BuyButton({ product, quantity }: BuyButtonProps) {
  const { handleAddItem, isInCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = () => {
    if (!isInCart(product.id)) handleAddItem(mapApiToProducts(product), quantity);
    navigate("/cart");
  };

  return (
    <button
      type="button"
      onClick={handleBuyNow}
      className="btn h-12 gap-2 rounded-full font-bold border-2! border-brand! bg-base-100 text-brand hover:bg-brand-soft"
    >
      <AiOutlineThunderbolt size={18} />
      Comprar ahora
    </button>
  );
}
