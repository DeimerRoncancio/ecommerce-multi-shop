import Container from "../../shared/ui/Container";

export default function SuccessSkeleton() {
  return (
    <Container className="flex flex-col items-center py-12 lg:py-16">
      <div className="h-20 w-20 animate-pulse rounded-full bg-base-200" />
      <div className="mt-6 h-10 w-80 max-w-full animate-pulse rounded-lg bg-base-200" />
      <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-base-200" />

      <div
        aria-busy="true"
        aria-label="Cargando tu pedido"
        className="mt-10 grid w-full max-w-4xl items-start gap-5 md:grid-cols-[1.2fr_1fr]"
      >
        <section className="rounded-2xl border border-line p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-2">
              <div className="h-3 w-20 animate-pulse rounded bg-base-200" />
              <div className="h-7 w-36 animate-pulse rounded-lg bg-base-200" />
            </div>
            <div className="h-6 w-28 animate-pulse rounded-full bg-base-200" />
          </div>

          <div className="mt-4 flex flex-col gap-3 border-y border-line py-3">
            {[0, 1, 2].map((row) => (
              <div key={row} className="flex justify-between gap-4">
                <div className="h-4 w-1/2 animate-pulse rounded bg-base-200" />
                <div className="h-4 w-20 animate-pulse rounded bg-base-200" />
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-end justify-between">
            <div className="h-4 w-12 animate-pulse rounded bg-base-200" />
            <div className="h-7 w-32 animate-pulse rounded-lg bg-base-200" />
          </div>

          <div className="mt-5 flex flex-col gap-2 rounded-xl bg-cream p-4">
            <div className="h-3 w-4/5 animate-pulse rounded bg-base-300" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-base-300" />
          </div>
        </section>

        <section className="rounded-2xl bg-brand-soft/70 p-5 sm:p-6">
          <div className="h-3 w-24 animate-pulse rounded bg-brand/15" />
          <div className="mt-4 flex flex-col gap-5">
            {[0, 1, 2].map((row) => (
              <div key={row} className="flex gap-3.5">
                <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-brand/15" />
                <div className="flex flex-1 flex-col gap-2 pt-1">
                  <div className="h-4 w-40 max-w-full animate-pulse rounded bg-brand/15" />
                  <div className="h-3 w-52 max-w-full animate-pulse rounded bg-brand/15" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-2.5">
            <div className="h-12 w-full animate-pulse rounded-full bg-brand/15" />
            <div className="h-11 w-full animate-pulse rounded-full bg-brand/15" />
          </div>
        </section>
      </div>
    </Container>
  );
}
