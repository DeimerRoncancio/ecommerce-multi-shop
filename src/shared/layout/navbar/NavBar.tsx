import { NavLink, useLoaderData } from "react-router";
import CartButton from "./CartButton";
import ProfileButton from "./ProfileButton";
import Search from "./Search";
import MenuButton from "./MenuButton";
import WishListButton from "./WishListButton";
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

  return (
    <nav className="fixed top-0 z-30 w-full border-b border-line bg-base-100/85 backdrop-blur-md">
      <Container className="flex h-16 items-center gap-3 md:gap-6 lg:h-[4.75rem]">
        <div className="flex shrink-0 items-center gap-4">
          <NavLink to="/" className="block w-[78px] sm:w-[92px] lg:w-[110px]" aria-label="Ir al inicio">
            <img src="/images/logo.webp" alt="Multi Shop" className="w-full" />
          </NavLink>
          <div className="hidden lg:block">
            <MenuButton />
          </div>
        </div>

        <div className="min-w-0 flex-1 lg:mx-auto lg:max-w-xl">
          <Search />
        </div>

        <ul className="flex shrink-0 items-center gap-1 sm:gap-2">
          <li className="hidden lg:block">
            <button
              type="button"
              className="rounded-xl px-3 py-2 text-sm font-medium leading-tight text-ink
                transition-colors hover:bg-cream hover:text-brand"
            >
              <span className="block">Mis</span>
              <span className="block">compras</span>
            </button>
          </li>
          <li className="hidden sm:block">
            <WishListButton />
          </li>
          <li>
            <CartButton />
          </li>
          <li className="ml-1 border-l border-line pl-2">
            <ProfileButton size={38} />
          </li>
        </ul>
      </Container>

      {categories.length > 0 && <Categories categories={categories} />}
    </nav>
  );
}
