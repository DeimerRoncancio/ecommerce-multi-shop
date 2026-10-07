import { commitSession, getSession } from "../sessions.server";

export const clearCheckoutUser = async (request: Request): Promise<HeadersInit | undefined> => {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("checkoutUser")) return undefined;

  session.unset("checkoutUser");
  return { "Set-Cookie": await commitSession(session) };
};
