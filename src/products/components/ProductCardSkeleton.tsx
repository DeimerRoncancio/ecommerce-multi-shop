export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 border border-line bg-base-100 p-3">
      <div className="aspect-square w-full animate-pulse bg-base-200" />
      <div className="mt-1 h-4 w-4/5 animate-pulse bg-base-200" />
      <div className="h-3 w-1/2 animate-pulse bg-base-200" />
      <div className="mt-2 flex items-end justify-between">
        <div className="h-8 w-24 animate-pulse bg-base-200" />
        <div className="h-10 w-10 animate-pulse rounded-full bg-base-200" />
      </div>
    </div>
  );
}
