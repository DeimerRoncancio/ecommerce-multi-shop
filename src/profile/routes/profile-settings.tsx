import { useOutletContext } from "react-router"
import { UserTypes } from "../types/user";
import type { Route } from "./+types/profile-settings";
import { getSession } from "../../sessions.server";
import ChangePasswordForm from "../components/change-password-form/ChangePasswordForm";
import DeleteForm from "../components/delete-account-form/DeleteForm";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get('token') as string;
  return { token }
}

type userContext = {
  user: UserTypes;
  loading: boolean;
}

export default function ProfileSettings({ loaderData }: Route.ComponentProps) {
  const { user, loading } = useOutletContext<userContext>();
  const { token } = loaderData;

  return (
    <>
      <h2 className="text-3xl font-extrabold text-ink">Configuración de cuenta</h2>
      <p className="mb-6 mt-0.5 text-sm text-ink-muted">Cambia tu contraseña o elimina tu cuenta.</p>
      {
        !loading ? (
          <>
            <ChangePasswordForm
              user={user}
              token={token}
              />
            <DeleteForm
              user={user}
              token={token}
            />
          </>
        ) : (
          <div className="w-full mt-28 flex justify-center">
            <span className="loading loading-dots loading-xl"></span>
          </div>
        )
      }
    </>
  );
}
