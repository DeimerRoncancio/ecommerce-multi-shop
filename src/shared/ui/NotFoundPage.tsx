import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { IoArrowBack, IoHomeOutline } from "react-icons/io5";
import NavBar from "../layout/navbar/NavBar";

export default function NotFoundPage() {
  return (
    <>
      <NavBar />
      <main className="bg-base-100">
        <div
          className="mx-auto grid max-w-5xl items-center gap-8 px-4 pt-10 pb-28 md:grid-cols-2 md:gap-14 lg:pt-16
            lg:pb-20"
        >
          <div className="relative mx-auto w-full max-w-xs md:max-w-sm">
            <span aria-hidden="true" className="absolute -top-3 -right-3 h-16 w-16 rounded-full bg-sun" />
            <span
              aria-hidden="true"
              className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full border-[10px] border-brand"
            />
            <div className="relative aspect-square rounded-[2.5rem] bg-brand-soft">
              <div className="absolute inset-0">
                <DotLottieReact
                  src="/animations/404.json"
                  autoplay
                  segment={[15, 179]}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <span className="text-sm font-extrabold uppercase tracking-[0.12em] text-brand">Error 404</span>
            <h1 className="mt-2 text-4xl font-extrabold leading-tight text-ink md:text-5xl">
              Uy, aquí no hay nada
            </h1>
            <p className="mt-3 max-w-md text-base text-ink-soft">
              La dirección no existe o el producto ya no está disponible. Sigue comprando desde el inicio.
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href="/"
                className="btn h-12 gap-2 rounded-full border-2! border-brand! bg-brand px-6 font-bold text-white hover:bg-brand-dark"
              >
                <IoHomeOutline size={18} />
                Volver al inicio
              </a>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="btn h-12 gap-2 rounded-full border-2! border-brand! bg-base-100 px-6 font-bold text-brand hover:bg-brand-soft"
              >
                <IoArrowBack size={18} />
                Volver atrás
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
