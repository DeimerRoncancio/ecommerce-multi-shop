import { useId, useState } from "react";
import { Link } from "react-router";
import { FiCheck, FiChevronDown, FiClock, FiMapPin, FiX } from "react-icons/fi";
import PriceTag from "../../shared/ui/PriceTag";
import ProductImage from "../../shared/ui/ProductImage";
import { categoryStyle } from "../../shared/utilities/category-color";
import { formatPrice } from "../../shared/utilities/format-price";
import { PurchaseProduct, PurchaseStatus, PurchaseView } from "../types/purchase";

type PurchaseCardProps = {
  purchase: PurchaseView;
  products: Record<string, PurchaseProduct>;
  defaultOpen?: boolean;
};

const statuses: Record<
  PurchaseStatus,
  { label: string; icon: typeof FiCheck; text: string; dot: string; soft: string; note?: string }
> = {
  APPROVED: { label: "Pagado", icon: FiCheck, text: "text-success", dot: "bg-success", soft: "bg-success/10" },
  PROCESSING: {
    label: "En revisión",
    icon: FiClock,
    text: "text-ink",
    dot: "bg-sun",
    soft: "bg-sun/30",
    note: "Stripe está confirmando tu pago. Te avisaremos por correo.",
  },
  REJECTED: {
    label: "Rechazado",
    icon: FiX,
    text: "text-error",
    dot: "bg-error",
    soft: "bg-error/10",
    note: "El pago no se completó. No te hicimos ningún cobro.",
  },
};

const DECK = [
  "",
  "translate-x-1.5 -translate-y-1 rotate-[5deg] group-hover:translate-x-3 group-hover:rotate-[8deg]",
  "translate-x-3 -translate-y-2 rotate-[10deg] group-hover:translate-x-6 group-hover:rotate-[16deg]",
];

