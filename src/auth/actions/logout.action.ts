import { redirect } from "react-router";
import { destroySession, getSession } from "../../sessions.server";
import { Route } from "./+types/logout.action";

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  return redirect('/login', {
    headers: {
      'Set-Cookie': await destroySession(session),
    }
  })
}
