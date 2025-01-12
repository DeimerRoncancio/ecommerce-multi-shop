import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./routes/auth/Login.tsx";
import App from "./App.tsx";
import "./index.css";
import Profile from "./routes/pages/Profile.tsx";
import ProtectedAuth from "./routes/auth/ProtectedAuth.tsx";
import NavBar from "./components/NavBar.tsx";
import { Register } from "./routes/auth/Register.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<NavBar />}>
        <Route path="/" element={<App />} />
      </Route>

      <Route element={<ProtectedAuth />}>
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  </BrowserRouter>,
);
