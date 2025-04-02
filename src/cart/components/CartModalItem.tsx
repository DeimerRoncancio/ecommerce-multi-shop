import { useCartItems } from "../storage/cartItems";
import { CartItemType } from "../types/cart"

type CartModalItemProps = {
  item: CartItemType;
}

export default function CartModalItem({ item }: CartModalItemProps) {
  const { addItem, removeItem } = useCartItems()

  return (
    <li className="flex p-1">
      <div className="flex items-center w-20 h-20 object-contain">
        <img src={`${item.productImage}`} />
      </div>
      <div>
        <div>
          <h2 className="truncate">{item.productName}</h2>
          <p className="truncate w-56">{item.productDescription}</p>
        </div>
        <div className="flex justify-between">
          <div>
            <p>{`${item.productPrice}`}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn btn-neutral w-8 text-center h-8 p-2 rounded-full"
              onClick={() => removeItem(item)}
            >-</button>
            <p>{`${item.quantity}`}</p>
            <button className="btn btn-neutral w-8 text-center h-8 p-2 rounded-full"
              onClick={() => addItem(item)}
            >+</button>
          </div>
        </div>
      </div>
    </li>
  )
}
