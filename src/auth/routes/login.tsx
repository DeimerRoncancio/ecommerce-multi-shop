import { LoginAccessUser } from "../zod/routesAuth";
import { Form, Link, redirect, useActionData, useNavigation } from "react-router";
import { Route } from "./+types/login";
import { useState } from "react";
import {
  FiAlertCircle, FiArrowRight, FiEye, FiEyeOff, FiLock, FiMail, FiShoppingBag,
} from "react-icons/fi";
import { FaFacebook, FaGoogle } from "react-icons/fa6";
import TextField from "../../shared/ui/TextField";
import AuthLayout from "../components/AuthLayout";
import GuestModal from "../components/GuestModal";
import { commitSession, getSession } from "../../sessions.server";
import { send } from "../services/api/login";
import { loginPerks } from "../constants/login.helper";

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const form = await request.formData();
  const identifier = form.get("identifier") as string;
  const password = form.get("password") as string;
  
  const raw = Object.fromEntries(form.entries());
  const result = LoginAccessUser.safeParse(raw);
  
  if (!result.success)
    return { errors: result.error.flatten().fieldErrors };

  const data = await send({ identifier: identifier, password: password });

  if (data.error)
    return { errors: { unauthorized: ["El usuario o contraseña son incorrectos"] } };
  
  session.set('token', data.token);

  return redirect('/profile', {
    headers: {
      'Set-Cookie': await commitSession(session),
    }
  });
}

export default function Login() {
  const action = useActionData() as { errors?: Record<string, string[]> };
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [showPassword, setShowPassword] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);

  return (
    <AuthLayout
      title="Qué bueno verte"
      highlight="otra vez"
      subtitle="Entra para ver tus pedidos, tus favoritos y comprar más rápido."
      perks={loginPerks}
    >
      <div className="w-full max-w-sm">
        <h2 className="text-3xl font-extrabold text-ink">Iniciar sesión</h2>
        <p className="mt-1 text-sm text-ink-muted">
          ¿Aún no tienes cuenta?{" "}
          <Link to="/register" className="font-bold text-brand underline-offset-4 hover:underline">
            Regístrate gratis
          </Link>
        </p>

        {action?.errors?.unauthorized && (
          <p className="mt-5 flex items-center gap-2.5 rounded-xl border border-error/30 bg-error/10 px-4 py-3 text-sm
            font-semibold text-error" role="alert">
            <FiAlertCircle size={17} className="shrink-0" />
            {action.errors.unauthorized[0]}
          </p>
        )}

        <Form method="post" className="mt-6 flex flex-col gap-3.5">
          <TextField
            label="Correo electrónico"
            name="identifier"
            type="text"
            autoComplete="username"
            placeholder="nombre@correo.com"
            icon={FiMail}
            error={action?.errors?.identifier?.[0]}
          />
          <TextField
            label="Contraseña"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Tu contraseña"
            icon={FiLock}
            error={action?.errors?.password?.[0]}
            trailing={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                className="grid h-8 w-8 place-items-center rounded-md text-ink-muted transition-colors
                  hover:bg-cream hover:text-brand"
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            }
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex cursor-pointer items-center gap-2 text-ink-soft">
              <input type="checkbox" className="checkbox checkbox-xs rounded border-line checked:border-brand
                checked:bg-brand checked:text-white" />
              Recordarme
            </label>
            <button type="button" className="font-semibold text-brand underline-offset-4 hover:underline">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-1 flex h-12 items-center justify-center gap-2 rounded-full bg-brand font-bold text-white
              transition-colors hover:bg-ink disabled:bg-base-300 disabled:text-ink-muted"
          >
            {isSubmitting ? "Ingresando…" : "Iniciar sesión"}
            {!isSubmitting && <FiArrowRight size={17} />}
          </button>
        </Form>

        <div className="my-6 flex items-center gap-3 text-xs font-semibold text-ink-muted">
          <span className="h-px flex-1 bg-line" />
          o continúa con
          <span className="h-px flex-1 bg-line" />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button type="button" className="flex h-11 items-center justify-center gap-2 rounded-full border border-line
            text-sm font-bold text-ink transition-colors hover:border-ink">
            <FaGoogle size={15} className="text-[#ea4335]" />
            Google
          </button>
          <button type="button" className="flex h-11 items-center justify-center gap-2 rounded-full border border-line
            text-sm font-bold text-ink transition-colors hover:border-ink">
            <FaFacebook size={16} className="text-[#1877f2]" />
            Facebook
          </button>
        </div>

        <button
          type="button"
          onClick={() => setShowGuestModal(true)}
          className="mt-6 flex w-full items-center gap-3 rounded-xl bg-cream px-4 py-3 text-left text-sm
            transition-colors hover:bg-brand-soft"
        >
          <FiShoppingBag size={18} className="shrink-0 text-brand" />
          <span className="flex-1 text-ink-soft">
            ¿Solo quieres comprar? <b className="text-ink">Entra como invitado</b>
          </span>
          <FiArrowRight size={16} className="text-ink-muted" />
        </button>
      </div>

      <GuestModal isOpen={showGuestModal} onClose={() => setShowGuestModal(false)} />
    </AuthLayout>
  );
}
