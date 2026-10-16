import { data } from "react-router";
import { getSessionUser } from "../../auth/session-user.server";
import { saveAvatar } from "../../avatar.server";
import { getSession } from "../../sessions.server";
import { isAvatar } from "../../shared/utilities/avatar";
import type { Route } from "./+types/avatar.action";

export async function action({ request }: Route.ActionArgs) {
  const avatar = Number((await request.formData()).get("avatar"));
  if (!isAvatar(avatar)) return data({ ok: false as const }, { status: 400 });

  const session = await getSession(request.headers.get("Cookie"));
  const user = await getSessionUser(session);

  return saveAvatar(request, user, session.get("token"), avatar)
    .then(headers => data({ ok: true as const }, { headers }))
    .catch(() => data({ ok: false as const }, { status: 502 }));
}
