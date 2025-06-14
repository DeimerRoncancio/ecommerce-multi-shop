import React from "react";
import ReactDOM from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
import "./index.css";

ReactDOM.hydrateRoot(
  document,
  <React.StrictMode>
    <HydratedRouter />
  </React.StrictMode>
);

// <BrowserRouter>
//   <Routes>
//     <Route element={<App />}>
//       <Route path="/" element={<Home />} />
//       <Route element={<ProfilePage />} >
//         <Route element={<ProtectedAuth />}>
//           <Route path="profile" element={<Profile />} />
//         </Route>
//         <Route path="profile/wish-list" element={<WishList />} />
//       </Route>
//     </Route>

//     <Route element={<Cart />}>
//       <Route element={<CartHeader />}>
//         <Route path="cart" element={<CartContent />} />
//       </Route>
//     </Route>

//     <Route path="login" element={<Login />} />
//     <Route path="register" element={<Register />} />
//   </Routes>
// </BrowserRouter>,
