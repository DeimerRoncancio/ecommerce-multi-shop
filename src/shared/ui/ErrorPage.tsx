import { IoHomeOutline, IoRefresh } from "react-icons/io5";

type ErrorPageProps = {
  label: string;
  message: string;
  details: string;
  technicalMessage?: string;
  stack?: string;
};

export default function ErrorPage({ label, message, details, technicalMessage, stack }: ErrorPageProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-cream px-4 py-12">
      <section className="flex w-full max-w-lg flex-col items-center rounded-3xl bg-base-100 px-6 py-10 text-center shadow-sm sm:px-10">
        <img src="/svg/bolsa-inclinada-naranja.svg" alt="Multi Shop" className="h-24 w-24" />

        <span className="mt-6 rounded-full bg-brand-soft px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-brand">
          {label}
        </span>
        <h1 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">{message}</h1>
        <p className="mt-2 text-base text-ink-soft">{details}</p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn h-12 gap-2 rounded-full border-2! border-brand! bg-brand font-bold text-white hover:bg-brand-dark"
          >
            <IoRefresh size={18} />
            Reintentar
          </button>
          <a
            href="/"
            className="btn h-12 gap-2 rounded-full border-2! border-brand! bg-base-100 font-bold text-brand hover:bg-brand-soft"
          >
            <IoHomeOutline size={18} />
            Volver al inicio
          </a>
        </div>
      </section>

      {stack && (
        <details className="w-full max-w-4xl rounded-2xl border border-line bg-base-100">
          <summary className="cursor-pointer px-5 py-3 text-sm font-bold text-ink">
            Detalles técnicos <span className="font-medium text-ink-muted">· solo en desarrollo</span>
          </summary>
          <div className="border-t border-line p-5">
            {technicalMessage && <p className="mb-3 text-sm font-bold text-error">{technicalMessage}</p>}
            <pre className="max-h-80 overflow-auto rounded-xl bg-ink p-4 text-xs leading-relaxed text-white">
              <code>{stack}</code>
            </pre>
          </div>
        </details>
      )}
    </main>
  );
}
