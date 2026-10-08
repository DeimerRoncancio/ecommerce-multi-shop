import { isAxiosError } from "axios";
import { AppSession, getSession } from "../sessions.server";
import { getUser } from "../profile/services/users.api";
import { apiToUserTypes } from "../profile/mappers/profile.mapper";
import { UserTypes } from "../profile/types/user";

export const getSessionToken = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));
  return session.get("token");
};

export const getSessionUser = async (session: AppSession): Promise<UserTypes | null> => {
  const token = session.get("token");
  if (!token) return null;

  return getUser(token)
    .then(apiToUserTypes)
    .catch((error) => {
      if (isAxiosError(error) && error.response?.status === 401) session.unset("token");
      return null;
    });
};
