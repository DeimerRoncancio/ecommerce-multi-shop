import { BsTelephone, BsTrash } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";
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
      className={`flex flex-col gap-4 rounded-2xl border bg-base-100 p-5 text-left transition-colors ${
        isActive ? "border-brand ring-1 ring-brand" : "border-line hover:border-brand"
      }`}
    >
      <div className="flex flex-col gap-3">
        <span className="font-display text-lg font-semibold text-ink">{address.name}</span>
        <div className="flex flex-col gap-0.5 text-sm text-ink">
          <span>{address.addressLine1}</span>
          <span>{address.city}, {address.state}</span>
          <span>{address.country}</span>
        </div>
        <div className="flex flex-col gap-1 text-sm text-ink-soft">
          <span className="flex items-center gap-2"><IoPersonOutline /> {address.name}</span>
          <span className="flex items-center gap-2"><BsTelephone /> {address.phone}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <span className="btn btn-sm gap-1.5 rounded-lg border-0 bg-cream text-ink-soft shadow-none
          hover:bg-brand-soft hover:text-secondary-content">
          <LuPencil size={14} />
          Editar
        </span>
        <span className="btn btn-sm gap-1.5 rounded-lg border-0 bg-cream text-ink-soft shadow-none
          hover:bg-error/10 hover:text-error">
          <BsTrash size={14} />
          Eliminar
        </span>
      </div>
    </button>
  );
}
