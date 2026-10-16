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
import { cartItemToProductItem, productToCart } from "../mappers/items.mapper";
import { useCartStore } from "../storage/cart";
import { getProductsByIds } from "../../products/services/products.api";
import { mapApiToProducts } from "../../products/mappers/products.mapper";
import { SnackbarUtilities } from "../../shared/utilities/snackbar-manager";
import Cookie from "js-cookie";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";

const PAGE_SIZE = 5;

export default function CartContent() {
  const { cartItems, itemsQuantity, clear } = useCart();
  const navigate = useNavigate();
  const { clearSteps, nextSteps } = useStepsStorage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const refreshed = useRef(false);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const hidden = Math.max(cartItems.length - visible, 0);
  const ids = cartItems.map(({ id }) => id).join(",");

  const onContinue = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const transactionId = Cookie.get("transactionId");
      const checkoutAccessToken = getCheckoutAccessToken();

      if (!transactionId || !checkoutAccessToken) {
        const transaction = await createTransaction(cartItems.map(cartItemToProductItem));

        Cookie.set("transactionId", transaction.transactionId);
        sessionStorage.setItem(CHECKOUT_ACCESS_TOKEN_STORAGE_KEY, transaction.checkoutAccessToken);
      } else {
        await updateTransactionProducts(transactionId, checkoutAccessToken, cartItems.map(cartItemToProductItem));
      }

      nextSteps("Carrito");
      navigate("/cart/user-data");
    } catch {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!Cookie.get("transactionId")) clearSteps();
  }, []);

  useEffect(() => {
    if (refreshed.current || !ids) return;
    refreshed.current = true;

    getProductsByIds(ids.split(","))
      .then(found => {
        const products = new Map(found.map(product => [product.id, mapApiToProducts(product)]));
        const { cartItems: current, replaceItems } = useCartStore.getState();
        const removed = current.filter(({ id }) => !products.has(id));

        replaceItems(
          current.flatMap(item => {
            const product = products.get(item.id);
            return product ? [productToCart({ product, quantity: item.quantity, isExists: true })] : [];
          }),
        );

        if (removed.length)
          SnackbarUtilities.warning(
            `${removed.map(({ productName }) => productName).join(", ")} ya no está disponible y lo quitamos del carrito.`,
          );
      })
      .catch(() => undefined);
  }, [ids]);

  return (
    <Container className="grid items-start gap-8 pb-16 lg:grid-cols-[1fr_380px] lg:gap-12">
      <section>
        <div className="mb-2 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-ink">Tu carrito</h1>
            <p className="mt-1 text-ink-muted">
              {itemsQuantity > 0
                ? `${itemsQuantity} ${itemsQuantity === 1 ? "producto" : "productos"} · revísalos antes de continuar.`
                : "Todavía no has agregado productos."}
            </p>
          </div>
          {itemsQuantity > 0 && <ClearButton fontSize={14} clear={clear} />}
        </div>

        <ul>
          {!itemsQuantity ? (
            <li className="flex flex-col items-center gap-3 px-4 py-16 text-center">
              <img src="/images/box-empty.png" alt="" width={110} />
              <p className="text-lg font-bold text-ink">Tu carrito está vacío</p>
              <p className="max-w-xs text-sm text-ink-muted">Agrega productos desde el catálogo y aparecerán aquí.</p>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="mt-2 inline-flex h-11 items-center rounded-full bg-brand px-6 font-bold text-white
                  transition-colors hover:bg-ink"
              >
                Ir a comprar
              </button>
            </li>
          ) : (
            cartItems.slice(0, visible).map(item => <CartItem key={item.id} item={item} />)
          )}
        </ul>

        {cartItems.length > PAGE_SIZE && (
          <button
            type="button"
            onClick={() => setVisible(hidden ? visible + PAGE_SIZE : PAGE_SIZE)}
            className="mx-auto mt-5 flex h-10 items-center gap-2 rounded-full border border-line px-5 text-sm font-bold
              text-ink transition-colors hover:border-ink"
          >
            {hidden ? `Ver más (${hidden})` : "Ver menos"}
            {hidden ? <FiChevronDown size={16} /> : <FiChevronUp size={16} />}
          </button>
        )}
      </section>

      <PaymentCardInfo
        onContinue={onContinue}
        disabledContinue={!itemsQuantity || isSubmitting}
        continueLabel={isSubmitting ? "Procesando" : undefined}
      />
    </Container>
  );
}
