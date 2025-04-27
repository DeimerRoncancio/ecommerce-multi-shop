import { IoCloseOutline    } from "react-icons/io5";
import { useNavigate } from "react-router";
import useCart from "../../hooks/useCart";
import CartModalItem from "./CartModalItem";
import ClearButton from "../ClearButton";

type CartModalProps = {
  viewCart: boolean,
  hiddeCart: () => void
}

export default function CartModal({ viewCart, hiddeCart }: CartModalProps) {
  const { cartItems, totalPrice, itemsQuantity, clear } = useCart();

  const navigate = useNavigate();

  const goCart = () => {
    navigate("/cart");
    hiddeCart();
  }

  return (
    <div className={`${viewCart ? 'opacity-100 visible' : 'opacity-0 invisible'} z-20 flex 
      overflow-hidden fixed top-0 left-0 h-full w-full shadow transition-all duration-300 ease`}>
      <div className="bg-[#1c1c1c7c] h-full w-full absolute" onClick={hiddeCart} />

      <div className={`${viewCart ? '-translate-x-0' : 'translate-x-full'} flex flex-col card-body p-0 w-[384px] 
        h-full right-0 absolute bg-white transition-all duration-300 ease justify-between`}>
        <div className="flex justify-between text-lg text-black items-center p-4 py-1 bg-[#f4f4f4]">
          <span className="text-base">{`${itemsQuantity}`} productos en el carrito</span>
          <button className="btn btn-link p-0 rounded-full shadow-none" onClick={hiddeCart}>
            <IoCloseOutline  size={35} />
          </button>
        </div>

        <ul className="flex flex-col h-[calc(100%-69px)] p-1 overflow-auto">
          {
            !cartItems.length ?
              <div className="flex items-center justify-center text-[#646464] text-base w-full h-40">
                <p className="text-center">No tienes productos en tu carrito</p>
              </div> :
            cartItems.map((item, index) => (
              <CartModalItem
                key={item.id}
                item={item}
                length={cartItems.length}
                index={index}
              />
            ))
          }
        </ul>

        <div className="card-actions p-4 pt-0">
          <div className="flex w-full items-center justify-between py-2 text-[#646464]">
            <span>Subtotal: </span>
            <span className="font-medium text-[17px]">
              ${new Intl.NumberFormat("es-ES").format(totalPrice)}
            </span>
          </div>
          <button className="btn btn-neutral btn-block rounded-sm" onClick={goCart}>Ver carrito/pagar</button>
          <ClearButton fontSize={14} clear={clear} />
        </div>
      </div>
    </div>
  )
}
