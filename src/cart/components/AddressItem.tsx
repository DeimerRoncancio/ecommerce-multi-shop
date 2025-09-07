import { BsTelephone, BsTrash } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";
import { AddressType } from "../types/cart";

type Props = {
  address: AddressType;
  isActive: boolean;
  onSelect: (address: AddressType) => void;
}

export default function AddressItem({ address, isActive, onSelect }: Props) {
  return (
    <div className={`flex flex-col justify-center text-left gap-4 mt-6 p-6 border-1 border-[#dedfdf] hover:border-[#f14913]
    rounded-xl transition-colors duration-300 cursor-pointer ${isActive ? 'border-[#f14913]' : ''}`}
    onClick={() => onSelect(address)}>
      <div className="flex flex-col gap-2 mb-1">
        <span className="text-[#5e472d] text-lg font-semibold mb-3">{address.name}</span>
        <div className="flex flex-col gap-1 text-sm text-black mb-1">
          <span className="">{address.addressLine1}</span>
          <span className="">{address.city}</span>
          <span className="">{address.state}</span>
          <span className="">{address.country}</span>
        </div>
        <div className="flex flex-col gap-1 text-sm text-[#636669]">
          <span className="flex items-center gap-2"><IoPersonOutline /> {address.name}</span>
          <span className="flex items-center gap-2"><BsTelephone /> {address.phone}</span>
        </div>
      </div>
      <div className="flex gap-4">
        <button className="btn bg-[#e9fff0] hover:bg-[#d2ffe1] text-[#0cc243] btn-sm max-w-max border-none shadow-none
        focus-visible:outline-none">
          <LuPencil size={16} />
          Editar
        </button>
        <button className="btn bg-[#fef2f2] hover:bg-[#fee2e2] text-[#ef4444] btn-sm max-w-max border-none
        shadow-none focus-visible:outline-none">
          <BsTrash size={16} />
          Eliminar
        </button>
      </div>
    </div>
  )
}