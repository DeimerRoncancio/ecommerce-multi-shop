import { Outlet, redirect, useOutletContext } from "react-router";
import { UserTypes } from "../types/user";
import type { Route } from "./+types/auth-profile-layout";
import { getSessionToken } from "../../auth/session-user.server";
import { validationUser } from "../services/users.api";

type userContext = {
  user: UserTypes
}

export async function loader({ request }: Route.LoaderArgs) {
  const token = await getSessionToken(request);

  return validationUser(token as string)
    .then(() => null)
    .catch(() => redirect("/login"));
}

export default function AuthProfileLayout() {
  const { user } = useOutletContext<userContext>();
  return <Outlet context={{ user }} />;
}
