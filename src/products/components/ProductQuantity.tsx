import { FaMinus, FaPlus } from "react-icons/fa6";

type ProductQuantityProps = {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
};

export default function ProductQuantity({ quantity, onQuantityChange }: ProductQuantityProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-medium text-ink">Cantidad</p>
      <div className="flex w-fit items-center overflow-hidden rounded-xl border border-line bg-base-100">
        <button
          type="button"
          aria-label="Quitar una unidad"
          disabled={quantity === 1}
          onClick={() => onQuantityChange(quantity - 1)}
          className="grid h-11 w-11 place-items-center text-ink-soft transition-colors
            hover:bg-cream hover:text-brand disabled:text-base-300 disabled:hover:bg-transparent"
        >
          <FaMinus size={13} />
        </button>
        <span className="grid h-11 w-14 place-items-center border-x border-line font-medium text-ink">
          {quantity}
        </span>
        <button
          type="button"
          aria-label="Agregar una unidad"
          onClick={() => onQuantityChange(quantity + 1)}
          className="grid h-11 w-11 place-items-center text-ink-soft transition-colors
            hover:bg-cream hover:text-brand"
        >
          <FaPlus size={13} />
        </button>
      </div>
    </div>
  );
}
