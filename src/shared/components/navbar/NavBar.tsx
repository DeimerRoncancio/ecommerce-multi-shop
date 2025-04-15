import { NavLink, Outlet } from "react-router";
import { IoMdHeartEmpty } from "react-icons/io";
import CartButton from "./CartButton";
import ProfileButton from "./ProfileButton";
import Search from "./Search";
import MenuButton from "./MenuButton";
import useGetProducts from "../../hooks/api/useGetProducts";
import { BsTelephone, BsTwitterX } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import { SlLocationPin } from "react-icons/sl";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa6";

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
      <footer className="grid grid-rows-[1fr_auto] m-auto text-sm text-[#212529]">
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr] max-w-[85%] m-auto gap-8 pt-[70px] pb-[40px]">
          <div className="flex flex-col items-start gap-4">
            <NavLink to="/" className="btn btn-link h-auto p-0">
              <img src='src\assets\images\logo.webp' width={150} />
            </NavLink>
            <div className="gap-6 flex flex-col">
              <p className="leading-[1.7]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nullam in nibh vehicula, facilisis magna ut, consectetur
                lorem.
              </p>

              <div className="flex items-center justify-start gap-2">
                <SlLocationPin color="#f14a13" size={18} /> 
                <p className="leading-4 text-[#636669]">
                  123 Fashion Street, New York, NY 10001
                </p>
              </div>
              <div className="flex items-center justify-start gap-2">
                <BsTelephone color="#f14a13" size={18} /> 
                <p className="leading-4 text-[#636669]">
                  +1 (555) 123-4567
                </p>
              </div>
              <div className="flex items-center justify-start gap-2">
                <TfiEmail color="#f14a13" size={18} /> 
                <p className="leading-4 text-[#636669]">
                hello@example.com
                </p>
              </div>
            </div>
          </div>
          <div className="text-[#636669]">
            <h2 className="text-[#431d1a] font-medium text-lg mb-8">Productos</h2>
            <ul>{products.map(item => <li className="mb-3">{item.productName}</li>)}</ul>
          </div>
          <div className="text-[#636669]">
            <h2 className="text-[#431d1a] font-medium text-lg mb-8">Sobre nosotros</h2>
            <ul>
              <li className="mb-3">Nosotros</li>
              <li className="mb-3">Politica de calidad</li>
              <li className="mb-3">Política de Garantías y Devoluciones</li>
              <li className="mb-3">Política de tratamiento de datos</li>
              <li className="mb-3">Contactenos</li>
            </ul>
          </div>
          <div className="text-[#636669]">
            <h2 className="text-[#431d1a] font-medium text-lg mb-8">Siguenos</h2>
            <div className="flex gap-3">
              <NavLink to="" className="p-2 rounded-full bg-[#e8e9e9] text-[#212529] hover:bg-[#f04913] 
              hover:text-white transition-all duration-300">
                <FaInstagram size={17} />
              </NavLink>
              <NavLink to="" className="p-2 rounded-full bg-[#e8e9e9] text-[#212529] hover:bg-[#f04913] 
              hover:text-white transition-all duration-300">
                <FaFacebook size={17} />
              </NavLink>
              <NavLink to="" className="p-2 rounded-full bg-[#e8e9e9] text-[#212529] hover:bg-[#f04913] 
              hover:text-white transition-all duration-300">
                <BsTwitterX size={17} />
              </NavLink>
              <NavLink to="" className="p-2 rounded-full bg-[#e8e9e9] text-[#212529] hover:bg-[#f04913] 
              hover:text-white transition-all duration-300">
                <FaTiktok size={17} />
              </NavLink>
              <NavLink to="" className="p-2 rounded-full bg-[#e8e9e9] text-[#212529] hover:bg-[#f04913] 
              hover:text-white transition-all duration-300">
                <FaYoutube size={17} />
              </NavLink>
              <NavLink to="" className="p-2 rounded-full bg-[#e8e9e9] text-[#212529] hover:bg-[#f04913] 
              hover:text-white transition-all duration-300">
                <FaLinkedin size={17} />
              </NavLink>
            </div>
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
