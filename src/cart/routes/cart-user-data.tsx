import { Link, redirect, useNavigate } from "react-router";
import Container from "../../shared/ui/Container";
import { useStepsStorage } from "../storage/steps";
import PaymentCardInfo from "../components/PaymentCardInfo";
import { useForm } from "react-hook-form";
import { UserData, UserDataForm } from "../zod/routesCart";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ImputsFromUserData,
  TermsOfService,
} from "../constants/user-data.helper";
import { useEffect } from "react";
import { parse } from "cookie";
import { UserDataInitialValues } from "../constants/user-data-initial-values";
import useUser from "../../profile/hooks/api/useUser";
import type { Route } from "./+types/cart-user-data";
import { getSession } from "../../sessions.server";
import Cookie from "js-cookie";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token") as string;

  const transactionId = parse(
    request.headers.get("Cookie") || "",
  ).transactionId;
  if (!transactionId) return redirect("/cart");

  const userDataFromCookies = parse(
    request.headers.get("Cookie") || "",
  ).userData;

  return { token, userDataFromCookies };
}

export default function CartUserData({ loaderData }: Route.ComponentProps) {
  const { token, userDataFromCookies } = loaderData;
  const { user } = useUser({ token });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<UserDataForm>({
    resolver: zodResolver(UserData),
    mode: "onChange",
  });

  const { nextSteps } = useStepsStorage();
  const navigate = useNavigate();

  const userData = JSON.parse(userDataFromCookies || "{}") || null;

  const onSubmit = (data: UserDataForm) => {
    if (!isValid) return;

    Cookie.set("userData", JSON.stringify(data));
    nextSteps("Datos de usuario");
    navigate("/cart/delivery");
  };

  useEffect(() => {
    !userData
      ? reset(UserDataInitialValues(userData))
      : user && reset(UserDataInitialValues(userData, user));
  }, [user, reset]);

  return (
    <Container className="grid items-start gap-8 pb-16 lg:grid-cols-[1fr_360px]">
      <section className="overflow-hidden rounded-2xl border border-line bg-base-100">
        <div className="border-b border-line px-5 py-4">
          <h2 className="font-display text-lg font-semibold text-ink">Datos de usuario</h2>
          {!userData.email && !user.email && (
            <p className="mt-1 text-sm text-ink-soft">
              <Link className="font-medium text-brand hover:underline" to="/login">
                Inicia sesión
              </Link>{" "}
              para rellenar los datos rápidamente
            </p>
          )}
        </div>
        <form className="text-sm" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-5 p-5 sm:grid-cols-2">
            {ImputsFromUserData.map((input) => (
              <div
                key={input.name}
                className={`${input.name === "phone" || input.name === "email" ? "col-span-2" : ""}`}
              >
                <span className="font-medium text-ink">{input.label}</span>
                <input
                  type={input.type}
                  placeholder={input.placeholder}
                  className="mt-2 w-full rounded-xl border border-line bg-base-100 p-3 px-4 text-ink
                    outline-none transition-colors placeholder:text-ink-muted focus:border-brand"
                  {...register(input.name as keyof UserDataForm)}
                />
                {errors[input.name as keyof UserDataForm] && (
                  <span className="mt-1 block text-xs text-error">
                    {
                      errors[input.name as keyof UserDataForm]
                        ?.message as string
                    }
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 border-t border-line px-5 py-5 text-ink-soft">
            {TermsOfService.map((term) => (
              <div key={term.id} className="flex items-center">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                  {...register(term.name as keyof UserDataForm)}
                />
                <span className="ml-2 text-sm">
                  {term.mandatory ? "*" : ""}{" "}
                  {term.isAuthorization ? "Autorizo" : "Acepto"}{" "}
                  <b>{term.text}</b>
                </span>
              </div>
            ))}
          </div>
          <button type="submit" className="hidden">
            Send
          </button>
        </form>
      </section>

      <PaymentCardInfo
        onContinue={handleSubmit(onSubmit)}
        disabledContinue={!isValid}
      />
    </Container>
  );
}
