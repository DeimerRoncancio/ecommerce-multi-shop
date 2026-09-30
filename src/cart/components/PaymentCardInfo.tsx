import useCart from "../hooks/useCart";
import PaymentInfoItem from "./PaymentInfoItem";
import { useNavigate } from "react-router";
import CartButton from "./CartButton";
import { formatPrice } from "../../shared/utilities/format-price";
import { checkoutTrust } from "../constants/checkout.helper";

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
    <aside className="flex flex-col gap-4 rounded-2xl bg-brand-soft/70 p-5 lg:sticky lg:top-6 lg:rounded-none
      lg:bg-transparent lg:p-0">
      <h2 className="text-xs font-extrabold uppercase tracking-[0.08em] text-brand">Resumen del pedido</h2>

      <ul>
        <PaymentInfoItem isMain={false} label={`Productos (${itemsQuantity})`} value={totalPrice} />
        <li className="flex items-center justify-between py-1.5 text-ink-soft">
          <p>Envío</p>
          <p className="font-bold text-success">Gratis</p>
        </li>
      </ul>

      <div className="flex items-end justify-between border-t border-brand/20 pt-4">
        <p className="text-ink-soft">Total</p>
        <p className="text-4xl font-extrabold leading-none text-ink">{formatPrice(totalPrice)}</p>
      </div>

      <CartButton
        totalPrice={totalPrice}
        onContinue={onContinue}
        disabled={disabledContinue}
        label={continueLabel}
      />
      <button
        type="button"
        onClick={() => navigate("/")}
        className="text-sm font-bold text-ink-soft underline-offset-4 transition-colors hover:text-brand
          hover:underline"
      >
        ← Seguir comprando
      </button>

      <ul className="mt-2 flex flex-col gap-2.5 border-t border-brand/20 pt-5 text-sm text-ink-soft">
        {checkoutTrust.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-base-100 text-brand">
              <Icon size={15} />
            </span>
            {text}
          </li>
        ))}
      </ul>
    </aside>
  );
}
