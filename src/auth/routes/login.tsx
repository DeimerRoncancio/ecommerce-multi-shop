import { LoginAccessUser } from "../zod/routesAuth";
import { Form, redirect, useActionData } from "react-router";
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
  session.set('token', data.token);

  return redirect('/profile', {
    headers: {
      'Set-Cookie': await commitSession(session),
    }
  });
}

export default function Login() {
  const action = useActionData() as { errors?: Record<string, string[]> };
  
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl">Login</h1>
      <Form method="post" className="flex flex-col gap-4 mt-4" >
        <label htmlFor="identifier" className="input input-bordered flex items-center gap-2 w-[307px]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            name="identifier"
            type="text"
            className="grow"
            placeholder="Correo electronico o numero de telefono"
          />
        </label>
        {action?.errors?.password && (
          <span style={{ color: "red" }}>{action.errors.identifier[0]}</span>
        )}
        <label htmlFor="password" className="input input-bordered flex items-center gap-2 w-[307px]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
            <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
          </svg>
          <input
            name="password"
            type="password"
            className="grow"
            placeholder="Contraseña"
          />
        </label>
        {action?.errors?.password && (
          <span style={{ color: "red" }}>{action.errors.password[0]}</span>
        )}
        <button type="submit" className="btn btn-active btn-primary">Iniciar sesión</button>
      </Form>
    </div>
  );
}
