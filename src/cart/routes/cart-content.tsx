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
import { useEffect, useState } from "react";
import { getProducts } from "../../products/services/products.api";
import { mapApiToProducts } from "../../products/mappers/products.maper";
import type { Route } from "./+types/cart-content";

export async function loader() {
  const apiProducts = await getProducts();
  return { products: apiProducts.map(mapApiToProducts) };
}

export default function CartContent({ loaderData }: Route.ComponentProps) {
  const { cartItems, itemsQuantity, clear } = useCart();
  const navigate = useNavigate();
  const { clearSteps, nextSteps } = useStepsStorage();
  const catalog = new Map(loaderData.products.map(product => [product.id, product]));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onContinue = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const transactionId = Cookie.get("transactionId");
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
    } catch {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!Cookie.get("transactionId")) clearSteps();
  }, []);

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
              <p className="max-w-xs text-sm text-ink-muted">
                Agrega productos desde el catálogo y aparecerán aquí.
              </p>
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
            cartItems.map(item => {
              const product = catalog.get(item.id);
              return (
                <CartItem
                  key={item.id}
                  item={item}
                  image={product?.images[0]?.imageUrl}
                  category={product?.categories[0]?.categoryName}
                />
              );
            })
          )}
        </ul>
      </section>

      <PaymentCardInfo
        onContinue={onContinue}
        disabledContinue={!itemsQuantity || isSubmitting}
        continueLabel={isSubmitting ? "Procesando" : undefined}
      />
    </Container>
  );
}
