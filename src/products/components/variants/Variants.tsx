import { useState } from "react";
import { ProductVariantType } from "../../types/product";
import VariantColorItem from "./VariantColorItem";
import VariantItem from "./VariantItem";

type Props = {
  variants?: ProductVariantType[];
};

export default function Variants({ variants }: Props) {
  const [variantSelected, setVariantSelected] = useState<string | null>(null);

  if (!variants || variants.length === 0) return null;

  return (
    <ul className="flex flex-col gap-5 border-t border-line pt-5">
      {variants.map(variant => (
        <li key={variant.name} className="flex flex-col gap-2.5">
          <p className="font-medium text-ink">
            {variant.tag.charAt(0).toUpperCase() + variant.tag.slice(1)}
          </p>
          <div className="flex flex-wrap gap-3">
            {variant.type === "color" &&
              variant.listValues.map(value => (
                <VariantColorItem
                  key={value}
                  color={value}
                  colorSelected={variantSelected}
                  pickColor={setVariantSelected}
                />
              ))}
            {variant.type === "text" &&
              variant.listValues.map(value => (
                <VariantItem
                  key={value}
                  size={value}
                  variantSelected={variantSelected}
                  pickVariant={setVariantSelected}
                />
              ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
