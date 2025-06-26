import { Outlet, redirect, useOutletContext } from "react-router";
import { UpdateRequestTypes, UserTypes } from "../types/user";
import { Route } from "./+types/auth-profile-layout";
import { getSession } from "../../sessions.server";
import { validationUser } from "../services/users.api";

type userContext = {
  user: UserTypes,
  userLoading: boolean,
  updateUser: (user: UpdateRequestTypes) => void
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get("token") as string;

  return validationUser(token).catch(() => redirect("/login"));
}

export default function AuthProfileLayout() {
  const { user, userLoading, updateUser } = useOutletContext<userContext>();
  return <Outlet context={{ user, userLoading, updateUser }} />;
}
