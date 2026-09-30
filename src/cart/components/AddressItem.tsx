import { FiMapPin, FiPhone } from "react-icons/fi";
import { AddressType } from "../types/cart";

type Props = {
  address: AddressType;
  isActive: boolean;
  onSelect: (address: AddressType) => void;
};

export default function AddressItem({ address, isActive, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={() => onSelect(address)}
      aria-pressed={isActive}
      className={`relative flex flex-col gap-1.5 rounded-2xl border-2 p-4 text-left transition-colors ${
        isActive ? "border-brand bg-brand-soft/60" : "border-line bg-base-100 hover:border-ink-muted"
      }`}
    >
      <span
        aria-hidden
        className={`absolute right-4 top-4 grid h-5 w-5 place-items-center rounded-full border-2 ${
          isActive ? "border-brand" : "border-line"
        }`}
      >
        {isActive && <span className="h-2.5 w-2.5 rounded-full bg-brand" />}
      </span>

      <span className="pr-8 font-extrabold text-ink">{address.name}</span>

      <span className="flex gap-2 text-sm text-ink-soft">
        <FiMapPin size={15} className="mt-0.5 shrink-0 text-brand" />
        <span>
          {address.addressLine1}
          <br />
          {address.city}, {address.state}, {address.country}
        </span>
      </span>
      <span className="flex items-center gap-2 text-sm text-ink-soft">
        <FiPhone size={15} className="shrink-0 text-brand" />
        {address.phone}
      </span>
    </button>
  );
}
