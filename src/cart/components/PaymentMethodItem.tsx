import { FaCcAmex, FaCcMastercard, FaCcVisa, FaRegCreditCard } from "react-icons/fa6";
import { PaymentMethodType } from "../types/cart";

type Props = {
  method: PaymentMethodType;
  isActive: boolean;
  onSelect: (method: PaymentMethodType) => void;
};

export default function PaymentMethodItem({ method, isActive, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={() => onSelect(method)}
      className={`mt-6 flex w-full items-center justify-between gap-4 rounded-2xl border bg-base-100
        p-5 text-left transition-colors ${
          isActive ? "border-brand ring-1 ring-brand" : "border-line hover:border-brand"
        }`}
    >
      <div className="flex items-center gap-4">
        <span
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${
            isActive ? "bg-brand-soft text-brand" : "bg-cream text-ink-muted"
          }`}
        >
          <FaRegCreditCard size={20} />
        </span>
        <div className="flex flex-col gap-0.5">
          <span className="font-display text-base font-semibold text-ink">{method.name}</span>
          <span className="text-sm text-ink-soft">{method.description}</span>
        </div>
      </div>

      <div className="hidden shrink-0 items-center gap-2 text-ink-muted sm:flex">
        <FaCcVisa size={26} />
        <FaCcMastercard size={26} />
        <FaCcAmex size={26} />
      </div>
    </button>
  );
}
