import { NavLink, Outlet } from "react-router";

export default function NavBar() {
  return (
    <>
      <nav>
        <ul className="w-full flex justify-center p-4 gap-6">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="login">Login</NavLink>
          </li>
          <li>
            <NavLink to="register">Register</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
