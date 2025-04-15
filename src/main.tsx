import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./auth/pages/Login.tsx";
import App from "./App.tsx";
import "./index.css";
import Profile from "./profile/pages/Profile.tsx";
import ProtectedAuth from "./auth/routes/ProtectedAuth.tsx";
import { Register } from "./auth/pages/Register.tsx";
import Cart from "./cart/pages/Cart.tsx";
import CartContent from "./cart/components/CartContent.tsx";
import CartHeader from "./cart/components/CartHeader.tsx";
import Home from "./home/pages/Home.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedAuth />}>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      <Route element={<Cart />}>
        <Route element={<CartHeader />}>
          <Route path="cart" element={<CartContent />} />
        </Route>
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  </BrowserRouter>,
);
