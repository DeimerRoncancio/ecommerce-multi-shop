import { FaCheckCircle } from "react-icons/fa";
import Rating from "../../wishlist/components/Rating";
import { ProductsFromApiType } from "../types/product";

type ProductInfoProps = {
  product: ProductsFromApiType
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <>
      <div>
        <div className=" flex items-center justify-between">
          <ul className="flex gap-2">
            {
              product.categories.map(cat =>
                <p className="text-[#7a7c7f] text-sm">{cat.categoryName.toUpperCase()}</p>
              )
            }
          </ul>
          <Rating index={4} />
        </div>
        <h2 className="text-3xl text-[#5e472d] font-medium">
          {product.productName}
        </h2>
      </div>

      <h2 className="text-3xl text-[#5e472d] font-medium">
        $ {new Intl.NumberFormat("es-ES").format(product.price)}
      </h2>

      <h2 className="text-[#4a5565]">
        <p className="text-[#364153] font-medium">Descripción</p>
        {product.description}
      </h2>

      <div className="flex items-center gap-2">
        <FaCheckCircle color="#198754" />
        <p>En Stock</p>
      </div>
    </>
  );
}
