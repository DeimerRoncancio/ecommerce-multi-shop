import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiCheck, FiMail, FiUserCheck } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate, useRevalidator } from "react-router";
import TextField from "../../shared/ui/TextField";
import useScrollLock from "../../shared/hooks/useScrollLock";
import { rememberGuest } from "../../shared/utilities/guest";

type GuestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  redirectTo?: string;
};

const perks = [
  "Compra sin crear una cuenta",
  "Guarda tus favoritos y tu avatar",
  "Recibe la confirmación en tu correo",
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function GuestModal({ isOpen, onClose, redirectTo = "/profile/wish-list" }: GuestModalProps) {
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<string>();
  const titleId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => setIsMounted(true), []);
  useScrollLock(isOpen);

  const close = () => {
    formRef.current?.reset();
    setError(undefined);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    if (!EMAIL.test(email)) return setError("Escribe un correo válido, por ejemplo nombre@correo.com");

    rememberGuest(email);
    close();
    revalidator.revalidate().then(() => navigate(redirectTo));
  };

  if (!isMounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 grid place-items-center p-4 transition-opacity duration-150 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]" onClick={close} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative w-full max-w-md overflow-hidden rounded-2xl border-t-4 border-brand bg-base-100 text-ink
          shadow-card-hover transition-transform duration-150 ${isOpen ? "scale-100" : "scale-95"}`}
      >
        <form ref={formRef} noValidate onSubmit={onSubmit}>
          <header className="flex items-start gap-3.5 px-5 pb-2 pt-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
              <FiUserCheck size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <h2 id={titleId} className="text-lg font-extrabold leading-tight">
                Entrar como invitado
              </h2>
              <p className="mt-1 text-sm text-ink-soft">Solo necesitamos tu correo para seguir tu pedido.</p>
            </div>
            <button
              type="button"
              aria-label="Cerrar"
              onClick={close}
              className="-mr-1 -mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink-soft
                transition-colors hover:bg-cream hover:text-ink"
            >
              <IoCloseOutline size={22} />
            </button>
          </header>

          <div className="flex flex-col gap-4 px-5 py-3">
            <ul className="flex flex-col gap-2 rounded-xl bg-brand-soft/60 px-4 py-3">
              {perks.map(perk => (
                <li key={perk} className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <FiCheck size={12} strokeWidth={3} />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>

            <TextField
              label="Correo electrónico"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="nombre@correo.com"
              icon={FiMail}
              error={error}
              onChange={() => error && setError(undefined)}
            />
          </div>

          <footer className="flex justify-end gap-2.5 border-t border-line px-5 py-4">
            <button
              type="button"
              onClick={close}
              className="h-10 rounded-full border border-line px-5 text-sm font-bold text-ink transition-colors
                hover:border-ink"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="h-10 rounded-full bg-brand px-6 text-sm font-bold text-white transition-colors hover:bg-ink"
            >
              Continuar
            </button>
          </footer>
        </form>
      </div>
    </div>,
    document.body,
  );
}
