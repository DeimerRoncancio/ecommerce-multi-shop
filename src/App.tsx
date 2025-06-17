import { Outlet } from "react-router";
import NavBar from "./shared/components/navbar/NavBar";
import Footer from "./shared/components/footer/Footer";
import "./App.css";
import { SnackbarProvider } from "notistack";
import ReportComplete from "./shared/components/notistack-variants/ReportComplete";

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
        reportComplete: ReportComplete,
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
