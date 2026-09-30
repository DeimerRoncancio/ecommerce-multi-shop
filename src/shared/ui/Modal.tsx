import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  icon?: ReactNode;
  tone?: "brand" | "error";
  children?: ReactNode;
  footer?: ReactNode;
};

const tones = {
  brand: { line: "border-brand", icon: "bg-brand-soft text-brand" },
  error: { line: "border-error", icon: "bg-error/10 text-error" },
};

export default function Modal({ open, onClose, title, description, icon, tone = "brand", children, footer }: ModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!isMounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 grid place-items-center p-4 transition-opacity duration-150 ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`relative w-full max-w-md overflow-hidden rounded-2xl border-t-4 bg-base-100 text-ink
          shadow-card-hover transition-transform duration-150 ${tones[tone].line} ${open ? "scale-100" : "scale-95"}`}
      >
        <div className="flex items-start gap-3.5 px-5 pb-2 pt-5">
          {icon && (
            <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${tones[tone].icon}`}>
              {icon}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-extrabold leading-tight">{title}</h2>
            {description && <p className="mt-1 text-sm text-ink-soft">{description}</p>}
          </div>
          <button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            className="-mr-1 -mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink-soft
              transition-colors hover:bg-cream hover:text-ink"
          >
            <IoCloseOutline size={22} />
          </button>
        </div>

        {children && <div className="px-5 py-3">{children}</div>}

        {footer && <div className="flex justify-end gap-2.5 border-t border-line px-5 py-4">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
