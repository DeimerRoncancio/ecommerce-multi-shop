import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { IoBagHandleOutline } from "react-icons/io5";
import ProductQuantity from "./ProductQuantity";
import useWishList from "../../wishlist/hooks/useWishList";
import { ProductsFromApiType } from "../types/product";
import { mapApiToProducts } from "../mappers/products.maper";
import useCart from "../../cart/hooks/useCart";
import { useState } from "react";
import BuyButton from "./BuyButton";
import { formatPrice } from "../../shared/utilities/format-price";

type BuyProductProps = {
  productFromApi: ProductsFromApiType;
};

export default function BuyProduct({ productFromApi }: BuyProductProps) {
  const { isInWishList, handleAddWishListItem, handleRemoveWishListItem } = useWishList();
  const { handleAddItem, isInCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const inCart = isInCart(productFromApi.id);
  const inWishList = isInWishList(productFromApi.id);

  const handleAddToCart = () => {
    handleAddItem(mapApiToProducts(productFromApi), quantity);
  };

  const handleToggleWishList = () => {
    inWishList
      ? handleRemoveWishListItem(productFromApi.id)
      : handleAddWishListItem(mapApiToProducts(productFromApi));
  };

  return (
    <div className="flex flex-col gap-5">
      <ProductQuantity quantity={quantity} onQuantityChange={setQuantity} />

      <div className="flex flex-col gap-3">
        <button
          type="button"
          disabled={inCart}
          onClick={handleAddToCart}
          className="btn h-12 gap-2 rounded-xl border-0 bg-brand text-primary-content shadow-none
            hover:bg-brand-dark disabled:bg-base-300 disabled:text-ink-muted"
        >
          <IoBagHandleOutline size={18} />
          {inCart ? "Agregado al carrito" : "Agregar al carrito"}
          <span className="font-semibold">
            · {formatPrice(productFromApi.price * quantity)}
          </span>
        </button>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleToggleWishList}
            className="btn h-12 gap-2 rounded-xl border border-line bg-base-100 text-ink shadow-none
              hover:border-brand hover:bg-brand-soft hover:text-secondary-content"
          >
            {inWishList ? <IoMdHeart size={18} className="text-brand" /> : <IoIosHeartEmpty size={18} />}
            {inWishList ? "En tu lista" : "Lista de deseos"}
          </button>
          <BuyButton product={productFromApi} />
        </div>
      </div>
    </div>
  );
}
