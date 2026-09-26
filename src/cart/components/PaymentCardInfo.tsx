import useCart from "../hooks/useCart";
import PaymentInfoItem from "./PaymentInfoItem";
import { useNavigate } from "react-router";
import CartButton from "./CartButton";

type PaymentCardInfoProps = {
  onContinue: () => void;
  disabledContinue?: boolean;
  continueLabel?: string;
};

export default function PaymentCardInfo({
  onContinue,
  disabledContinue,
  continueLabel,
}: PaymentCardInfoProps) {
  const { itemsQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div className="sticky top-6 overflow-hidden rounded-2xl border border-line bg-base-100 shadow-card">
      <div className="border-b border-line px-5 py-4">
        <h2 className="font-display text-lg font-semibold text-ink">Resumen de la compra</h2>
        <p className="text-sm text-ink-muted">{itemsQuantity} productos</p>
      </div>

      <ul className="py-3">
        <PaymentInfoItem isMain={false} label="Valor productos" value={totalPrice} />
        <PaymentInfoItem isMain label="Total" value={totalPrice} />
      </ul>

      <div className="flex flex-col gap-3 px-5 pb-5">
        <CartButton
          totalPrice={totalPrice}
          onContinue={onContinue}
          disabled={disabledContinue}
          label={continueLabel}
        />
        <button
          type="button"
          onClick={() => navigate("/")}
          className="btn h-12 w-full rounded-xl border border-line bg-base-100 text-ink shadow-none
            hover:bg-cream"
        >
          Seguir comprando
        </button>
      </div>
    </div>
  );
}
