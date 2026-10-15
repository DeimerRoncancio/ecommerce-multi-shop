export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="aspect-square w-full animate-pulse rounded-2xl bg-base-200" />
      <div className="flex flex-col gap-2 px-1 pt-4">
        <div className="h-3 w-16 animate-pulse rounded bg-base-200" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-base-200" />
        <div className="mt-2 h-8 w-24 animate-pulse bg-sun/40" />
        <div className="h-3 w-20 animate-pulse rounded bg-success/15" />
      </div>
    </div>
  );
}
