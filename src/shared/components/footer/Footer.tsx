import { BsCashStack, BsPaypal, BsShop } from "react-icons/bs";
import { FaApple, FaGoogle } from "react-icons/fa6";
import { IoCardOutline } from "react-icons/io5";
import { Link } from "react-router";
import useGetProducts from "../../hooks/api/useGetProducts";
import CustomLink from "./CustomLink";
import SocialButton from "./SocialButton";
import ContactItem from "./ContactItem";

export default function Footer() {
  const { products } = useGetProducts();

  return (
    <footer className="grid grid-rows-[1fr_auto] m-auto text-sm text-[#212529]">
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr] max-w-[77%] m-auto gap-5 pt-[70px] pb-[40px]">
        <div className="flex flex-col items-start gap-4">
          <Link to="/" className="btn btn-link h-auto p-0">
            <img src='src\assets\images\logo.webp' width={150} />
          </Link>
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
                <li> <CustomLink to="">{item.productName}</CustomLink> </li>
              ))
            }
          </ul>
        </div>
        <div className="">
          <h2 className="text-[#431d1a9c] font-medium text-lg mb-8">Sobre nosotros</h2>
          <ul className="flex flex-col gap-4">
            <li> <CustomLink to="">Nosotros</CustomLink> </li>
            <li> <CustomLink to="">Politica de calidad</CustomLink> </li>
            <li> <CustomLink to="">Política de Garantías y Devoluciones</CustomLink> </li>
            <li> <CustomLink to="">Política de tratamiento de datos</CustomLink> </li>
            <li> <CustomLink to="">Contactenos</CustomLink> </li>
          </ul>
        </div>
        <div className="flex flex-col text-[#636669]">
          <h2 className="text-[#431d1a9c] font-medium text-lg mb-8">Contactanos</h2>
          <div className="flex flex-col gap-5 mb-10">
            <ContactItem label="123 Fashion Street, New York, NY 10001" iconName="location" size={18} />
            <ContactItem label="+1 (555) 123-4567" iconName="phone" size={18} />
            <ContactItem label="hello@example.com" iconName="email" size={18} />
          </div>
          <div className="flex gap-3">
            <SocialButton iconName="instagram" />
            <SocialButton iconName="facebook" />
            <SocialButton iconName="tiktok" />
            <SocialButton iconName="youtube" />
            <SocialButton iconName="linkedin" />
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
          <li> <CustomLink to="" theme="secondary">Terminos de servicio</CustomLink> </li>
          <li> <CustomLink to="" theme="secondary">Politica de privacidad</CustomLink> </li>
          <li> <CustomLink to="" theme="secondary">Politica de Cookies</CustomLink> </li>
        </ul>
        <p>© Copyright <b className="text-[#36393e]">MultiShop</b>. Todos los derechos reservados</p>
        <p className="flex gap-1">
          Desarrollado por
          <CustomLink to="" theme="terciary">DeimerRoncancio</CustomLink>
        </p>
      </div>
    </footer>
  )
}
