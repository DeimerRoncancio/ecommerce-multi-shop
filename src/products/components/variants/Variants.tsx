import { useState } from "react";
import { ProductVariantType } from "../../types/product";
import VariantColorItem from "./VariantColorItem";
import VariantItem from "./VariantItem";

type Props = {
  variants?: ProductVariantType[];
}

export default function Variants({ variants }: Props) {
  const [variantSelected, setVariantSelected] = useState<string | null>(null);

  const handleVariantSelect = (size: string) => {
    setVariantSelected(size);
  }

  return (
    <>
      {variants && variants.length > 0 && (
        <ul>
          {variants.map(variant => (
            <li key={variant.name} className="flex flex-col gap-2">
              <p className="text-[#364153] font-medium">
                {variant.tag.charAt(0).toUpperCase() + variant.tag.slice(1)}:
              </p>
              <div className="flex gap-3">
                {variant.type === "color" &&
                  variant.listValues.map(value => (
                    <VariantColorItem color={value} colorSelected={variantSelected} pickColor={handleVariantSelect} />
                  ))}
                {variant.type === "text" &&
                  variant.listValues.map(value => (
                    <VariantItem size={value} variantSelected={variantSelected} pickVariant={handleVariantSelect} />
                  ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
