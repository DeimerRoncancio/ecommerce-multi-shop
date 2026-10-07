import { redirect, useOutletContext } from "react-router"
import { UserTypes } from "../types/user";
import type { Route } from "./+types/profile-settings";
import { destroySession, getSession } from "../../sessions.server";
import { deleteUserAccount, updatePassword } from "../services/users.api";
import ChangePasswordForm from "../components/change-password-form/ChangePasswordForm";
import DeleteForm from "../components/delete-account-form/DeleteForm";

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get('token') as string;
  const form = await request.formData();
  const id = String(form.get("id"));

  if (form.get("intent") === "delete") {
    const deleted = await deleteUserAccount(id, token).then(() => true).catch(() => false);
    if (!deleted) return { ok: false as const };

    return redirect("/", { headers: { "Set-Cookie": await destroySession(session) } });
  }

  const password = {
    currentPassword: String(form.get("currentPassword")),
    newPassword: String(form.get("newPassword")),
  };

  return updatePassword(id, token, password)
    .then(() => ({ ok: true as const }))
    .catch((err) => ({
      ok: false as const,
      status: err.response?.status as number | undefined,
      errorCode: err.response?.data?.errorCode as string | undefined,
    }));
}

type userContext = {
  user: UserTypes;
}

export default function ProfileSettings() {
  const { user } = useOutletContext<userContext>();

  return (
    <>
      <h2 className="text-3xl font-extrabold text-ink">Configuración de cuenta</h2>
      <p className="mb-6 mt-0.5 text-sm text-ink-muted">Cambia tu contraseña o elimina tu cuenta.</p>
      <ChangePasswordForm user={user} />
      <DeleteForm user={user} />
    </>
  );
}
