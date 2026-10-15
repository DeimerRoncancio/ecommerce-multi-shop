import { useState } from "react";
import { pricePresets } from "../../constants/catalog.helper";
import { formatPrice } from "../../../shared/utilities/format-price";

type PriceRange = { min: number | null; max: number | null };

type PriceFilterProps = PriceRange & {
  bounds: PriceRange;
  onChange: (range: PriceRange) => void;
};

const toNumber = (value: string) => (value.trim() === "" ? null : Math.max(0, Math.round(Number(value)) || 0));

const inputClass =
  "h-10 w-full min-w-0 rounded-lg border border-line bg-base-100 px-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-brand";

export default function PriceFilter({ min, max, bounds, onChange }: PriceFilterProps) {
  const [from, setFrom] = useState(min?.toString() ?? "");
  const [to, setTo] = useState(max?.toString() ?? "");

  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-col gap-1">
        {pricePresets.map(preset => {
          const active = preset.min === min && preset.max === max;

          return (
            <li key={preset.label}>
              <button
                type="button"
                onClick={() => onChange(active ? { min: null, max: null } : preset)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-sm transition-colors ${
                  active ? "bg-brand-soft font-bold text-brand" : "text-ink-soft hover:bg-cream"
                }`}
              >
                <span
                  className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 ${
                    active ? "border-brand" : "border-line"
                  }`}
                >
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-brand" />}
                </span>
                {preset.label}
              </button>
            </li>
          );
        })}
      </ul>

      <form
        className="flex items-center gap-2"
        onSubmit={event => {
          event.preventDefault();
          onChange({ min: toNumber(from), max: toNumber(to) });
        }}
      >
        <input
          type="number"
          inputMode="numeric"
          min={0}
          value={from}
          onChange={event => setFrom(event.target.value)}
          placeholder="Mín."
          aria-label="Precio mínimo"
          className={inputClass}
        />
        <span className="text-ink-muted">–</span>
        <input
          type="number"
          inputMode="numeric"
          min={0}
          value={to}
          onChange={event => setTo(event.target.value)}
          placeholder="Máx."
          aria-label="Precio máximo"
          className={inputClass}
        />
        <button
          type="submit"
          className="h-10 shrink-0 rounded-lg bg-ink px-3 text-sm font-bold text-white transition-colors hover:bg-brand"
        >
          Ir
        </button>
      </form>

      {bounds.min !== null && bounds.max !== null && (
        <p className="text-xs text-ink-muted">
          Precios entre {formatPrice(bounds.min)} y {formatPrice(bounds.max)}
        </p>
      )}
    </div>
  );
}
