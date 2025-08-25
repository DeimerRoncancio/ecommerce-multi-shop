import { ProductVariantType } from "../../types/product";
import VariantColorItem from "./VariantColorItem";

type Props = {
  variants?: ProductVariantType[];
}

export default function Variants({ variants }: Props) {
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
                {
                  variant.tag == "color" &&
                  variant.listValues.map(value => (
                    <VariantColorItem value={value} />
                  ))
                }
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
