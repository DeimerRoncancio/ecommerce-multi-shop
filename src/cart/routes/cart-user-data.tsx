import { useNavigate } from "react-router";
import { useSteps } from "../storage/steps";
import PaymentCardInfo from "../components/PaymentCardInfo";
import useCart from "../hooks/useCart";

export default function CartUserData() {
  const { cartItems } = useCart();
  const { nextSteps } = useSteps();
  const navigate = useNavigate();

  const nextStep = () => {
    nextSteps("Datos de usuario");
    navigate("/cart/delivery");
  }

  return (
      <div className="flex justify-center text-black">
      <div className="flex flex-col p-4 w-[50%] max-w-[850px] min-w-[600px]">
        <h2 className="text-[#333333] text-xl m-4">Datos de usuario</h2>
        <form className="grid grid-cols-2 text-sm gap-4 border-t-1 border-[#e8e9e9] p-5">
          <div>
            <span className="text-[#5e472d]">Nombres</span>
            <input
              type="text"
              placeholder="Tus nombres"
              className="p-3 pl-4 mt-3 border-2 border-[#dedfdf] rounded-xl outline-0 w-full focus:outline-3 
              focus:outline-[#ffc1ad] focus:border-[#f14913]"
            />
          </div>
          <div>
            <span className="text-[#5e472d]">Apellidos</span>
            <input
              type="text"
              placeholder="Tus apellidos"
              className="p-3 pl-4 mt-3 border-2 border-[#dedfdf] rounded-xl outline-0 w-full focus:outline-3 
              focus:outline-[#ffc1ad] focus:border-[#f14913]"
            />
          </div>
          <div className="col-span-2">
            <span className="text-[#5e472d]">Email</span>
            <input
              type="email"
              placeholder="Tu correo electronico"
              className="p-3 pl-4 mt-3 border-2 border-[#dedfdf] rounded-xl outline-0 w-full focus:outline-3 
              focus:outline-[#ffc1ad] focus:border-[#f14913]"
            />
          </div>
          <div className="col-span-2">
            <span className="text-[#5e472d]">Telefono</span>
            <input
              type="text"
              placeholder="Tu numero de telefono"
              className="p-3 pl-4 mt-3 border-2 border-[#dedfdf] rounded-xl outline-0 w-full focus:outline-3 
              focus:outline-[#ffc1ad] focus:border-[#f14913]"
            />
          </div>
        </form>
        <div className="flex flex-col text-[#969696] border-t-1 border-[#e8e9e9] pl-5">
          <div className="flex items-center mt-5">
            <input type="checkbox" className="checkbox checkbox-sm" />
            <span className="ml-2 text-sm">
              *Acepto <b>términos y condiciones,términos y condiciones marketplace</b>
            </span>
          </div>
          
          <div className="flex items-center mt-4">
            <input type="checkbox" className="checkbox checkbox-sm" />
            <span className="ml-2 text-sm">
              *Autorizo <b>tratamiento de mis datos personales</b>
            </span>
          </div>
          
          <div className="flex items-center mt-4">
            <input type="checkbox" className="checkbox checkbox-sm" />
            <span className="ml-2 text-sm">
              Autorizo <b>eltratamiento de mis datos para el envío de publicidad</b>
            </span>
          </div>
        </div>
      </div>

      <div className="w-[30%] mt-8">
        <PaymentCardInfo products={cartItems} nextStep={nextStep} />
      </div>
    </div>
  );
}
