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
      className="flex h-12 w-full items-center justify-between rounded-full bg-brand px-6 font-bold text-white
        transition-colors hover:bg-ink disabled:bg-base-300 disabled:text-ink-muted"
    >
      <span>{label ?? "Continuar"}</span>
      <span>{formatPrice(totalPrice)} →</span>
    </button>
  );
}
