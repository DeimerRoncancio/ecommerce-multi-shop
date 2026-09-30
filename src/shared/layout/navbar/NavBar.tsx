import { useEffect, useState } from "react";
import { NavLink, useLoaderData } from "react-router";
import { FiMapPin, FiRefreshCw, FiTruck } from "react-icons/fi";
import CartButton from "./CartButton";
import ProfileButton from "./ProfileButton";
import Search from "./Search";
import MenuButton from "./MenuButton";
import WishListButton from "./WishListButton";
import TabBar from "./TabBar";
import Categories from "./categories/Categories";
import Container from "../../ui/Container";
import { CategoriesType } from "../../../products/types/categories";
import { ProductTypes } from "../../../products/types/product";

type LoaderProps = {
  categories: CategoriesType[];
  products: ProductTypes[];
};

export default function NavBar() {
  const loaderData = useLoaderData() as LoaderProps | undefined;
  const categories = loaderData?.categories ?? [];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 z-30 w-full bg-base-100 transition-shadow duration-200 ${
          scrolled ? "shadow-[0_8px_24px_-12px_rgb(17_17_17/0.35)]" : "shadow-nav"
        }`}
      >
        <div className="bg-brand text-white">
          <Container className="flex h-16 items-center gap-3 md:gap-5 lg:h-18">
            <NavLink
              to="/"
              className="block shrink-0 transition-transform hover:-rotate-2"
              aria-label="Ir al inicio"
            >
              <img src="/svg/simbolo-blanco.svg" alt="Multi Shop" className="h-11 w-auto sm:hidden" />
              <img src="/svg/logo-fondo-naranja.svg" alt="Multi Shop" className="-ml-2 hidden h-14 w-auto sm:block" />
            </NavLink>

            <button
              type="button"
              className="hidden shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-left transition-colors
                hover:bg-white/15 xl:flex"
            >
              <FiMapPin size={20} />
              <span className="leading-tight">
                <span className="block text-[11px] text-white/80">Enviar a</span>
                <span className="block text-sm font-bold">Colombia</span>
              </span>
            </button>

            <div className="min-w-0 flex-1">
              <Search />
            </div>

            <ul className="hidden shrink-0 items-center gap-1 lg:flex">
              <li>
                <WishListButton />
              </li>
              <li>
                <CartButton />
              </li>
              <li className="ml-2 border-l border-white/30 pl-3">
                <ProfileButton size={40} />
              </li>
            </ul>
          </Container>
        </div>

        <Container className="flex h-12 items-center gap-5">
          <MenuButton categories={categories} />
          {categories.length > 0 && <Categories categories={categories} />}
          <ul className="hidden shrink-0 items-center gap-4 text-[13px] font-semibold text-ink-soft xl:flex">
            <li className="flex items-center gap-2">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-success/10 text-success">
                <FiTruck size={13} />
              </span>
              Envío gratis
            </li>
            <li aria-hidden className="h-4 w-px bg-line" />
            <li className="flex items-center gap-2">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-success/10 text-success">
                <FiRefreshCw size={12} />
              </span>
              30 días para devolver
            </li>
          </ul>
        </Container>
      </nav>

      <TabBar />
    </>
  );
}
