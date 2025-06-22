import { createCookieSessionStorage } from "react-router";

type SessionData = {
  token: string;
}

type SessionFlashData = {
  error: string;
}

const { getSession, commitSession, destroySession } = createCookieSessionStorage<SessionData, SessionFlashData> ({
  cookie: {
    name: "___session",
    domain: "localhost",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 1,
    path: "/",
    sameSite: "lax",
    secrets: ["s3cret1"],
    secure: true
  }
})

export { getSession, commitSession, destroySession };
