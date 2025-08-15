import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { IoBagHandleOutline } from "react-icons/io5";
import ProductQuantity from "./ProductQuantity";
import useWishList from "../../wishlist/hooks/useWishList";
import { ProductsFromApiType } from "../types/product";
import { mapApiToProducts } from "../mappers/products.maper";
import useCart from "../../cart/hooks/useCart";
import { useState } from "react";
import BuyButton from "./BuyButton";

type BuyProductProps = {
  productFromApi: ProductsFromApiType;
};

export default function BuyProduct({ productFromApi }: BuyProductProps) {
  const { isInWishList, handleAddWishListItem, handleRemoveWishListItem} = useWishList();
  const { handleAddItem, isInCart } = useCart()
   const [quantity, setQuantity] = useState(1);

  const handleAddToWishList = () => {
    const product = mapApiToProducts(productFromApi);
    handleAddWishListItem(product);
  };

  const handleAddToCart = () => {
    const product = mapApiToProducts(productFromApi);
    handleAddItem(product, quantity);
  };

  const handleQuantityChange = (newQuantity: number) => setQuantity(newQuantity);

  return (
    <>
      <ProductQuantity quantity={quantity} onQuantityChange={handleQuantityChange} />
      <div className="flex flex-col gap-2 mr-6">
        <div className="flex flex-col">
          <button className={`btn btn-info disabled:!bg-[#af4b29] bg-[#f04913]
          border-none text-white rounded-2xl shadow-none outline-none focus-visible:outline-none`} 
          disabled={isInCart(productFromApi.id)}
          onClick={handleAddToCart}>
            <IoBagHandleOutline size={17} />
            {isInCart(productFromApi.id) ? "Agregado " : "Agregar "}
            al carrito - $
            {
              new Intl.NumberFormat("es-ES").format(productFromApi.price * quantity)
            }
            {` (${quantity})`}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button className="btn btn-outline btn-primary border border-gray-300 rounded-2xl 
          hover:bg-gray-100 hover:text-black shadow-none focus-visible:bg-white 
          focus-visible:text-black focus-visible:outline-none" onClick={() => {
              isInWishList(productFromApi.id) ?
                handleRemoveWishListItem(productFromApi.id) :
                handleAddToWishList()
            }}>
            {isInWishList(productFromApi.id) ?
              <IoMdHeart size={17} color="#fb2c36" /> :
              <IoIosHeartEmpty size={17} />}
            {isInWishList(productFromApi.id) ?
              "Agregado " :
              "Agregar "}
             a lista de deseos
          </button>
          <BuyButton product={productFromApi} />
        </div>
      </div>
    </>
  );
}
