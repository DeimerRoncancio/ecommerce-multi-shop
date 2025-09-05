import { Link, useNavigate } from "react-router";
import { useStepsStorage } from "../storage/steps";
import PaymentCardInfo from "../components/PaymentCardInfo";
import { useForm } from "react-hook-form";
import { UserData, UserDataForm } from "../zod/routesCart";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImputsFromUserData, TermsOfService } from "../constants/user-data.helper";
import { useOrderStorage } from "../storage/orders";
import { useEffect } from "react";
import { UserDataInitialValues } from "../constants/user-data-initial-values";
import useUser from "../../profile/hooks/api/useUser";
import { Route } from "./+types/cart-user-data";
import { getSession } from "../../sessions.server";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get('token') as string;
  return { token };
}

export default function CartUserData({ loaderData }: Route.ComponentProps) {
  const { token } = loaderData;
  const { user } = useUser({ token });
  const { order, addUser } = useOrderStorage();
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<UserDataForm>({
    resolver: zodResolver(UserData),
    mode: 'onChange'
  });

  const { nextSteps } = useStepsStorage();
  const navigate = useNavigate();

  const onSubmit = (data: UserDataForm) => {
    if (!isValid) return;
    addUser(data);
    nextSteps("Datos de usuario");
    navigate('/cart/delivery');
  };

  useEffect(() => {
    order.user.email
      ? reset(UserDataInitialValues(order.user))
      : user && reset(UserDataInitialValues(order.user, user));
  }, [user, order.user, reset]);

  return (
    <div className="flex gap-3 justify-center text-black mb-4">
      <div className="flex flex-col p-4 w-[50%] max-w-[850px] min-w-[600px]">
        <h2 className={`text-[#333333] text-xl mx-4 mt-4 ${(order.user.email || user.email) && 'mb-4'}`}>
          Datos de usuario
        </h2>
        {(!order.user.email && !user.email) &&
          <p className="text-[#575757] text- mx-4 mb-4">
            <Link className="text-[#f14913]" to="/login">Inicia sesión</Link> para rellenar los datos rapidamente
          </p>}
        <form className=" text-sm border-t-1 border-[#e8e9e9]"
          onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 p-5">
            {ImputsFromUserData.map((input) => (
              <div key={input.name} className={`${input.name === "phone" || input.name === "email" ? "col-span-2" : ""}`}>
                <span className="text-[#5e472d]">{input.label}</span>
                <input
                  type={input.type}
                  placeholder={input.placeholder}
                  className="p-3 pl-4 mt-3 border-2 border-[#dedfdf] rounded-xl outline-0 w-full focus:outline-3 
                  focus:outline-[#ffc1ad] focus:border-[#f14913]"
                  {...register(input.name as keyof UserDataForm)}
                />
                {errors[input.name as keyof UserDataForm] && (
                  <span className="text-red-500">
                    {errors[input.name as keyof UserDataForm]?.message as string}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col col-span-2 text-[#969696] border-t-1 border-[#e8e9e9] px-5">
            {TermsOfService.map(term => (
              <div key={term.id} className="flex items-center mt-4">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  {...register(term.name as keyof UserDataForm)}
                />
                <span className="ml-2 text-sm">
                  {term.mandatory ? "*" : ""} {term.isAuthorization ? "Autorizo" : "Acepto"} <b>{term.text}</b>
                </span>
              </div>
            ))}
          </div>
          <button type="submit" className="hidden">Send</button>
        </form>
      </div>

      <div className="w-[30%] mt-8">
        <PaymentCardInfo
          onContinue={handleSubmit(onSubmit)}
          disabledContinue={!isValid}
        />
      </div>
    </div>
  );
}
