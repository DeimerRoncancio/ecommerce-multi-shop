import { destroySession, getSession } from "../../sessions.server";
import { Route } from "./+types/logout.action";

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get('Cookie'));

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Set-Cookie': await destroySession(session),
  });

  const body = JSON.stringify({ reload: true });
  return new Response(body, { status: 200, headers });
}
