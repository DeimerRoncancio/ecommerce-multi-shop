import { forwardRef } from "react";
import { closeSnackbar, CustomContentProps, SnackbarContent } from "notistack";
import { FiAlertCircle, FiAlertTriangle, FiCheck, FiX } from "react-icons/fi";

const styles = {
  success: { icon: FiCheck, border: "border-t-success", badge: "bg-success text-white", title: "Listo" },
  error: { icon: FiAlertCircle, border: "border-t-error", badge: "bg-error text-white", title: "Algo salió mal" },
  warning: { icon: FiAlertTriangle, border: "border-t-sun", badge: "bg-sun text-ink", title: "Atención" },
};

const SnackbarNotice = forwardRef<HTMLDivElement, CustomContentProps>(({ id, message, variant }, ref) => {
  const {
    icon: Icon,
    border,
    badge,
    title,
  } = variant === "success" ? styles.success : variant === "warning" ? styles.warning : styles.error;

  return (
    <SnackbarContent ref={ref} role="alert">
      <div
        className={`flex w-[min(24rem,calc(100vw-2rem))] items-start gap-3 border border-t-4 border-line bg-base-100
          px-4 py-3.5 shadow-card-hover ${border}`}
      >
        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${badge}`}>
          <Icon size={17} strokeWidth={2.5} />
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="font-extrabold text-ink">{title}</p>
          <p className="mt-0.5 text-sm text-ink-soft">{message}</p>
        </div>
        <button
          type="button"
          aria-label="Cerrar aviso"
          onClick={() => closeSnackbar(id)}
          className="-mr-1.5 -mt-1 grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full text-ink-soft
            transition-colors hover:bg-cream hover:text-ink"
        >
          <FiX size={18} />
        </button>
      </div>
    </SnackbarContent>
  );
});

SnackbarNotice.displayName = "SnackbarNotice";

export default SnackbarNotice;
