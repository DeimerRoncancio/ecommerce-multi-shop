import { BsCashStack, BsPaypal, BsShop, BsTelephone, BsTwitterX } from "react-icons/bs";
import { FaApple, FaFacebook, FaGoogle, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa6";
import { IoCardOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { TfiEmail } from "react-icons/tfi";
import { NavLink } from "react-router";
import useGetProducts from "../../hooks/api/useGetProducts";

export default function Footer() {
  const { products } = useGetProducts();

  return (
    <footer className="grid grid-rows-[1fr_auto] m-auto text-sm text-[#212529]">
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr] max-w-[77%] m-auto gap-5 pt-[70px] pb-[40px]">
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
          <h2 className="text-[#431d1a9c] font-medium text-lg mb-8">Productos</h2>
          <ul>
            {
              products.map(item => (
                <li className="mb-3 hover:text-[#f04913] transition-all duration-300">
                  <NavLink to="">
                    {item.productName}
                  </NavLink>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="text-[#636669]">
          <h2 className="text-[#431d1a9c] font-medium text-lg mb-8">Sobre nosotros</h2>
          <ul>
            <li className="mb-3 hover:text-[#f04913] transition-all duration-300">
              <NavLink to="">
                Nosotros
              </NavLink>
            </li>
            <li className="mb-3 hover:text-[#f04913] transition-all duration-300">
              <NavLink to="">
                Politica de calidad
              </NavLink>
            </li>
            <li className="mb-3 hover:text-[#f04913] transition-all duration-300">
              <NavLink to="">
                Política de Garantías y Devoluciones
              </NavLink>
            </li>
            <li className="mb-3 hover:text-[#f04913] transition-all duration-300">
              <NavLink to="">
                Política de tratamiento de datos
              </NavLink>
            </li>
            <li className="mb-3 hover:text-[#f04913] transition-all duration-300">
              <NavLink to="">
                Contactenos
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="text-[#636669]">
          <h2 className="text-[#431d1a9c] font-medium text-lg mb-8">Siguenos</h2>
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
        <div className="flex gap-4 text-sm text-[#7a8091] my-6">
          <NavLink to="" className="hover:text-[#f14a13] transition-all duration-300">
            Terminos de servicio
          </NavLink>
          <NavLink to="" className="hover:text-[#f14a13] transition-all duration-300">
            Politica de privacidad
          </NavLink>
          <NavLink to="" className="hover:text-[#f14a13] transition-all duration-300">
            Politicas de Cookies
          </NavLink>
        </div>
        <p>© Copyright <b className="text-[#36393e]">MultiShop</b>. Todos los derechos reservados</p>
        <p className="flex gap-1">
          Desarrollado por
          <NavLink to="" className="text-[#f14a13] hover:text-[#f14b1381] transition-all duration-300">
            DeimerRoncancio
          </NavLink>
        </p>
      </div>
    </footer>
  )
}