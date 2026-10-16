import { parse } from "cookie";
import { createCookie } from "react-router";
import { GUEST_COOKIE } from "./shared/utilities/guest";
import { isAvatar } from "./shared/utilities/avatar";
import { getGuestAvatar, saveGuestAvatar } from "./shared/services/guest-avatar.api";
import { updateUserAvatar } from "./profile/services/users.api";
import type { UserTypes } from "./profile/types/user";

const avatarCookie = createCookie("avatar", {
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 365,
  path: "/",
  sameSite: "lax",
  secure: true,
});

const valid = (value: unknown) => (isAvatar(Number(value)) ? Number(value) : null);

const guestOf = (request: Request) =>
  parse(request.headers.get("Cookie") ?? "")
    [GUEST_COOKIE]?.trim()
    .toLowerCase() || undefined;

const readVisitor = async (request: Request) => {
  const value = await avatarCookie.parse(request.headers.get("Cookie"));
  return valid(value && typeof value === "object" ? value.visitor : null);
};

export const readGuestEmail = (request: Request, user: UserTypes | null) => (user ? undefined : guestOf(request));

export const readAvatar = async (request: Request, user: UserTypes | null) => {
  if (user) return valid(user.avatar);

  const guestEmail = guestOf(request);
  if (guestEmail) return getGuestAvatar(guestEmail).then(valid, () => null);

  return readVisitor(request);
};

export const readVisitorAvatar = async (request: Request, user: UserTypes | null) =>
  !user && guestOf(request) ? readVisitor(request) : undefined;

export const saveAvatar = async (
  request: Request,
  user: UserTypes | null,
  token: string | undefined,
  avatar: number,
) => {
  if (user && token) {
    await updateUserAvatar(user.id, token, avatar);
    return undefined;
  }

  const guestEmail = guestOf(request);
  if (guestEmail) {
    await saveGuestAvatar(guestEmail, avatar);
    return undefined;
  }

  return { "Set-Cookie": await avatarCookie.serialize({ visitor: avatar }) };
};
