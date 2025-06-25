import { useFetcher } from "react-router";
import { destroySession, getSession } from "../../sessions.server";
import { Route } from "./+types/logout.action";
import { BiLogOutCircle } from "react-icons/bi";
import { useEffect } from "react";

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get('Cookie'));

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Set-Cookie': await destroySession(session),
  });

  const body = JSON.stringify({ reload: true });
  return new Response(body, { status: 200, headers });
}

export default function LogoutAction() {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data?.reload) window.location.reload();
  }, [fetcher.data]);

  return (
    <fetcher.Form method="post" action="/logout-action">
      <button className="btn gap-2 px-3 w-36 h-9 rounded-full bg-[#fff4ef] text-sm font-normal text-[#eb5324] 
      border-none justify-normal" name="path" type="submit">
        <BiLogOutCircle size={17} />
        Cerrar Sesión
      </button>
    </fetcher.Form>
  )
}
