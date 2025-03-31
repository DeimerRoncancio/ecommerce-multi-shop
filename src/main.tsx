import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./auth/pages/Login.tsx";
import App from "./App.tsx";
import "./index.css";
import Profile from "./profile/pages/Profile.tsx";
import ProtectedAuth from "./auth/routes/ProtectedAuth.tsx";
import NavBar from "./shared/components/navbar/NavBar.tsx";
import { Register } from "./auth/pages/Register.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<NavBar />}>
        <Route path="/" element={<App />} />
        <Route element={<ProtectedAuth />}>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  </BrowserRouter>,
);
