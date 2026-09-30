import { ReactNode } from "react";
import { Link } from "react-router";
import { FiArrowLeft, FiCheck } from "react-icons/fi";

type AuthLayoutProps = {
  title: string;
  highlight: string;
  subtitle: string;
  perks: string[];
  children: ReactNode;
};

export default function AuthLayout({ title, highlight, subtitle, perks, children }: AuthLayoutProps) {
  return (
    <div className="auth-page grid min-h-dvh w-full bg-base-100 lg:h-dvh lg:grid-cols-[0.95fr_1.05fr]">
      <section className="relative flex flex-col gap-8 overflow-hidden border-b border-brand/15 bg-brand-soft/70 px-8
        py-10 text-ink lg:border-b-0 lg:border-r lg:px-14">
        <Link to="/" className="relative z-10 w-fit transition-transform hover:-rotate-2" aria-label="Ir al inicio">
          <img src="/images/logo-wordmark.webp" alt="Multi Shop" className="h-9 w-auto" />
        </Link>

        <div className="relative z-10 max-w-md lg:mt-auto">
          <h1 className="text-4xl font-extrabold leading-[1.05] lg:text-5xl">
            {title} <span className="text-brand">{highlight}</span>
          </h1>
          <p className="mt-3 text-ink-soft">{subtitle}</p>

          <ul className="mt-7 flex flex-col gap-3.5">
            {perks.map(perk => (
              <li key={perk} className="flex items-center gap-3 font-bold">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <FiCheck size={15} strokeWidth={3} />
                </span>
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 hidden text-sm text-ink-muted lg:mb-auto lg:block">
          Envío gratis a todo el país · 30 días para devolver
        </p>

        <img
          src="/images/logo-mark.webp"
          alt=""
          aria-hidden
          className="pointer-events-none absolute -bottom-12 -right-12 hidden w-72 -rotate-[8deg] lg:block"
        />
      </section>

      <section className="flex flex-col px-6 py-8 lg:overflow-y-auto lg:px-14">
        <Link
          to="/"
          className="flex w-fit items-center gap-1.5 self-end text-sm font-bold text-ink-soft transition-colors
            hover:text-brand"
        >
          <FiArrowLeft size={15} />
          Volver a la tienda
        </Link>
        <div className="flex flex-1 items-center justify-center py-8">{children}</div>
      </section>
    </div>
  );
}
