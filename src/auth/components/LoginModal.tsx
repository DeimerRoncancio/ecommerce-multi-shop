import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useFetcher } from "react-router";
import { FiAlertCircle, FiArrowRight, FiCheck, FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import TextField from "../../shared/ui/TextField";
import useScrollLock from "../../shared/hooks/useScrollLock";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  redirectTo: string;
  subtitle?: string;
  perks?: string[];
};

type LoginResult = { errors?: Record<string, string[]> };

const checkoutPerks = ["Datos llenos", "Direcciones guardadas", "Tus pedidos"];

export default function LoginModal({
  isOpen,
  onClose,
  redirectTo,
  subtitle = "Inicia sesión y seguimos con tu compra.",
  perks = checkoutPerks,
}: LoginModalProps) {
  const fetcher = useFetcher<LoginResult>();
  const [isMounted, setIsMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const titleId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const isSubmitting = fetcher.state !== "idle";
  const errors = showErrors ? fetcher.data?.errors : undefined;

  useEffect(() => setIsMounted(true), []);
  useScrollLock(isOpen);

  const close = () => {
    formRef.current?.reset();
    setShowErrors(false);
    setShowPassword(false);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

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
        className={`relative w-full max-w-md overflow-hidden rounded-2xl bg-base-100 text-ink shadow-card-hover
          transition-transform duration-150 ${isOpen ? "scale-100" : "scale-95"}`}
      >
        <fetcher.Form ref={formRef} method="post" action="/login" noValidate onSubmit={() => setShowErrors(true)}>
          <input type="hidden" name="redirectTo" value={redirectTo} />

          <header className="relative overflow-hidden bg-brand px-5 pb-6 pt-5 text-white">
            <img
              src="/svg/bolsa-inclinada-blanco.svg"
              alt=""
              aria-hidden
              className="pointer-events-none absolute -bottom-12 right-10 h-36 w-auto -rotate-12 opacity-10"
            />
            <div className="relative flex items-center gap-3.5 pr-8">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/30">
                <img src="/svg/simbolo-blanco.svg" alt="" className="h-7 w-auto" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 id={titleId} className="text-xl font-extrabold leading-tight sm:text-2xl">
                  Qué bueno verte <span className="text-sun">otra vez</span>
                </h2>
                <p className="mt-0.5 text-sm text-white/85">{subtitle}</p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Cerrar"
              onClick={close}
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-white/85
                transition-colors hover:bg-white/15 hover:text-white"
            >
              <IoCloseOutline size={22} />
            </button>
          </header>

          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 border-b border-line bg-brand-soft/60 px-5 py-3">
            {perks.map(perk => (
              <li key={perk} className="flex items-center gap-1.5 text-xs font-bold text-ink">
                <span className="grid h-4.5 w-4.5 place-items-center rounded-full bg-brand text-white">
                  <FiCheck size={11} strokeWidth={3.5} />
                </span>
                {perk}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3.5 px-5 pb-2 pt-5">
            {errors?.unauthorized && (
              <p
                role="alert"
                className="flex items-center gap-2.5 rounded-xl border border-error/30 bg-error/10 px-4 py-3 text-sm
                  font-semibold text-error"
              >
                <FiAlertCircle size={17} className="shrink-0" />
                {errors.unauthorized[0]}
              </p>
            )}

            <TextField
              label="Correo electrónico"
              name="identifier"
              type="text"
              autoComplete="username"
              placeholder="nombre@correo.com"
              icon={FiMail}
              error={errors?.identifier?.[0]}
            />
            <TextField
              label="Contraseña"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Tu contraseña"
              icon={FiLock}
              error={errors?.password?.[0]}
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  className="grid h-8 w-8 place-items-center rounded-md text-ink-muted transition-colors
                    hover:bg-cream hover:text-brand"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              }
            />
          </div>

          <footer className="flex flex-col items-center gap-3 px-5 pb-5 pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand font-bold text-white
                transition-colors hover:bg-ink disabled:bg-base-300 disabled:text-ink-muted"
            >
              {isSubmitting ? "Ingresando…" : "Iniciar sesión"}
              {!isSubmitting && <FiArrowRight size={17} />}
            </button>
            <button
              type="button"
              onClick={close}
              className="text-sm font-bold text-ink-soft underline-offset-4 transition-colors hover:text-ink
                hover:underline"
            >
              Seguir sin cuenta
            </button>
          </footer>
        </fetcher.Form>
      </div>
    </div>,
    document.body,
  );
}
