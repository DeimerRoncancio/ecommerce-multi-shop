import { FaMinus, FaPlus } from "react-icons/fa6";

type ProductQuantityProps = {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
};

export default function ProductQuantity({ quantity, onQuantityChange }: ProductQuantityProps) {

  return (
    <div className="flex flex-col">
      <p className="text-[#364153] font-medium mb-2">Cantidad</p>
      <div className="flex">
        <div className="flex items-center">
          <button className="btn btn-soft rounded-r-none rounded-l-2 bg-white border-[1px] 
          border-[#7c290850]" disabled={quantity === 1} onClick={() => onQuantityChange(quantity - 1)}>
            <FaMinus />
          </button>
          <input
            value={quantity} className="input w-15 h-full bg-white border-[1px] border-y-[#7c290850] 
              border-x-0 rounded-none !outline-none text-center pr-6
              [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
          />
          <button className="btn btn-soft rounded-l-none rounded-r-2 bg-white border-[1px] 
          border-[#7c290850]" onClick={() => onQuantityChange(quantity + 1)} >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  )
}
