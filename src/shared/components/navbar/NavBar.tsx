import { NavLink, Outlet } from "react-router";
import { IoMdHeartEmpty } from "react-icons/io";
import CartButton from "./CartButton";
import ProfileButton from "./ProfileButton";
import Search from "./Search";
import MenuButton from "./MenuButton";
import useGetProducts from "../../hooks/api/useGetProducts";

export default function NavBar() {
  const { products } = useGetProducts();

  return (
    <>
      <nav className="flex border-b-[1px] p-3 px-4 border-[#f1e1dc]">
        <ul className="w-1/3 gap-16 flex">
          <NavLink to="/" className="w-1/4 my-auto btn btn-link p-0">
            <img src='src\assets\images\logo.webp' />
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
            <button className="btn btn-ghost w-10 h-10 p-0 rounded-full text-[#343e49]">
              <IoMdHeartEmpty size={32} />
            </button>
          </li>
          <li className="flex h-full px-4 items-center border-r-[1px] border-[#a2a9b1] text-[#a2a9b1]">
            <button className="flex flex-col p-0 btn btn-link decoration-transparent items-start text-[#343e49] 
              hover:text-[#343e499f] gap-0 font-semibold text-base">
              <span className="p-0 m-0 leading-4">Mis</span>
              <span className="p-0 m-0 leading-4">compras</span>
            </button>
          </li>
          <li className="flex h-full items-center border-r-[1px] border-[#a2a9b1] px-4 text-[#a2a9b1]">
            <ProfileButton size={40} />
          </li>
        </ul>
      </nav>
      <main className="m-auto">
        <Outlet />
      </main>
      <footer className="grid grid-rows-[1fr_auto] m-auto">
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr] max-w-[85%] m-auto gap-5">
          <div>
            <NavLink to="/" className="btn btn-link h-auto">
              <img src='src\assets\images\logo.webp' />
            </NavLink>
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nullam in nibh vehicula, facilisis magna ut, consectetur
                lorem.
              </p>
              <p>Dirección</p>
              <p>Telefono</p>
              <p>Email</p>
            </div>
          </div>
          <div>
            <h2>Productos</h2>
            <ul>{products.map(item => <li>{item.productName}</li>)}</ul>
          </div>
          <div>
            <h2>Sobre nosotros</h2>
            <ul>
              <li>Nosotros</li>
              <li>Politica de calidad</li>
              <li>Política de Garantías y Devoluciones</li>
              <li>Política de tratamiento de datos</li>
              <li>Contactenos</li>
            </ul>
          </div>
          <div>
            <h2>Siguenos</h2>
            <ul>
              <li>Instagram</li>
              <li>Facebook</li>
              <li>X</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p>Aceptamos medios de pago:</p>
          <div className="flex">
            <p>Terminos de servicio</p>
            <p>Terminos de servicio</p>
            <p>Terminos de servicio</p>
          </div>
          <p>© Copyright Multi Shop. Todos los derechos reservados</p>
          <p>Desarrollado por Deimer Roncancio</p>
        </div>
      </footer>
    </>
  );
}
