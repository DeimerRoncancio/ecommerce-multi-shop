import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./routes/auth/Login.tsx";
import App from "./App.tsx";
import "./index.css";
import Profile from "./routes/pages/Profile.tsx";
import ProtectedAuth from "./routes/auth/ProtectedAuth.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route element={<ProtectedAuth />}>
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
  </BrowserRouter>,
);
