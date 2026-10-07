import { getSessionToken } from "../../auth/session-user.server";
import { updateUserImage } from "../services/users.api";
import type { Route } from "./+types/profile-image.action";

export async function action({ request }: Route.ActionArgs) {
  const token = await getSessionToken(request);
  const form = await request.formData();
  const image = new FormData();
  image.append("file", form.get("file") as File);

  return updateUserImage(String(form.get("id")), token as string, image)
    .then(() => ({ ok: true as const }))
    .catch(() => ({ ok: false as const }));
}
