import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import CartModal from "../../../cart/components/modal/CartModal";
import useCart from "../../../cart/hooks/useCart";

export default function CartButton() {
  const [ showCart, setShowCart ] = useState(false);
  const { itemsQuantity } = useCart();

  const handleHiddeCart = () => {
    setShowCart(false);
  }

  return (
    <>
      <div className="dropdown dropdown-end">
        <div className="h-full flex items-center" onClick={() => setShowCart(!showCart)}>
          <div tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator text-[25px] text-[#343e49]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" 
              stroke="currentColor">
                <IoCartOutline />
              </svg>
              <span className="badge badge-sm indicator-item">{itemsQuantity}</span>
            </div>
          </div>
        </div>
      </div>
      <CartModal
        viewCart={showCart}
        hiddeCart={handleHiddeCart}
      />
    </>
  )
}
