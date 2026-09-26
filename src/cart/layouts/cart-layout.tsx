import { Link, Outlet, useNavigate } from "react-router";
import { FiHeart, FiLock } from "react-icons/fi";
import ProfileButton from "../../shared/layout/navbar/ProfileButton";
import Container from "../../shared/ui/Container";
import type { Route } from "./+types/cart-layout";
import { getSession } from "../../sessions.server";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  return { token };
}

export default function CartLayout() {
  const navigate = useNavigate();

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] bg-cream">
      <header className="border-b border-line bg-base-100">
        <Container className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="block w-11 shrink-0" aria-label="Ir al inicio">
            <img src="/images/logo-bag.webp" alt="Multi Shop" className="w-full" />
          </Link>

          <div className="hidden items-center gap-2 text-sm text-ink-soft sm:flex">
            <FiLock size={16} className="text-success" />
            <p>
              Tu compra es <span className="font-medium text-ink">100% segura</span>
            </p>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              className="hidden rounded-xl px-3 py-2 text-sm font-medium text-ink transition-colors
                hover:bg-cream hover:text-brand sm:block"
            >
              Mis compras
            </button>
            <button
              type="button"
              aria-label="Lista de deseos"
              onClick={() => navigate("/profile/wish-list")}
              className="grid h-10 w-10 place-items-center rounded-xl text-ink transition-colors
                hover:bg-cream hover:text-brand"
            >
              <FiHeart size={20} />
            </button>
            <div className="ml-1 border-l border-line pl-2">
              <ProfileButton size={34} />
            </div>
          </div>
        </Container>
      </header>

      <main className="pt-0!">
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
