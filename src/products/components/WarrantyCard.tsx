import { warrantyItems } from "../constants/product-details.helper";

export function WarrantyCard() {
  return (
    <ul className="grid grid-cols-3 divide-x divide-line border border-line">
      {warrantyItems.map(({ icon: Icon, title, text }) => (
        <li key={title} className="flex flex-col items-center gap-1.5 px-2 py-3.5 text-center">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-(--cat-soft,var(--color-cream))
            text-(--cat,var(--color-brand))">
            <Icon size={18} />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold text-ink">{title}</span>
            <span className="block text-xs text-ink-muted">{text}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
