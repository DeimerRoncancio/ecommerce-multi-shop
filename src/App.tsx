import { mapApiToCategories } from "./products/mappers/categories.mapper";
import { getCategories } from "./products/services/categories.api";
import NavBar from "./shared/layout/navbar/NavBar";
import { data, Outlet, useLocation } from "react-router";
import "./App.css";
import { getSessionUser } from "./auth/session-user.server";
import { getSession, sessionHeaders } from "./sessions.server";
import type { Route } from "./+types/App";
import Footer from "./shared/layout/footer/Footer";
import { useEffect } from "react";
import { useStepsStorage } from "./cart/storage/steps";
import {
  CHECKOUT_ACCESS_TOKEN_STORAGE_KEY,
  PAID_CHECKOUT_ACCESS_TOKEN_STORAGE_KEY,
  cancelPaymentSession,
  deleteTransaction as deleteCheckoutTransaction,
  getCheckoutAccessToken,
} from "./cart/api/paymentsApi";
import Cookie from "js-cookie";

export async function loader({ request }: Route.LoaderArgs) {
  const apiCategories = await getCategories();
  const categories = apiCategories.map(mapApiToCategories);

  const session = await getSession(request.headers.get("Cookie"));
  const user = await getSessionUser(session);
  session.unset("checkoutUser");

  return data({ categories, user }, { headers: await sessionHeaders(request, session) });
}

declare module "notistack" {
  interface VariantOverrides {
    errorAlert: true;
    productAdded: {
      kind: "cart" | "wishlist";
      image?: string;
      removed?: boolean;
      heading?: string;
      onUndo?: () => void;
    };
  }
}

function App() {
  const location = useLocation();
  const { clearSteps } = useStepsStorage();

  const deleteTransaction = () => {
    const transactionId = Cookie.get("transactionId");
    const checkoutAccessToken = getCheckoutAccessToken();

    Cookie.remove("transactionId");
    sessionStorage.removeItem(CHECKOUT_ACCESS_TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(PAID_CHECKOUT_ACCESS_TOKEN_STORAGE_KEY);

    if (transactionId && checkoutAccessToken) {
      cancelPaymentSession(transactionId, checkoutAccessToken)
        .catch(() => undefined)
        .then(() => deleteCheckoutTransaction(transactionId, checkoutAccessToken))
        .catch(() => undefined);
    }
  };

  useEffect(() => {
    if (!location.pathname.startsWith("/cart")) {
      clearSteps();
      deleteTransaction();
    }
  }, []);

  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
