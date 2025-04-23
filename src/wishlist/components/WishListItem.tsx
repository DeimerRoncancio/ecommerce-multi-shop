import { FaRegTrashAlt } from "react-icons/fa"
import { WishListItemType } from "../types/wishlist"
import useWishList from "../hooks/useWishList"
import useCart from "../../cart/hooks/useCart"
import useGetProducts from "../../shared/hooks/api/useGetProducts"
import Rating from "./Rating"

type WishListItemProps = {
  item: WishListItemType,
  index: number
}

export default function WishListItem({ item, index }: WishListItemProps) {
  const { handleRemoveWishListItem } = useWishList();
  const { cartItems, handleAddItem } = useCart();
  const { products } = useGetProducts();

  const handleAddToCart = (id: string) => {
    const product = products.filter(item => item.id == id)[0];
    handleAddItem(product);
  }

  return (
    <li className="group relative bg-white border border-[#e5e7eb] hover:border-[#ea5721] z-10
    rounded-2xl transition-all duration-300">
      <div className="w-[243px] h-40 rounded-2xl overflow-hidden">
        <img
          src={item.productImage}
          className="w-full h-full object-contain rounded-2xl group-hover:scale-110 transition-all duration-300"
          alt=""
        />
      </div>
      <div className="flex flex-col p-4 gap-1 bg-white rounded-2xl">
        <h2 className="text-[#5e472d] text-base">{item.productName}</h2>
        <Rating index={index} />
        <p className="text-[#5e4a2d] text-lg font-semibold">
          $ {new Intl.NumberFormat("es-ES").format(item.productPrice)}
        </p>
        {
          !cartItems.some(itemCart => itemCart.id === item.id)
            ? (
              <button className="btn btn-neutral mt-3"
                onClick={() => handleAddToCart(item.id)}>
                Agregar al carrito
              </button>
            )
            : (
              <button className="btn btn-active mt-3">Producto añadido</button>
            )
        }
      </div>
      <button className="link absolute p-1 rounded-full top-0 right-3 invisible opacity-0 group-hover:visible 
      group-hover:opacity-100 group-hover:top-3 hover:text-[#ef4444] transition-all duration-300"
        onClick={() => handleRemoveWishListItem(item.id)}>
        <FaRegTrashAlt />
      </button>
    </li>
  )
}
