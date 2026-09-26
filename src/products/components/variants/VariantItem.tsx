type Props = {
  size: string;
  variantSelected: string | null;
  pickVariant: (size: string) => void;
};

export default function VariantItem({ size, variantSelected, pickVariant }: Props) {
  const isSelected = size === variantSelected;

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={() => pickVariant(size)}
      className={`grid h-11 min-w-11 place-items-center rounded-xl border px-3 text-sm font-medium
        transition-colors ${
          isSelected
            ? "border-brand bg-brand text-primary-content"
            : "border-line bg-base-100 text-ink hover:border-brand hover:text-brand"
        }`}
    >
      {size.toUpperCase()}
    </button>
  );
}
