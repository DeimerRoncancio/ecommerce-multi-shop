import { Outlet, redirect, useOutletContext } from "react-router";
import axios from "axios";
import { UpdateRequestTypes, UserTypes } from "../types/user";
import { parse } from "cookie";
import { Route } from "./+types/auth-profile-layout";
import { envs } from "../../shared/config/env.config";

type userContext = {
  user: UserTypes,
  userLoading: boolean,
  updateUser: (user: UpdateRequestTypes) => void
}

export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const cookies = parse(cookieHeader);
  const token = cookies.accessHome;

  return axios.get(`${envs.API}/app/users/token-validation/${token}`,)
    .then(() => {})
    .catch(() => {
      return redirect("/login");
    })
}

export function HydrateFallBack() {
  return <span className="loading loading-ring loading-lg"></span>;
}

export default function AuthProfileLayout() {
  const { user, userLoading, updateUser } = useOutletContext<userContext>();
  return <Outlet context={{ user, userLoading, updateUser }} />;
}
