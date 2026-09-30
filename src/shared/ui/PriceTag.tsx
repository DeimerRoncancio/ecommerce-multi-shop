type PriceTagProps = {
  price: number;
  label?: string;
  size?: "sm" | "lg";
};

const formatter = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 });

export default function PriceTag({ price, label, size = "sm" }: PriceTagProps) {
  return (
    <span className={`inline-flex flex-col self-start bg-sun text-ink ${size === "lg" ? "px-4 pb-2.5 pt-2" : "px-2.5 pb-1.5 pt-1"}`}>
      {label && <small className="text-xs font-bold">{label}</small>}
      <b className={`font-extrabold leading-none tracking-tight ${size === "lg" ? "text-4xl" : "text-xl"}`}>
        <sup className={`align-top ${size === "lg" ? "text-base" : "text-xs"}`}>$</sup>
        {formatter.format(price)}
      </b>
    </span>
  );
}
