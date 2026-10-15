import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";
import useScrollLock from "../../../shared/hooks/useScrollLock";

type FiltersDrawerProps = {
  open: boolean;
  total: number;
  onClose: () => void;
  children: ReactNode;
};

export default function FiltersDrawer({ open, total, onClose, children }: FiltersDrawerProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);
  useScrollLock(open);

  if (!isMounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-40 transition-[visibility] duration-300 lg:hidden ${open ? "visible" : "invisible"}`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-ink/40 transition-[opacity,backdrop-filter] duration-300 ${
          open ? "opacity-100 backdrop-blur-[2px]" : "opacity-0 backdrop-blur-[0px]"
        }`}
      />

      <aside
        className={`absolute left-0 top-0 flex h-full w-full max-w-sm flex-col bg-base-100 shadow-card-hover
          transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <header
          className="flex shrink-0 items-center justify-between border-b border-t-4 border-line border-t-brand px-4
            py-3"
        >
          <p className="font-extrabold text-ink">Filtros</p>
          <button
            type="button"
            aria-label="Cerrar filtros"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full text-ink-soft transition-colors hover:bg-brand-soft
              hover:text-brand"
          >
            <IoCloseOutline size={24} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-5">{children}</div>

        <footer className="shrink-0 border-t border-line p-4">
          <button
            type="button"
            onClick={onClose}
            className="h-11 w-full rounded-full bg-brand font-bold text-white transition-colors hover:bg-ink"
          >
            Ver {total} {total === 1 ? "producto" : "productos"}
          </button>
        </footer>
      </aside>
    </div>,
    document.body,
  );
}
