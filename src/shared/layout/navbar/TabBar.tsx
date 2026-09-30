import { NavLink } from "react-router";
import { FiGrid, FiHeart, FiHome, FiShoppingBag, FiUser } from "react-icons/fi";
import useCart from "../../../cart/hooks/useCart";
import useWishList from "../../../wishlist/hooks/useWishList";

export default function TabBar() {
  const { itemsQuantity } = useCart();
  const { wishList } = useWishList();

  const tabs = [
    { to: "/", label: "Inicio", icon: FiHome, end: true },
    { to: "/#catalogo", label: "Categorías", icon: FiGrid, end: true },
    { to: "/profile/wish-list", label: "Favoritos", icon: FiHeart, count: wishList.length },
    { to: "/cart", label: "Carrito", icon: FiShoppingBag, count: itemsQuantity },
    { to: "/profile", label: "Cuenta", icon: FiUser, end: true },
  ];

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-base-100/95 backdrop-blur-md lg:hidden"
    >
      <ul className="mx-auto grid h-18 max-w-lg grid-cols-5">
        {tabs.map(({ to, label, icon: Icon, end, count }) => (
          <li key={label}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `relative flex h-full flex-col items-center justify-center gap-1 text-[11px] font-medium
                transition-colors ${isActive && !to.includes("#") ? "text-brand" : "text-ink-muted hover:text-brand"}`
              }
            >
              <Icon size={21} />
              {label}
              {count ? (
                <span className="absolute left-1/2 top-2.5 ml-1.5 grid h-4 min-w-4 place-items-center rounded-full
                  bg-brand px-1 text-[10px] font-bold text-white">
                  {count}
                </span>
              ) : null}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
