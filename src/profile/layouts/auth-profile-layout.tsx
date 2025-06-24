import { Outlet, redirect, useOutletContext } from "react-router";
import axios from "axios";
import { UpdateRequestTypes, UserTypes } from "../types/user";
import { Route } from "./+types/auth-profile-layout";
import { envs } from "../../shared/config/env.config";
import { getSession } from "../../sessions.server";

type userContext = {
  user: UserTypes,
  userLoading: boolean,
  updateUser: (user: UpdateRequestTypes) => void
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get("token");

  return axios.get(`${envs.API}/app/users/token-validation/${token}`,)
    .then(() => {})
    .catch(() => {
      return redirect("/login");
    })
}

export default function AuthProfileLayout() {
  const { user, userLoading, updateUser } = useOutletContext<userContext>();
  return <Outlet context={{ user, userLoading, updateUser }} />;
}
