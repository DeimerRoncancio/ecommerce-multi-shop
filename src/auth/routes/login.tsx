import { LoginAccessUser } from "../zod/routesAuth";
import { Form, Link, redirect, useActionData, useNavigation } from "react-router";
import { Route } from "./+types/login";
import { commitSession, getSession } from "../../sessions.server";
import { send } from "../services/api/login";

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

  return (
    <div className="min-h-screen w-full bg-[#fffaf8]">
      <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#f04913] via-[#f35a2a] to-[#f07f45] px-8 py-10 text-white lg:px-12">
          <div className="absolute -left-12 top-12 h-56 w-56 rounded-full border border-white/20" />
          <div className="absolute right-6 top-24 h-40 w-40 rounded-full border border-white/15" />
          <div className="absolute bottom-16 left-20 h-64 w-64 rounded-full border border-white/10" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-lg font-semibold">
              MS
            </div>
            <div className="text-lg font-semibold">MultiShop</div>
          </div>

          <div className="relative z-10 max-w-md space-y-4">
            <h1 className="text-4xl font-semibold leading-tight lg:text-5xl">
              Bienvenido de vuelta
            </h1>
            <p className="text-base text-white/90">
              Accede a tu cuenta para ver tus pedidos, favoritos y ofertas exclusivas.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-4 text-sm text-white/90">
            <div className="flex -space-x-2">
              <div className="h-9 w-9 rounded-full border border-white/60 bg-white/25" />
              <div className="h-9 w-9 rounded-full border border-white/60 bg-white/35" />
              <div className="h-9 w-9 rounded-full border border-white/60 bg-white/45" />
            </div>
            <span>+50,000 clientes satisfechos</span>
          </div>
        </section>

        <section className="flex items-center justify-center bg-white px-6 py-10 lg:px-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-[#3a2f2a]">Iniciar sesión</h2>
              <p className="mt-2 text-sm text-[#7a6f6a]">
                Ingresa tus credenciales para continuar
              </p>

              <div>
                {action?.errors?.unauthorized && (
                  <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {action.errors.unauthorized[0]}
                  </div>
                )}
              </div>
            </div>

            <Form method="post" className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="identifier" className="text-sm font-medium text-[#5e472d]">
                  Correo electrónico
                </label>
                <div className="flex items-center gap-2 rounded-2xl border border-[#f1e1dc] bg-white px-4 py-3 shadow-sm focus-within:border-[#f14913] focus-within:ring-2 focus-within:ring-[#ffc1ad]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 text-[#f14913]"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    name="identifier"
                    type="text"
                    className="w-full bg-transparent text-sm text-[#3a2f2a] outline-none placeholder:text-[#b3a7a2]"
                    placeholder="nombre@correo.com"
                  />
                </div>
                {action?.errors?.identifier && (
                  <span className="text-xs text-red-500">{action.errors.identifier[0]}</span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium text-[#5e472d]">
                  Contraseña
                </label>
                <div className="flex items-center gap-2 rounded-2xl border border-[#f1e1dc] bg-white px-4 py-3 shadow-sm focus-within:border-[#f14913] focus-within:ring-2 focus-within:ring-[#ffc1ad]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 text-[#f14913]"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    name="password"
                    type="password"
                    className="w-full bg-transparent text-sm text-[#3a2f2a] outline-none placeholder:text-[#b3a7a2]"
                    placeholder="Ingresa tu contraseña"
                  />
                </div>
                {action?.errors?.password && (
                  <span className="text-xs text-red-500">{action.errors.password[0]}</span>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-[#7a6f6a]">
                  <input type="checkbox" className="checkbox checkbox-xs border-[#f1e1dc]" />
                  Recordarme
                </label>
                <button
                  type="button"
                  className="text-[#f14913] hover:text-[#d94110]"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <button
                type="submit"
                className="btn border-none bg-[#f04913] text-white shadow-[0_10px_25px_-10px_#f04913] hover:bg-[#d94110]"
                disabled={isSubmitting}
              >
                Iniciar sesión
              </button>
            </Form>

            <div className="mt-6 flex items-center gap-3 text-xs text-[#b3a7a2]">
              <span className="h-px w-full bg-[#f1e1dc]" />
              o continúa con
              <span className="h-px w-full bg-[#f1e1dc]" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="btn btn-outline border-[#f1e1dc] text-[#3a2f2a] hover:bg-[#fff4ef]">
                Google
              </button>
              <button className="btn btn-outline border-[#f1e1dc] text-[#3a2f2a] hover:bg-[#fff4ef]">
                Facebook
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-[#7a6f6a]">
              ¿No tienes una cuenta?
              <Link to="/register" className="ml-1 font-semibold text-[#f14913] hover:text-[#d94110]">
                Regístrate gratis
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
