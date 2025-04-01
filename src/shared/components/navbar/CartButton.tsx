import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";

export default function CartButton() {
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <div className="dropdown dropdown-end px-4 h-full">
        <div className="h-full flex items-center" onClick={() => setShowCart(!showCart)}>
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator text-[25px] text-[#343e49]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" 
              stroke="currentColor">
                <IoCartOutline />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`${showCart ? 'opacity-100 visible' : 'opacity-0 invisible'} z-20 flex absolute 
      overflow-hidden top-0 left-0 h-full w-full shadow transition-all duration-300 ease`}>
        <div className="bg-[#1c1c1c7c] h-full w-full absolute" onClick={() => setShowCart(false)}/>
        <div className={`${showCart ? '-translate-x-0' : 'translate-x-full'} flex flex-col card-body w-[27%] h-full right-0
        absolute bg-white transition-all duration-300 ease pt-2 justify-between`}>
          <div>
            <div className="flex justify-between">
              <span className="text-base ">8 Items agregados al carrito</span>
              <button className="btn btn-secondary rounded-full shadow-none" onClick={() => setShowCart(false)}>
                Close
              </button>
            </div>
          </div>
          <div className="card-actions">
            <span className="text-info">Subtotal: $999</span>
            <button className="btn btn-primary btn-block">View cart</button>
          </div>
        </div>
      </div>
    </>
  )
}
