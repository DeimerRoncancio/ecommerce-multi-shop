import { Link, useRevalidator } from "react-router";
import { FiLogIn, FiRefreshCw, FiShoppingBag } from "react-icons/fi";
import type { Route } from "./+types/purchases";
import { getSession } from "../../sessions.server";
import { readGuestEmail } from "../../avatar.server";
import { getGuestPurchases, getUserPurchases } from "../services/purchases.api";
import { getProductsByIds } from "../../products/services/products.api";
import { Purchase, PurchaseProduct, PurchaseView } from "../types/purchase";
import PurchaseCard from "../components/PurchaseCard";

const dateFormat = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "America/Bogota",
});

const monthFormat = new Intl.DateTimeFormat("es-CO", {
  month: "long",
  year: "numeric",
  timeZone: "America/Bogota",
});

const timeFormat = new Intl.DateTimeFormat("es-CO", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "America/Bogota",
});

const productsOf = async (purchases: Purchase[]) => {
  const ids = [...new Set(purchases.flatMap(purchase => purchase.items.map(item => item.id)))];
  if (!ids.length) return {};

  const found = await getProductsByIds(ids).catch(() => []);
  return Object.fromEntries(
    found.map(product => [
      product.id,
      { image: product.productImages[0]?.imageUrl, category: product.categories[0]?.categoryName },
    ]),
  ) as Record<string, PurchaseProduct>;
};

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  const guestEmail = token ? undefined : readGuestEmail(request, null);

  if (!token && !guestEmail) return { owner: null, guestEmail, purchases: [], products: {}, failed: false };

  const purchases = await (token ? getUserPurchases(token) : getGuestPurchases(guestEmail as string)).catch(() => null);
  if (!purchases) return { owner: token ? "user" : "guest", guestEmail, purchases: [], products: {}, failed: true };

  const views: PurchaseView[] = purchases.map(purchase => ({
    ...purchase,
    dateLabel: dateFormat.format(new Date(purchase.date)).replace(/ de /g, " ").replace(".", ""),
    timeLabel: timeFormat.format(new Date(purchase.date)),
    monthLabel: monthFormat.format(new Date(purchase.date)).replace(" de ", " "),
  }));

  return {
    owner: token ? "user" : "guest",
    guestEmail,
    purchases: views,
    products: await productsOf(purchases),
    failed: false,
  };
}

export default function Purchases({ loaderData }: Route.ComponentProps) {
  const { owner, guestEmail, purchases, products, failed } = loaderData;
  const revalidator = useRevalidator();
  const count = purchases.length;
  const months = purchases.reduce<{ month: string; purchases: PurchaseView[] }[]>((groups, purchase) => {
    const last = groups[groups.length - 1];
    if (last?.month === purchase.monthLabel) last.purchases.push(purchase);
    else groups.push({ month: purchase.monthLabel, purchases: [purchase] });
    return groups;
  }, []);

  if (!owner) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <img src="/images/box-empty.png" alt="" width={140} />
        <p className="text-xl font-bold text-ink">Inicia sesión para ver tus compras</p>
        <p className="max-w-sm text-ink-muted">
          Si compraste como invitado, entra con el mismo correo desde tu perfil.
        </p>
        <Link
          to="/login"
          className="flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-bold text-white
            transition-colors hover:bg-ink"
        >
          <FiLogIn size={16} />
          Iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold text-ink">Mis compras</h2>
        <p className="mt-0.5 text-sm text-ink-muted">
          {failed
            ? "Tus pedidos y su estado."
            : count
              ? `${count} ${count === 1 ? "pedido" : "pedidos"}${owner === "guest" ? ` hechos con ${guestEmail}` : ""}, del más reciente al más antiguo.`
              : "Aquí verás tus pedidos y su estado."}
        </p>
      </div>

      {failed ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <img src="/images/list-empty.png" alt="" width={110} />
          <p className="text-xl font-bold text-ink">No pudimos cargar tus compras</p>
          <button
            type="button"
            onClick={() => revalidator.revalidate()}
            className="flex h-10 items-center gap-2 rounded-full border border-line px-5 text-sm font-bold text-ink
              transition-colors hover:border-ink"
          >
            <FiRefreshCw size={15} />
            Reintentar
          </button>
        </div>
      ) : !count ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <img src="/images/box-empty.png" alt="" width={140} />
          <p className="text-xl font-bold text-ink">Aún no tienes compras</p>
          <p className="max-w-sm text-ink-muted">Cuando pagues un pedido aparecerá aquí con todo su detalle.</p>
          <Link
            to="/catalog"
            className="flex h-11 items-center gap-2 rounded-full bg-brand px-6 text-sm font-bold text-white
              transition-colors hover:bg-ink"
          >
            <FiShoppingBag size={16} />
            Ir a la tienda
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-7">
          {months.map(({ month, purchases: inMonth }, monthIndex) => (
            <section key={month}>
              <h3 className="mb-3 flex items-baseline gap-2">
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-ink">{month}</span>
                <span className="text-xs font-semibold text-ink-muted">
                  · {inMonth.length} {inMonth.length === 1 ? "pedido" : "pedidos"}
                </span>
              </h3>
              <ol
                className="relative flex flex-col gap-3 pl-6 before:absolute before:bottom-3 before:left-[5px]
                  before:top-[34px] before:w-0.5 before:rounded-full before:bg-line sm:pl-7 sm:before:left-[7px]
                  sm:before:top-[52px]"
              >
                {inMonth.map((purchase, index) => (
                  <PurchaseCard
                    key={purchase.id}
                    purchase={purchase}
                    products={products}
                    defaultOpen={monthIndex === 0 && index === 0}
                  />
                ))}
              </ol>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
