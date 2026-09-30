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
      aria-pressed={isActive}
      className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-colors ${
        isActive ? "border-brand bg-brand-soft/60" : "border-line bg-base-100 hover:border-ink-muted"
      }`}
    >
      <span
        aria-hidden
        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${
          isActive ? "border-brand" : "border-line"
        }`}
      >
        {isActive && <span className="h-2.5 w-2.5 rounded-full bg-brand" />}
      </span>

      <span
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${
          isActive ? "bg-brand text-white" : "bg-cream text-ink-muted"
        }`}
      >
        <FaRegCreditCard size={19} />
      </span>
      <span className="flex flex-1 flex-col gap-0.5">
        <span className="font-extrabold text-ink">{method.name}</span>
        <span className="text-sm text-ink-soft">{method.description}</span>
      </span>

      <span className="hidden shrink-0 items-center gap-2 text-ink-muted sm:flex">
        <FaCcVisa size={26} />
        <FaCcMastercard size={26} />
        <FaCcAmex size={26} />
      </span>
    </button>
  );
}
