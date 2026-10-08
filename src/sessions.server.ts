import { createCookieSessionStorage, type Session } from "react-router";
import type { CheckoutUserData } from "./cart/types/cart";

type SessionData = {
  token: string;
  checkoutUser: CheckoutUserData;
}

type SessionFlashData = {
  error: string;
}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret)
  throw new Error("SESSION_SECRET is not set. Generate one with: node -e \"console.log(require('crypto').randomBytes(32).toString('base64'))\"");

const { getSession, commitSession, destroySession } = createCookieSessionStorage<SessionData, SessionFlashData> ({
  cookie: {
    name: "___session",
    httpOnly: true,
    maxAge: 60 * 60,
    path: "/",
    sameSite: "lax",
    secrets: [sessionSecret],
    secure: true
  }
})

export type AppSession = Session<SessionData, SessionFlashData>;

export const sessionHeaders = async (request: Request, session: AppSession): Promise<HeadersInit | undefined> => {
  const original = await getSession(request.headers.get("Cookie"));
  if (JSON.stringify(original.data) === JSON.stringify(session.data)) return undefined;

  return { "Set-Cookie": await commitSession(session) };
};

export { getSession, commitSession, destroySession };
