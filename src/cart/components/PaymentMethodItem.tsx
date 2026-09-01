import { FaCcAmex, FaCcMastercard, FaCcVisa, FaRegCreditCard } from "react-icons/fa6";
import { PaymentMethodType } from "../types/cart";

type Props = {
  method: PaymentMethodType;
  isActive: boolean;
  onSelect: (method: PaymentMethodType) => void;
}

export default function PaymentMethodItem({ method, isActive, onSelect }: Props) {
  return (
    <div className={`flex items-center justify-between gap-4 mt-6 p-6 border-1 border-[#dedfdf] hover:border-[#f14913]
    rounded-xl transition-colors duration-300 cursor-pointer ${isActive ? 'border-[#f14913]' : ''}`}
    onClick={() => onSelect(method)}>
      <div className="flex items-center gap-4">
        <span className={`flex items-center justify-center w-11 h-11 rounded-full shrink-0
        ${isActive ? 'bg-[#ffccb4] text-[#f14913]' : 'bg-[#f1f1f1] text-[#7d7d7d]'}`}>
          <FaRegCreditCard size={20} />
        </span>
        <div className="flex flex-col gap-1 text-left">
          <span className="text-[#5e472d] text-lg font-semibold">{method.name}</span>
          <span className="text-sm text-[#636669]">{method.description}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[#7d7d7d] shrink-0">
        <FaCcVisa size={26} />
        <FaCcMastercard size={26} />
        <FaCcAmex size={26} />
      </div>
    </div>
  )
}
