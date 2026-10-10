import Container from "../../shared/ui/Container";

export default function DeliverySkeleton() {
  return (
    <Container className="grid items-start gap-8 pb-16 lg:grid-cols-[1fr_380px] lg:gap-12">
      <section aria-busy="true" aria-label="Cargando la entrega">
        <div className="h-9 w-36 animate-pulse rounded-lg bg-base-200" />
        <div className="mt-2 h-4 w-80 max-w-full animate-pulse rounded bg-base-200" />

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[0, 1].map((card) => (
            <div key={card} className="flex min-h-28 flex-col gap-2.5 rounded-2xl border-2 border-line p-4">
              <div className="h-4 w-32 animate-pulse rounded bg-base-200" />
              <div className="h-3 w-4/5 animate-pulse rounded bg-base-200" />
              <div className="h-3 w-3/5 animate-pulse rounded bg-base-200" />
              <div className="h-3 w-28 animate-pulse rounded bg-base-200" />
            </div>
          ))}
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
