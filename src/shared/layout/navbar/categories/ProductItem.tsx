import { ProductItemType } from "../../../../products/types/product";
import MiniProductCard from "../../../ui/MiniProductCard";

type ProductItemProps = {
  product: ProductItemType;
  closeModal: (isVisible: boolean) => void;
};

export default function ProductItem({ product, closeModal }: ProductItemProps) {
  return (
    <li>
      <MiniProductCard
        id={product.id}
        name={product.productName}
        price={product.price}
        image={product.mainImage.imageUrl}
        onNavigate={() => closeModal(false)}
      />
    </li>
  );
}
