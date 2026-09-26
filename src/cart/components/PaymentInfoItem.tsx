import { formatPrice } from "../../shared/utilities/format-price";

type PaymentInfoItemProps = {
  isMain: boolean;
  label: string;
  value: number;
};

export default function PaymentInfoItem({ isMain, label, value }: PaymentInfoItemProps) {
  return (
    <li
      className={`flex items-center justify-between px-5 py-2 ${
        isMain
          ? "mt-2 border-t border-line pt-3 font-display text-lg font-semibold text-ink"
          : "text-ink-soft"
      }`}
    >
      <p>{label}</p>
      <p className={isMain ? "" : "font-medium text-ink"}>{formatPrice(value)}</p>
    </li>
  );
}
