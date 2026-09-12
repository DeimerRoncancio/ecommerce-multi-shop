import useCart from "../hooks/useCart";
import CartItem from "../components/CartItem";
import ClearButton from "../components/ClearButton";
import PaymentCardInfo from "../components/PaymentCardInfo";
import { useStepsStorage } from "../storage/steps";
import { useNavigate } from "react-router";
import { payments } from "../api/paymentsApi";
import { cartItemToProductItem } from "../mappers/items.mapper";
import Cookie from "js-cookie";
import { useEffect } from "react";

export default function CartContent() {
  const { cartItems, itemsQuantity, clear } = useCart();
  const navigate = useNavigate();
  const { clearSteps, nextSteps } = useStepsStorage();
  const transactionId = Cookie.get("transactionId");

  const onContinue = async () => {
    if (!transactionId) {
      const { data } = await payments.post("/create-transaction", {
        productItems: cartItems.map(cartItemToProductItem),
        status: "pending"
      });

      Cookie.set("transactionId", data);
    } else {
      await payments.put(`/update-products/${transactionId}`, cartItems.map(cartItemToProductItem));
    }

    nextSteps("Carrito");
    navigate("/cart/user-data");
  }

  useEffect(() => {
    if (!transactionId) clearSteps();
  }, []);

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
