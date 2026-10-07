import { getSession } from "../sessions.server";
import { getUser } from "../profile/services/users.api";
import { apiToUserTypes } from "../profile/mappers/profile.mapper";
import { UserTypes } from "../profile/types/user";

export const getSessionToken = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));
  return session.get("token");
};

export const getSessionUser = async (request: Request): Promise<UserTypes | null> => {
  const token = await getSessionToken(request);
  if (!token) return null;

  return getUser(token)
    .then(apiToUserTypes)
    .catch(() => null);
};
