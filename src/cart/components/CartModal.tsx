import { useCartItems } from "../storage/cartItems"

type CartModalProps = {
  viewCart: boolean,
  hiddeCart: () => void
}

export default function CartModal({ viewCart, hiddeCart }: CartModalProps) {
  const { cartItems } = useCartItems();
  
  return (
    <div className={`${viewCart ? 'opacity-100 visible' : 'opacity-0 invisible'} z-20 flex absolute 
      overflow-hidden top-0 left-0 h-full w-full shadow transition-all duration-300 ease`}>
      <div className="bg-[#1c1c1c7c] h-full w-full absolute" onClick={hiddeCart} />
      <div className={`${viewCart ? '-translate-x-0' : 'translate-x-full'} flex flex-col card-body p-2 w-[27%] 
        h-full overflow-auto right-0 absolute bg-white transition-all duration-300 ease justify-between`}>
        <div>
          <div className="flex justify-between p-2">
            <span className="text-base ">8 Items agregados al carrito</span>
            <button className="btn btn-secondary rounded-full shadow-none" onClick={hiddeCart}>
              Close
            </button>
          </div>
          <div>
            {
              cartItems.map((item) => (
                <div className="flex">
                  <div className="flex items-center w-35 h-40 object-contain">
                    <img src={`${item.productImage}`} />
                  </div>
                  <div>
                    <h2>{item.productName}</h2>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className="card-actions p-2">
          <span className="text-info">Subtotal: $999</span>
          <button className="btn btn-primary btn-block">Ver carrito</button>
        </div>
      </div>
    </div>
  )
}