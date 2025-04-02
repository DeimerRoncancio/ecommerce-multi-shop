import { useCart } from "../storage/cartItems";
import { CartItemType } from "../types/cart";
import { MdDeleteOutline } from "react-icons/md";
import { FaPlus, FaMinus  } from "react-icons/fa6";
import { useState } from "react";

type CartModalItemProps = {
  item: CartItemType;
}

export default function CartModalItem({ item }: CartModalItemProps) {
  const { addItem, addItems, removeItem } = useCart()
  const [ quantity, setQuantity ] = useState(item.quantity);

  const handleRemoveItem = () => {
    removeItem({ ...item, quantity: 1 });
  }

  const increaseQuantity = () => {
    addItem(item)
    setQuantity(prev => Number(prev) + 1)
  }

  const decreaseQuantity = () => {
    removeItem(item)
    setQuantity(prev => Number(prev) - 1)
  }

  const updateQuantity = () => {
    if (quantity === item.quantity) return;
    if (quantity === 0) removeItem(item);
    addItems({ ...item, quantity: quantity });
  }

  return (
    <li className="flex p-1 w-full">
      <div className="flex items-center w-20 h-20 object-contain">
        <img src={`${item.productImage}`} />
      </div>
      <div className="flex-1">
        <div>
          <p className="truncate w-56">{item.productDescription}</p>
          <h2 className="truncate">{item.productName}</h2>
        </div>
        <div className="flex justify-between">
          <div>
            <p>{`${item.productPrice}`}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn w-8 text-center text-xl h-8 p-0 rounded-full"
              onClick={handleRemoveItem}>
              <MdDeleteOutline />
            </button>

            <button className={`btn ${item.quantity === 1 ? 'btn-disabled' : 'btn'} w-8 text-center h-8 p-2 rounded-full`}
              onClick={decreaseQuantity}>
              <FaMinus />
            </button>

            <input 
              value={`${quantity}`} className="input w-10 h-7 text-center p-0 focus:outline-none focus:ring-0" type="number"
              onChange={(event) => setQuantity(Number(event.target.value))}
              onBlur={updateQuantity}
              onKeyDown={(ev) => {
                if (ev.key === "Enter") {
                  updateQuantity()
                  ev.currentTarget.blur();
                };
              }}
            />

            <button className="btn w-8 text-center h-8 p-2 rounded-full"
              onClick={increaseQuantity}>
              <FaPlus />
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}
