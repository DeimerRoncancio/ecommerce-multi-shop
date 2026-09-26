export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-line bg-base-100">
      <div className="aspect-square w-full animate-pulse bg-cream" />
      <div className="flex flex-col gap-3 p-5">
        <div className="h-3 w-16 animate-pulse rounded bg-base-300" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-base-300" />
        <div className="h-5 w-24 animate-pulse rounded bg-base-300" />
        <div className="h-10 w-full animate-pulse rounded-xl bg-base-300" />
      </div>
    </div>
  );
}
