import { data, Link, redirect, useFetcher, useNavigate } from "react-router";
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
import type { Route } from "./+types/cart-user-data";
import { getSessionUser } from "../../auth/session-user.server";
import { UserInitialValues } from "../../profile/constants/users-initial-values.helper";
import { commitSession, getSession, sessionHeaders } from "../../sessions.server";
import { SnackbarUtilities } from "../../shared/utilities/snackbar-manager";
import { FiCheck, FiLogIn } from "react-icons/fi";
import TextField from "../../shared/ui/TextField";

export async function loader({ request }: Route.LoaderArgs) {
  const transactionId = parse(request.headers.get("Cookie") || "").transactionId;
  if (!transactionId) return redirect("/cart");

  const session = await getSession(request.headers.get("Cookie"));
  const checkoutUser = session.get("checkoutUser") ?? null;
  const user = await getSessionUser(session);

  return data({ user, checkoutUser }, { headers: await sessionHeaders(request, session) });
}

export async function action({ request }: Route.ActionArgs) {
  const result = UserData.safeParse(await request.json());
  if (!result.success) return { ok: false as const };

  const { names, lastnames, email, phone } = result.data;
  const session = await getSession(request.headers.get("Cookie"));
  session.set("checkoutUser", { names, lastnames, email, phone });

  return data({ ok: true as const }, { headers: { "Set-Cookie": await commitSession(session) } });
}

export default function CartUserData({ loaderData }: Route.ComponentProps) {
  const { checkoutUser } = loaderData;
  const user = loaderData.user ?? UserInitialValues;
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
  const fetcher = useFetcher<typeof action>();

  const onSubmit = (form: UserDataForm) => {
    if (!isValid) return;
    fetcher.submit(JSON.stringify(form), { method: "post", encType: "application/json" });
  };

  useEffect(() => {
    if (fetcher.state !== "idle" || !fetcher.data) return;
    if (!fetcher.data.ok) return SnackbarUtilities.error("No pudimos guardar tus datos. Inténtalo de nuevo.");

    nextSteps("Datos de usuario");
    navigate("/cart/delivery");
  }, [fetcher.state, fetcher.data]);

  useEffect(() => {
    reset(UserDataInitialValues(checkoutUser ?? {}, user));
  }, [user, reset]);

  return (
    <Container className="grid items-start gap-8 pb-16 lg:grid-cols-[1fr_380px] lg:gap-12">
      <section>
        <h1 className="text-3xl font-extrabold text-ink">Tus datos</h1>
        <p className="mt-0.5 text-sm text-ink-muted">Los usamos para confirmar tu pedido y avisarte cuando vaya en camino.</p>

        {!checkoutUser?.email && !user.email && (
          <Link
            to="/login"
            className="mt-4 flex items-center gap-3 rounded-lg border border-brand/20 bg-brand-soft/70 px-3.5 py-2 text-sm
              text-ink-soft transition-colors hover:border-brand/50"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-base-100 text-brand">
              <FiLogIn size={15} />
            </span>
            <span>
              <b className="text-brand">Inicia sesión</b> y llenamos estos datos por ti.
            </span>
          </Link>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
          <h2 className="mb-3 text-xs font-extrabold uppercase tracking-[0.08em] text-brand">Contacto</h2>
          <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
            {ImputsFromUserData.map((input) => (
              <TextField
                key={input.name}
                label={input.label}
                type={input.type}
                placeholder={input.placeholder}
                error={errors[input.name as keyof UserDataForm]?.message as string | undefined}
                {...register(input.name as keyof UserDataForm)}
              />
            ))}
          </div>

          <h2 className="mb-3 mt-6 text-xs font-extrabold uppercase tracking-[0.08em] text-brand">Permisos</h2>
          <div className="flex flex-col gap-2">
            {TermsOfService.map((term) => (
              <label
                key={term.id}
                className="group flex cursor-pointer items-center gap-3 rounded-lg border border-line px-3.5 py-2.5
                  text-sm text-ink-soft transition-colors hover:border-ink-muted has-checked:border-brand
                  has-checked:bg-brand-soft/60"
              >
                <input type="checkbox" className="peer sr-only" {...register(term.name as keyof UserDataForm)} />
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 border-line bg-base-100
                  text-transparent transition-colors peer-checked:border-brand peer-checked:bg-brand
                  peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-brand/20">
                  <FiCheck size={13} strokeWidth={3.5} />
                </span>
                <span className="flex-1">
                  {term.isAuthorization ? "Autorizo" : "Acepto"} <b className="text-ink">{term.text}</b>
                </span>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                  term.mandatory ? "bg-ink text-white" : "bg-cream text-ink-muted"
                }`}>
                  {term.mandatory ? "Obligatorio" : "Opcional"}
                </span>
              </label>
            ))}
          </div>

          <button type="submit" className="hidden">
            Send
          </button>
        </form>
      </section>

      <PaymentCardInfo
        onContinue={handleSubmit(onSubmit)}
        disabledContinue={!isValid || fetcher.state !== "idle"}
      />
    </Container>
  );
}
