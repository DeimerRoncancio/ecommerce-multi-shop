import { FaMinus, FaPlus } from "react-icons/fa6";

type ProductQuantityProps = {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
};

export default function ProductQuantity({ quantity, onQuantityChange }: ProductQuantityProps) {
  return (
    <div className="flex h-12 shrink-0 items-center rounded-full border border-line bg-base-100" aria-label="Cantidad">
      <button
        type="button"
        aria-label="Quitar una unidad"
        disabled={quantity === 1}
        onClick={() => onQuantityChange(quantity - 1)}
        className="grid h-12 w-11 place-items-center rounded-full text-ink transition-colors
          hover:bg-brand-soft hover:text-brand disabled:text-base-300 disabled:hover:bg-transparent"
      >
        <FaMinus size={12} />
      </button>
      <span className="w-8 text-center font-extrabold text-ink">{quantity}</span>
      <button
        type="button"
        aria-label="Agregar una unidad"
        onClick={() => onQuantityChange(quantity + 1)}
        className="grid h-12 w-11 place-items-center rounded-full text-ink transition-colors
          hover:bg-brand-soft hover:text-brand"
      >
        <FaPlus size={12} />
      </button>
    </div>
  );
}
