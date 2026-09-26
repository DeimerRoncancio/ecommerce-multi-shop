import { formatPrice } from "../../shared/utilities/format-price";

type CartButtonProps = {
  totalPrice: number;
  onContinue: () => void;
  disabled?: boolean;
  label?: string;
};

export default function CartButton({ totalPrice, onContinue, disabled, label }: CartButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onContinue}
      className="btn h-12 w-full justify-between rounded-xl border-0 bg-brand px-5
        text-primary-content shadow-none hover:bg-brand-dark
        disabled:bg-base-300 disabled:text-ink-muted"
    >
      <span>{label ?? "Continuar"}</span>
      <span className="font-semibold">{formatPrice(totalPrice)}</span>
    </button>
  );
}
