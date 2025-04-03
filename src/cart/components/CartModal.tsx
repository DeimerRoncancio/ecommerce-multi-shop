import { useCart } from "../storage/cartItems"
import CartModalItem from "./CartModalItem";

type CartModalProps = {
  viewCart: boolean,
  hiddeCart: () => void
}

export default function CartModal({ viewCart, hiddeCart }: CartModalProps) {
  const { cartItems } = useCart();
  
  return (
    <div className={`${viewCart ? 'opacity-100 visible' : 'opacity-0 invisible'} z-20 flex absolute 
      overflow-hidden top-0 left-0 h-full w-full shadow transition-all duration-300 ease`}>
      <div className="bg-[#1c1c1c7c] h-full w-full absolute" onClick={hiddeCart} />
      <div className={`${viewCart ? '-translate-x-0' : 'translate-x-full'} flex flex-col card-body p-2 w-[384px] 
        h-full right-0 absolute bg-white transition-all duration-300 ease justify-between`}>
        <div className="flex justify-between p-2">
          <span className="text-base ">{`${cartItems.length}`} Items agregados al carrito</span>
          <button className="btn btn-secondary rounded-full shadow-none" onClick={hiddeCart}>
            Close
          </button>
        </div>
        <ul className="flex flex-col gap-3.5 h-[calc(100%-69px)] overflow-auto">
          {
            cartItems.length ===0 ?
            <div className="flex items-center w-full h-40">
              <p className="text-center">No tienes productos en tu carrito</p>
            </div> :
            cartItems.map((item) => (
              <CartModalItem
                key={`${item.id}`}
                item={item}
              />
            ))
          }
        </ul>
        <div className="card-actions">
          <span className="text-info">Subtotal: $999</span>
          <button className="btn btn-primary btn-block">Ver carrito</button>
        </div>
      </div>
    </div>
  )
}
