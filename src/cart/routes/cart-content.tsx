import useCart from "../hooks/useCart";
import CartItem from "../components/CartItem";
import ClearButton from "../components/ClearButton";
import PaymentCardInfo from "../components/PaymentCardInfo";
import { useStepsStorage } from "../storage/steps";
import { useNavigate } from "react-router";
import { useOrderStorage } from "../storage/orders";

export default function CartContent() {
  const { cartItems, itemsQuantity, clear } = useCart();
  const { addProducts } = useOrderStorage();
  const navigate = useNavigate();
  const { nextSteps } = useStepsStorage();

  const onContinue = () => {
    addProducts(cartItems);
    nextSteps("Carrito");
    navigate("/cart/user-data");
  }

  return (
    <>
      <div className="flex ajust-screen m-10 mt-15 gap-10 p-10">
        <div className="flex flex-col w-[70%]">
          <div className="flex justify-between mb-5 items-center">
            <div className="flex gap-1 items-center">
              <h1 className="text-[#333333] text-xl">Carrito</h1>
              <h1 className="text-lg text-[#4a4a4a]">({itemsQuantity} productos)</h1>
            </div>
            <div>
              <ClearButton fontSize={16} clear={clear} />
            </div>
          </div>

          <ul>
            {!itemsQuantity ?
              <li className="flex items-center justify-center text-[#646464] text-xl w-full h-40">
                <p className="text-center">No tienes productos en tu carrito</p>
              </li> :
              cartItems.map((item, index) =>
                <CartItem key={item.id} item={item} length={cartItems.length} index={index} />
              )}
          </ul>
        </div>

        <div className="w-[30%]">
          <PaymentCardInfo onContinue={onContinue} disabledContinue={!itemsQuantity} />
        </div>
      </div>
    </>
  )
}
