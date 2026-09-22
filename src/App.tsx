import SnackbarError from "./shared/ui/notistack-variants/SnackbarError";
import { mapApiToProducts } from "./products/mappers/products.maper";
import { mapApiToCategories } from "./products/mappers/categories.mapper";
import { getCategories } from "./products/services/categories.api";
import { getProducts } from "./products/services/products.api";
import NavBar from "./shared/layout/navbar/NavBar";
import { SnackbarProvider } from "notistack";
import { Outlet, useLocation } from "react-router";
import "./App.css";
import { getSession } from "./sessions.server";
import type { Route } from "./+types/App";
import Footer from "./shared/layout/footer/Footer";
import { useEffect } from "react";
import { useStepsStorage } from "./cart/storage/steps";
import {
  CHECKOUT_ACCESS_TOKEN_STORAGE_KEY,
  deleteTransaction as deleteCheckoutTransaction,
  getCheckoutAccessToken,
} from "./cart/api/paymentsApi";
import Cookie from "js-cookie";

export async function loader({ request }: Route.LoaderArgs) {
  const apiProducts = await getProducts();
  const products = apiProducts.map(mapApiToProducts);

  const apiCategories = await getCategories();
  const categories = apiCategories.map(mapApiToCategories);

  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get('token')as string;

  return { categories, products, token }
}

declare module "notistack" {
  interface VariantOverrides {
    errorAlert: true;
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

    if (transactionId && checkoutAccessToken) {
      deleteCheckoutTransaction(transactionId, checkoutAccessToken).catch(() => undefined);
    }
  }

  useEffect(() => {
    if (!location.pathname.startsWith("/cart")) {
      clearSteps();
      deleteTransaction();
    }
  }, []);

  return (
    <SnackbarProvider
      maxSnack={5}
      Components={{
        errorAlert: SnackbarError,
      }}
    >
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </SnackbarProvider>
  )
}

export default App;
