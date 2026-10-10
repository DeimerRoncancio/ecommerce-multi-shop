import Container from "../../shared/ui/Container";

export default function CancelSkeleton() {
  return (
    <Container className="flex flex-col items-center py-12 lg:py-16">
      <div className="h-20 w-20 animate-pulse rounded-full bg-base-200" />
      <div className="mt-6 h-10 w-72 max-w-full animate-pulse rounded-lg bg-base-200" />
      <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-base-200" />

      <section
        aria-busy="true"
        aria-label="Cargando"
        className="mt-10 w-full max-w-xl rounded-2xl border border-line p-5 sm:p-6"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="h-3 w-24 animate-pulse rounded bg-base-200" />
          <div className="h-4 w-20 animate-pulse rounded bg-base-200" />
        </div>

        <div className="mt-3 flex flex-col gap-3 border-y border-line py-3">
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

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <div className="h-12 flex-1 animate-pulse rounded-full bg-base-200" />
          <div className="h-12 flex-1 animate-pulse rounded-full bg-base-200" />
        </div>
      </section>
    </Container>
  );
}
