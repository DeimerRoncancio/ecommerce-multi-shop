import { forwardRef } from "react";
import { Link } from "react-router";
import { closeSnackbar, CustomContentProps, SnackbarContent } from "notistack";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FiArrowRight, FiRotateCcw, FiShoppingCart, FiTrash2, FiX } from "react-icons/fi";
import ProductImage from "../ProductImage";

type ProductNoticeProps = CustomContentProps & {
  kind: "cart" | "wishlist";
  image?: string;
  removed?: boolean;
  heading?: string;
  onUndo?: () => void;
};

const kinds = {
  cart: {
    icon: FiShoppingCart,
    removedIcon: FiTrash2,
    title: "Agregado al carrito",
    removedTitle: "Quitado del carrito",
    link: { to: "/cart", label: "Ver carrito" },
    border: "border-t-brand",
    text: "text-brand",
    soft: "bg-brand-soft",
  },
  wishlist: {
    icon: FaHeart,
    removedIcon: FaRegHeart,
    title: "Guardado en favoritos",
    removedTitle: "Quitado de favoritos",
    link: { to: "/profile/wish-list", label: "Ver favoritos" },
    border: "border-t-[#d6408f]",
    text: "text-[#d6408f]",
    soft: "bg-[#fce8f3]",
  },
};

const ProductNotice = forwardRef<HTMLDivElement, ProductNoticeProps>(
  ({ id, message, kind, image, removed, heading, onUndo }, ref) => {
    const style = kinds[kind];
    const Icon = removed ? style.removedIcon : style.icon;
    const title = heading ?? (removed ? style.removedTitle : style.title);

    return (
      <SnackbarContent ref={ref} role="status">
        <div
          className={`flex w-[min(24rem,calc(100vw-2rem))] items-center gap-3 border border-t-4 border-line
            bg-base-100 p-3 shadow-card-hover ${removed ? "border-t-ink-muted" : style.border}`}
        >
          <span
            className={`grid h-14 w-14 shrink-0 place-items-center overflow-hidden p-1.5 ${
              removed ? "bg-cream opacity-70 grayscale" : style.soft
            }`}
          >
            {image ? (
              <ProductImage src={image} width={120} alt="" cutoutClassName="mix-blend-darken" />
            ) : (
              <Icon size={20} className={removed ? "text-ink-muted" : style.text} />
            )}
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <p className={`flex items-center gap-1.5 text-sm font-extrabold ${removed ? "text-ink-soft" : style.text}`}>
              <Icon size={13} />
              {title}
            </p>
            <p className="mt-0.5 truncate text-sm font-semibold text-ink">{message}</p>
            {removed ? (
              onUndo && (
                <button
                  type="button"
                  onClick={() => {
                    onUndo();
                    closeSnackbar(id);
                  }}
                  className="mt-1 inline-flex cursor-pointer items-center gap-1 text-xs font-bold text-brand
                    underline-offset-4 hover:underline"
                >
                  <FiRotateCcw size={12} />
                  Deshacer
                </button>
              )
            ) : (
              <Link
                to={style.link.to}
                onClick={() => closeSnackbar(id)}
                className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-ink-soft underline-offset-4
                  hover:text-ink hover:underline"
              >
                {style.link.label}
                <FiArrowRight size={12} />
              </Link>
            )}
          </div>
          <button
            type="button"
            aria-label="Cerrar aviso"
            onClick={() => closeSnackbar(id)}
            className="-mr-1 grid h-9 w-9 shrink-0 cursor-pointer place-items-center self-start rounded-full
              text-ink-soft transition-colors hover:bg-cream hover:text-ink"
          >
            <FiX size={18} />
          </button>
        </div>
      </SnackbarContent>
    );
  },
);

ProductNotice.displayName = "ProductNotice";

export default ProductNotice;
