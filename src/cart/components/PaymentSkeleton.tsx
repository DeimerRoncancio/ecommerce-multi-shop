import Container from "../../shared/ui/Container";

export default function PaymentSkeleton() {
  return (
    <Container className="grid items-start gap-8 pb-16 lg:grid-cols-[1fr_380px] lg:gap-12">
      <section aria-busy="true" aria-label="Cargando el pago">
        <div className="h-9 w-28 animate-pulse rounded-lg bg-base-200" />
        <div className="mt-2 h-4 w-72 max-w-full animate-pulse rounded bg-base-200" />

        <div className="mt-5 flex items-center gap-4 rounded-2xl border-2 border-line p-4">
          <div className="h-5 w-5 shrink-0 animate-pulse rounded-full bg-base-200" />
          <div className="h-11 w-11 shrink-0 animate-pulse rounded-full bg-base-200" />
          <div className="flex flex-1 flex-col gap-2">
            <div className="h-4 w-48 max-w-full animate-pulse rounded bg-base-200" />
            <div className="h-3 w-4/5 animate-pulse rounded bg-base-200" />
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-cream p-5">
          <div className="h-3 w-32 animate-pulse rounded bg-base-300" />
          <div className="mt-4 flex flex-col gap-3 border-b border-line pb-4">
            {[0, 1, 2].map((row) => (
              <div key={row} className="flex justify-between gap-4">
                <div className="h-4 w-1/2 animate-pulse rounded bg-base-300" />
                <div className="h-4 w-20 animate-pulse rounded bg-base-300" />
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="h-3 w-40 animate-pulse rounded bg-base-300" />
            <div className="h-3 w-56 max-w-full animate-pulse rounded bg-base-300" />
            <div className="h-3 w-64 max-w-full animate-pulse rounded bg-base-300" />
          </div>
        </div>
      </section>

      <aside className="flex flex-col gap-4 rounded-2xl bg-brand-soft/70 p-5 lg:rounded-none lg:bg-transparent lg:p-0">
        <div className="h-3 w-36 animate-pulse rounded bg-brand/15" />
        <div className="flex justify-between">
          <div className="h-4 w-28 animate-pulse rounded bg-brand/15" />
          <div className="h-4 w-20 animate-pulse rounded bg-brand/15" />
        </div>
        <div className="flex justify-between">
          <div className="h-4 w-16 animate-pulse rounded bg-brand/15" />
          <div className="h-4 w-14 animate-pulse rounded bg-brand/15" />
        </div>
        <div className="flex items-end justify-between border-t border-brand/20 pt-4">
          <div className="h-4 w-12 animate-pulse rounded bg-brand/15" />
          <div className="h-9 w-40 animate-pulse rounded-lg bg-brand/15" />
        </div>
        <div className="h-14 w-full animate-pulse rounded-full bg-brand/15" />
      </aside>
    </Container>
  );
}
