import { CartItemType } from "../types/cart";
import { MdDeleteOutline } from "react-icons/md";
import { FaPlus, FaMinus  } from "react-icons/fa6";
import useCartItems from "../hooks/useCartItems";

type CartModalItemProps = {
  item: CartItemType;
  length: number;
  index: number;
}

export default function CartModalItem({ item, length, index }: CartModalItemProps) {
  const {
    quantity,
    handleRemoveItem,
    increaseQuantity,
    decreaseQuantity,
    changeQuantity,
    updateQuantity 
  } = useCartItems(item.id);

  return (
    <li className="flex flex-col p-1 w-full items-center ">
      <div className="flex w-full items-center">
        <div className="flex items-center w-20 h-20 p-0 pr-1 object-contain">
          <img src={`${item.productImage}`} />
        </div>
        <div className="flex-1">
          <div>
            <p className="truncate w-61 text-[#5a5a5a] text-base">{item.productDescription}</p>
            <h2 className="truncate text-[10px] text-[#9a9a9a]">{item.productName.toUpperCase()}</h2>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div>
              <p className="text-[#5a5a5a] ml-2 font-semibold">
                $ {new Intl.NumberFormat("es-ES").format(item.productPrice)}
              </p>
            </div>
            <div className="flex items-center gap-2 p-2 shadow-md rounded-2xl bg-[#f4f4f4]">
              <button className="btn btn-link text-[#7c2908b7] hover:text-[#7c2908ea] w-6 text-center text-xl h-6 p-0 rounded-full"
                onClick={handleRemoveItem}>
                <MdDeleteOutline />
              </button>

              <button className={`btn ${item.quantity === 1 ? 'btn-disabled' : 'btn-soft'} w-6 text-center h-6 p-0 rounded-full`}
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

              <button className="btn btn-soft w-6 text-center h-6 p-0 rounded-full"
                onClick={increaseQuantity}>
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`${length - 1 === index ? 'hidden' : ''} w-full h-[2px] mt-2.5 bg-[#e3e3e3]`}></div>
    </li>
  )
}
