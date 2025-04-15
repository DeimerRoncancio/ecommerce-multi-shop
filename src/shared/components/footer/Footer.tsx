import { BsCashStack, BsPaypal, BsShop, BsTelephone, BsTwitterX } from "react-icons/bs";
import { FaApple, FaFacebook, FaGoogle, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa6";
import { IoCardOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { TfiEmail } from "react-icons/tfi";
import { NavLink } from "react-router";
import useGetProducts from "../../hooks/api/useGetProducts";
import CustomLink from "./CustomLink";
import Icon from "./Icon";

export default function Footer() {
  const { products } = useGetProducts();

  return (
    <footer className="grid grid-rows-[1fr_auto] m-auto text-sm text-[#212529]">
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr] max-w-[77%] m-auto gap-5 pt-[70px] pb-[40px]">
        <div className="flex flex-col items-start gap-4">
          <NavLink to="/" className="btn btn-link h-auto p-0">
            <img src='src\assets\images\logo.webp' width={150} />
          </NavLink>
          <div className="flex flex-col">
            <p className="leading-[1.7]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nullam in nibh vehicula, facilisis magna ut, consectetur
              lorem.
            </p>
          </div>
        </div>
        <div className="text-[#636669]">
          <h2 className="text-[#431d1a9c] font-medium text-lg mb-8">Productos</h2>
          <ul className="flex flex-col gap-4">
            {
              products.map(item => (
                <li> <CustomLink>{item.productName}</CustomLink> </li>
              ))
            }
          </ul>
        </div>
        <div className="">
          <h2 className="text-[#431d1a9c] font-medium text-lg mb-8">Sobre nosotros</h2>
          <ul className="flex flex-col gap-4">
            <li> <CustomLink>Nosotros</CustomLink> </li>
            <li> <CustomLink>Politica de calidad</CustomLink> </li>
            <li> <CustomLink>Política de Garantías y Devoluciones</CustomLink> </li>
            <li> <CustomLink>Política de tratamiento de datos</CustomLink> </li>
            <li> <CustomLink>Contactenos</CustomLink> </li>
          </ul>
        </div>
        <div className="flex flex-col text-[#636669]">
          <h2 className="text-[#431d1a9c] font-medium text-lg mb-8">Contactanos</h2>
          <div className="flex flex-col gap-5 mb-10">
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
          <div className="flex gap-3">
            <NavLink to="" className="p-2 rounded-full bg-[#e8e9e9] text-[#212529] hover:bg-[#f04913] 
              hover:text-white transition-all duration-300">
              <Icon name="instagram" />
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
      <div className="flex flex-col items-center py-7 bg-[#fff4ef]">
        <div className="flex items-center gap-3 text-[#5f6368]">
          <p className="font-semibold text-base">Aceptamos:</p>
          <IoCardOutline size={24} className="hover:text-[#f14a13] transition-all duration-300" />
          <BsPaypal size={24} className="hover:text-[#f14a13] transition-all duration-300" />
          <FaApple size={24} className="hover:text-[#f14a13] transition-all duration-300" />
          <FaGoogle size={24} className="hover:text-[#f14a13] transition-all duration-300" />
          <BsShop size={24} className="hover:text-[#f14a13] transition-all duration-300" />
          <BsCashStack size={24} className="hover:text-[#f14a13] transition-all duration-300" />
        </div>
        <ul className="flex gap-4 text-sm my-6">
          <li> <CustomLink theme="secondary">Terminos de servicio</CustomLink> </li>
          <li> <CustomLink theme="secondary">Politica de privacidad</CustomLink> </li>
          <li> <CustomLink theme="secondary">Politica de Cookies</CustomLink> </li>
        </ul>
        <p>© Copyright <b className="text-[#36393e]">MultiShop</b>. Todos los derechos reservados</p>
        <p className="flex gap-1">
          Desarrollado por
          <CustomLink theme="terciary">DeimerRoncancio</CustomLink>
        </p>
      </div>
    </footer>
  )
}