export default function PurchaseCard({ purchase, products, defaultOpen = false }: PurchaseCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const detailId = useId();
  const status = statuses[purchase.status];
  const StatusIcon = status.icon;
  const [first] = purchase.items;
  const deck = purchase.items.slice(0, DECK.length);
  const others = purchase.items.length - 1;
  const title = `${first?.productName ?? "Pedido"}${others > 0 ? ` y ${others} más` : ""}`;
  const address = purchase.shippingAddress;

  return (
    <li className="relative">
      <span
        aria-hidden
        className={`absolute -left-[26px] top-[26px] h-4 w-4 rounded-full border-[3px] border-base-100 ${status.dot}
          shadow-[0_0_0_1px_var(--color-line)] sm:-left-7 sm:top-11`}
      />

      <div
        className={`overflow-hidden rounded-2xl border bg-base-100 transition-[border-color,box-shadow] ${
          open ? "border-ink/25 shadow-card-hover" : "border-line hover:border-ink/25"
        }`}
      >
        <button
          type="button"
          aria-expanded={open}
          aria-controls={detailId}
          onClick={() => setOpen(!open)}
          className="group grid w-full grid-cols-[auto_1fr_auto] items-start gap-3 p-3 sm:items-center text-left sm:gap-4 sm:p-4"
        >
          <span className="relative mr-6 block h-14 w-14 shrink-0 sm:mr-9 sm:h-18 sm:w-18">
            {deck.map((item, depth) => {
              const product = products[item.id];
              return (
                <span
                  key={item.id}
                  style={{ ...categoryStyle(product?.category ?? ""), zIndex: DECK.length - depth }}
                  className={`absolute inset-0 overflow-hidden rounded-xl border-2 border-base-100
                    bg-(--cat-soft) p-1.5 shadow-[0_2px_8px_-3px_rgb(17_17_17/0.35)] transition-transform
                    duration-300 ${DECK[depth]}`}
                >
                  {product?.image && (
                    <ProductImage
                      src={product.image}
                      width={160}
                      alt={depth ? "" : item.productName}
                      loading="lazy"
                      className="mix-blend-darken"
                    />
                  )}
                </span>
              );
            })}
            {others > 0 && (
              <span
                className="absolute -bottom-1.5 -right-1.5 z-10 grid h-6 min-w-6 place-items-center rounded-full border-2
                  border-base-100 bg-ink px-1 text-[11px] font-extrabold text-white"
              >
                +{others}
              </span>
            )}
          </span>

          <span className="flex min-w-0 flex-col gap-1">
            <span className="line-clamp-2 font-extrabold leading-tight text-ink sm:line-clamp-1 sm:text-lg">
              {title}
            </span>
            <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-soft">
              <span className="whitespace-nowrap">{purchase.dateLabel}</span>
              <span className="text-ink-muted">·</span>
              <span className="font-bold tabular-nums">#{purchase.id.slice(0, 8).toUpperCase()}</span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-extrabold
                  ${status.soft} ${status.text}`}
              >
                <StatusIcon size={12} strokeWidth={3} />
                {status.label}
              </span>
            </span>
            <span className="mt-1 sm:hidden">
              <PriceTag price={purchase.totalPrice} />
            </span>
          </span>

          <span className="flex items-center gap-3">
            <span className="hidden sm:block">
              <PriceTag price={purchase.totalPrice} />
            </span>
            <span
              className={`grid h-9 w-9 place-items-center rounded-full border transition-[transform,colors] duration-200
                ${open ? "rotate-180 border-ink bg-ink text-white" : "border-line text-ink group-hover:border-ink"}`}
            >
              <FiChevronDown size={18} />
            </span>
          </span>
        </button>

        <div
          id={detailId}
          className={`grid transition-[grid-template-rows] duration-200 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        >
          <div
            className={`min-h-0 overflow-hidden transition-[visibility] duration-200 ${open ? "visible" : "invisible"}`}
          >
            <div className="border-t border-line p-3 sm:p-4">
              {status.note && (
                <p className={`mb-3 rounded-xl px-3 py-2 text-sm font-semibold ${status.soft} ${status.text}`}>
                  {status.note}
                </p>
              )}

              <div className="grid gap-3 sm:grid-cols-[1fr_1.2fr]">
                <div className="rounded-xl bg-cream px-4 py-3 text-sm">
                  <p className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-muted">
                    <FiMapPin size={13} className="text-brand" />
                    Envío a
                  </p>
                  {address ? (
                    <>
                      <p className="font-bold text-ink">{address.addressName}</p>
                      <p className="text-ink-soft">{address.address}</p>
                      <p className="text-ink-soft">
                        {address.city}, {address.state}, {address.country}
                      </p>
                      {address.addressNumber && <p className="text-ink-muted">Tel. {address.addressNumber}</p>}
                    </>
                  ) : (
                    <p className="text-ink-muted">Sin dirección registrada</p>
                  )}
                  <p className="mt-2 text-xs text-ink-muted">
                    Pedido el {purchase.dateLabel}, {purchase.timeLabel}
                  </p>
                </div>

                <dl className="flex flex-col gap-2 rounded-xl border border-line px-4 py-3 text-sm">
                  {purchase.items.map(item => (
                    <div key={item.id} className="flex items-baseline gap-2">
                      <dt className="min-w-0 text-ink">
                        {products[item.id] ? (
                          <Link to={`/product/${item.id}`} className="font-semibold hover:text-brand hover:underline">
                            {item.productName}
                          </Link>
                        ) : (
                          <span className="font-semibold">{item.productName}</span>
                        )}
                        <span className="block text-xs text-ink-muted tabular-nums">
                          {item.quantity} × {formatPrice(item.price)}
                        </span>
                      </dt>
                      <span aria-hidden className="min-w-4 flex-1 border-b border-dotted border-line" />
                      <dd className="shrink-0 font-semibold text-ink tabular-nums">
                        {formatPrice(item.price * item.quantity)}
                      </dd>
                    </div>
                  ))}
                  <div className="flex items-baseline gap-2">
                    <dt className="text-ink-soft">Envío</dt>
                    <span aria-hidden className="flex-1 border-b border-dotted border-line" />
                    <dd className="font-bold text-success">Gratis</dd>
                  </div>
                  <div className="mt-1 flex justify-between gap-3 border-t border-line pt-2">
                    <dt className="font-extrabold text-ink">Total</dt>
                    <dd className="font-extrabold text-ink tabular-nums">{formatPrice(purchase.totalPrice)}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
