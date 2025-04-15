import { Outlet } from "react-router";
import NavBar from "./shared/components/navbar/NavBar";
import Footer from "./shared/components/footer/Footer";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <main className="m-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App;
