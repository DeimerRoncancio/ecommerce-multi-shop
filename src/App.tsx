import { Outlet } from "react-router";
import NavBar from "./shared/components/navbar/NavBar";
import Footer from "./shared/components/footer/Footer";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <main className="w-full max-w-[1366px] mx-auto mt-[128px]">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App;
