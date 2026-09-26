import useCart from "../hooks/useCart";
import CartItem from "../components/CartItem";
import ClearButton from "../components/ClearButton";
import PaymentCardInfo from "../components/PaymentCardInfo";
import Container from "../../shared/ui/Container";
import { useStepsStorage } from "../storage/steps";
import { useNavigate } from "react-router";
import {
  CHECKOUT_ACCESS_TOKEN_STORAGE_KEY,
  createTransaction,
  getCheckoutAccessToken,
  updateTransactionProducts,
} from "../api/paymentsApi";
import { cartItemToProductItem } from "../mappers/items.mapper";
import Cookie from "js-cookie";
import { useEffect } from "react";

export default function CartContent() {
  const { cartItems, itemsQuantity, clear } = useCart();
  const navigate = useNavigate();
  const { clearSteps, nextSteps } = useStepsStorage();
  const transactionId = Cookie.get("transactionId");

  const onContinue = async () => {
    const checkoutAccessToken = getCheckoutAccessToken();

    if (!transactionId || !checkoutAccessToken) {
      const transaction = await createTransaction(cartItems.map(cartItemToProductItem));

      Cookie.set("transactionId", transaction.transactionId);
      sessionStorage.setItem(
        CHECKOUT_ACCESS_TOKEN_STORAGE_KEY,
        transaction.checkoutAccessToken,
      );
    } else {
      await updateTransactionProducts(
        transactionId,
        checkoutAccessToken,
        cartItems.map(cartItemToProductItem),
      );
    }

    nextSteps("Carrito");
    navigate("/cart/user-data");
  };

  useEffect(() => {
    if (!transactionId) clearSteps();
  }, []);

  return (
    <Container className="grid items-start gap-8 pb-16 lg:grid-cols-[1fr_360px]">
      <section>
        <div className="mb-4 flex items-center justify-between gap-4">
          <h1 className="font-display text-xl font-semibold text-ink">
            Carrito
            <span className="ml-2 text-base font-normal text-ink-muted">
              ({itemsQuantity} productos)
            </span>
          </h1>
          {itemsQuantity > 0 && <ClearButton fontSize={14} clear={clear} />}
        </div>

        <ul className="overflow-hidden rounded-2xl border border-line bg-base-100">
          {!itemsQuantity ? (
            <li className="flex flex-col items-center gap-3 px-4 py-16 text-center">
              <img src="/images/box-empty.png" alt="" width={110} />
              <p className="text-lg font-medium text-ink-soft">No tienes productos en tu carrito</p>
            </li>
          ) : (
            cartItems.map((item, index) => (
              <CartItem key={item.id} item={item} length={cartItems.length} index={index} />
            ))
          )}
        </ul>
      </section>

      <PaymentCardInfo onContinue={onContinue} disabledContinue={!itemsQuantity} />
    </Container>
  );
}
