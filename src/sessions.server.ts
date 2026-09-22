import { createCookieSessionStorage } from "react-router";

type SessionData = {
  token: string;
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
    domain: "localhost",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 1,
    path: "/",
    sameSite: "lax",
    secrets: [sessionSecret],
    secure: true
  }
})

export { getSession, commitSession, destroySession };
