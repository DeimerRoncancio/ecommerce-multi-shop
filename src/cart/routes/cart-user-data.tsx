import { useNavigate } from "react-router";
import { useSteps } from "../storage/steps";
import PaymentCardInfo from "../components/PaymentCardInfo";
import { useForm } from "react-hook-form";
import { UserData, UserDataForm } from "../zod/routesCart";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImputsFromUserData, TermsOfService } from "../constants/user-data.helper";

export default function CartUserData() {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<UserDataForm>({
    resolver: zodResolver(UserData),
    mode: 'onChange'
  });

  const { nextSteps } = useSteps();
  const navigate = useNavigate();

  const onSubmit = (data: UserDataForm) => {
    console.log(data);
    if (!isValid) return;
    nextSteps("Datos de usuario");
    navigate('/cart/delivery');
  };

  return (
    <div className="flex justify-center text-black">
      <div className="flex flex-col p-4 w-[50%] max-w-[850px] min-w-[600px]">
        <h2 className="text-[#333333] text-xl m-4">Datos de usuario</h2>
        <form className="grid grid-cols-2 text-sm gap-4 border-t-1 border-[#e8e9e9] py-5" 
        onSubmit={handleSubmit(onSubmit)}>
          {ImputsFromUserData.map((input) => (
            <div key={input.name} className={`${input.name === "phone" || input.name === "email" ? "col-span-2" : ""}
            px-5`}>
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
          <button type="submit" className="hidden">Send</button>
          <div className="flex flex-col col-span-2 text-[#969696] border-t-1 border-[#e8e9e9] px-5">
            {TermsOfService.map(term => (
              <div key={term.id} className="flex items-center mt-4">
                <input type="checkbox" className="checkbox checkbox-sm" />
                <span className="ml-2 text-sm">
                  {term.mandatory ? "*" : ""} {term.isAuthorization ? "Autorizo" : "Acepto"} <b>{term.text}</b>
                </span>
              </div>
            ))}
          </div>
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
