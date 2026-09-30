import { Link } from "react-router"
import { FiArrowRight } from "react-icons/fi"
import { ProductItemType } from "../../../../products/types/product"
import ProductImage from "../../../ui/ProductImage"
import PriceTag from "../../../ui/PriceTag"

type ProductItemProps = {
  product: ProductItemType;
  closeModal: (isVisible: boolean) => void
}

export default function ProductItem({ product, closeModal }: ProductItemProps) {
  return (
    <li>
      <Link
        to={`/product/${product.id}`}
        onClick={() => closeModal(false)}
        className="group flex h-full flex-col gap-2 border border-line p-2.5 transition-colors hover:border-(--cat)"
      >
        <div className="aspect-square w-full overflow-hidden bg-(--cat-soft) p-3">
          <ProductImage
            src={product.mainImage.imageUrl}
            width={300}
            alt={product.productName}
            className="mix-blend-darken transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <p className="line-clamp-2 text-sm font-extrabold leading-snug text-ink group-hover:text-(--cat)">
          {product.productName}
        </p>
        <div className="mt-auto flex items-end justify-between gap-2">
          <PriceTag price={product.price} />
          <FiArrowRight size={16} className="mb-1 text-(--cat) transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </li>
  )
}
