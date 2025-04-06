import { MdDeleteOutline } from "react-icons/md";
import useCartItems from "../hooks/useCartItems";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { TbCurrencyDollar } from "react-icons/tb";
import { CartItemType } from "../types/cart";

type CartItemProps = {
  item: CartItemType,
  length: number,
  index: number
}

export default function CartItem({ item, length, index }: CartItemProps) {
  const {
    quantity,
    handleRemoveItem,
    increaseQuantity,
    decreaseQuantity,
    changeQuantity,
    updateQuantity
  } = useCartItems(item.id);

  return (
    <li className={`w-full flex ${length - 1 === index ? 'border-b-1' : ''} border-x-1 border-t-1 border-[#e2e1e1] 
      ${length - 1 === index ? 'rounded-b-md' : ''} ${index === 0 ? 'rounded-t-md' : ''} p-4 pr-8`}>
      <div className="flex justify-center bg-white items-center rounded-l">
        <img className="rounded-l w-36 h-27 object-contain" src={`${item.productImage}`} />
      </div>
      <div className="flex flex-1 justify-between">
        <div className="w-[345px] ml-2">
          <p className="text-sm text-[#7d7d7d] font-medium uppercase">{item.productName}</p>
          <p className="text-md text-[#5a5a5a] font-semibold">{item.productDescription}</p>
        </div>
        <div className="flex justify-center items-center">
          <TbCurrencyDollar color="#5a5a5a" size={19} />
          <p className="text-[#5a5a5a] flex font-semibold">
            {new Intl.NumberFormat("es-ES").format(item.productPrice)}
          </p>
        </div>
        <div className="flex items-center">
          <div className="flex items-center gap-4 p-3 py-1 rounded-md border-1 border-[#7c290850]">
            <button className="btn btn-link text-[#7c2908b7] hover:text-[#7c2908ea] text-center text-2xl 
              p-0 rounded-full"
              onClick={handleRemoveItem}>
              <MdDeleteOutline />
            </button>

            <button className={`btn ${item.quantity === 1 ? 'btn-disabled' : 'btn-soft border-[#7c2908b7]'} bg-white
              w-6 text-center h-6 p-0  rounded-full`}
              onClick={decreaseQuantity}>
              <FaMinus />
            </button>

            <input
              value={`${quantity}`} className="input w-10 h-7 text-center p-0 focus:outline-none focus:ring-0"
              type="number"
              onChange={(event) => changeQuantity(Number(event.target.value))}
              onBlur={updateQuantity}
              onKeyDown={(ev) => {
                if (ev.key === "Enter") {
                  updateQuantity()
                  ev.currentTarget.blur();
                };
              }}
            />

            <button className="btn btn-soft border-[#7c2908b7] bg-white w-6 text-center h-6 p-0 rounded-full"
              onClick={increaseQuantity}>
              <FaPlus />
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}