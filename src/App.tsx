import SnackbarError from "./shared/components/notistack-variants/SnackbarError";
import { mapApiToProducts } from "./products/mappers/products.maper";
import { mapApiToCategories } from "./products/mappers/categories.mapper";
import { getCategories } from "./products/services/categories.api";
import { getProducts } from "./products/services/products.api";
import NavBar from "./shared/components/navbar/NavBar";
import Footer from "./shared/components/footer/Footer";
import { SnackbarProvider } from "notistack";
import { Outlet } from "react-router";
import "./App.css";

export async function loader() {
  const apiProducts = await getProducts();
  const products = apiProducts.map(mapApiToProducts);

  const apiCategories = await getCategories();
  const categories = apiCategories.map(mapApiToCategories);

  return { categories, products }
}

export function HydrateFallBack() {
  return <span className="loading loading-ring loading-lg"></span>;
}

declare module "notistack" {
  interface VariantOverrides {
    reportComplete: true;
  }
}

function App() {
  return (
    <SnackbarProvider
      maxSnack={5}
      Components={{
        reportComplete: SnackbarError,
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
