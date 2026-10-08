import { data, Link, Outlet, useNavigate } from "react-router";
import { FiHeart, FiLock } from "react-icons/fi";
import ProfileButton from "../../shared/layout/navbar/ProfileButton";
import Container from "../../shared/ui/Container";
import type { Route } from "./+types/cart-layout";
import { getSessionUser } from "../../auth/session-user.server";
import { getSession, sessionHeaders } from "../../sessions.server";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const user = await getSessionUser(session);

  return data({ user }, { headers: await sessionHeaders(request, session) });
}

export default function CartLayout() {
  const navigate = useNavigate();

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] bg-base-100">
      <header className="border-b border-t-4 border-line border-t-brand bg-base-100">
        <Container className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="block shrink-0 transition-transform hover:-rotate-2" aria-label="Ir al inicio">
            <img src="/svg/simbolo.svg" alt="Multi Shop" className="h-9 w-auto sm:hidden" />
            <img src="/svg/logo.svg" alt="Multi Shop" className="-ml-2 hidden h-14 w-auto sm:block" />
          </Link>

          <div className="flex items-center gap-1">
            <p className="mr-3 hidden items-center gap-1.5 text-sm font-bold text-ink-soft sm:flex">
              <FiLock size={15} className="text-success" />
              Compra 100% segura
            </p>
            <button
              type="button"
              className="hidden rounded-full px-3 py-2 text-sm font-bold text-ink transition-colors
                hover:bg-brand-soft hover:text-brand md:block"
            >
              Mis compras
            </button>
            <button
              type="button"
              aria-label="Lista de deseos"
              onClick={() => navigate("/profile/wish-list")}
              className="grid h-10 w-10 place-items-center rounded-full text-ink transition-colors
                hover:bg-brand-soft hover:text-brand"
            >
              <FiHeart size={20} />
            </button>
            <div className="ml-1 border-l border-line pl-2">
              <ProfileButton size={34} />
            </div>
          </div>
        </Container>
      </header>

      <main className="flex flex-col pt-0!">
        <Outlet />
      </main>

      <footer className="border-t border-line bg-base-100">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-sm
          text-ink-muted sm:flex-row">
          <p>2025 Multi Shop ® marca registrada de Grupo Efma S.A.</p>
          <button type="button" className="transition-colors hover:text-brand">
            Ver términos y condiciones
          </button>
        </Container>
      </footer>
    </div>
  );
}
