import { formatPrice } from "../../shared/utilities/format-price";

type PaymentInfoItemProps = {
  isMain: boolean;
  label: string;
  value: number;
};

export default function PaymentInfoItem({ isMain, label, value }: PaymentInfoItemProps) {
  return (
    <li
      className={`flex items-center justify-between py-1.5 ${
        isMain ? "mt-2 border-t border-brand/20 pt-3 text-xl font-extrabold text-ink" : "text-ink-soft"
      }`}
    >
      <p>{label}</p>
      <p className={isMain ? "" : "font-semibold text-ink"}>{formatPrice(value)}</p>
    </li>
  );
}
