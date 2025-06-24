import { NavLink, useLoaderData } from "react-router";
import CartButton from "./CartButton";
import ProfileButton from "./ProfileButton";
import Search from "./Search";
import MenuButton from "./MenuButton";
import WishListButton from "./WishListButton";
import Categories from "./categories/Categories";

export default function NavBar() {
  const loaderData = useLoaderData();
  const { categories, products, token } = loaderData;

  return (
    <nav className="fixed top-0 w-full z-20">
      <div className="flex bg-white border-b-[1px] h-fit p-3 px-4 border-[#f1e1dc]">
        <ul className="w-1/3 gap-16 flex">
          <NavLink to="/" className="max-w-[110px] my-auto btn btn-link p-0">
            <img src='/images/logo.webp' />
          </NavLink>
          <MenuButton />
        </ul>

        <ul className="w-1/3 flex justify-center items-center">
          <Search />
        </ul>

        <ul className="flex-row-reverse gap-0 flex items-center w-1/3">
          <li className="px-4 h-full flex items-center">
            <CartButton />
          </li>
          <li className="flex h-full px-4 items-center border-r-[1px] border-[#a2a9b1] text-[#a2a9b1]">
            <WishListButton />
          </li>
          {
            categories && (
              <li className="flex h-full px-4 items-center border-r-[1px] border-[#a2a9b1] text-[#a2a9b1]">
                <button className="flex flex-col p-0 btn btn-link decoration-transparent items-start text-[#343e49] 
                  hover:text-[#343e499f] gap-0 font-semibold text-base">
                  <span className="p-0 m-0 leading-4">Mis</span>
                  <span className="p-0 m-0 leading-4">compras</span>
                </button>
              </li>
            )
          }
          <li className={`flex h-full items-center border-r-[1px] border-[#a2a9b1] px-4 text-[#a2a9b1]`}>
            <ProfileButton size={40} token={token} />
          </li>
        </ul>
      </div>
      { categories && <Categories categories={categories} products={products} /> }
    </nav>
  );
}
