import { FaRegTrashAlt } from "react-icons/fa"
import { WishListItemType } from "../types/wishlist"
import useWishList from "../hooks/useWishList"

type WishListItemProps = {
  item: WishListItemType,
  index: number
}

export default function WishListItem({ item, index }: WishListItemProps) {
  const { removeWishListItem } = useWishList();
  
  return (
    <li className="relative bg-white border border-[#e5e7eb] hover:border-[#ea5721] z-10
    rounded-2xl transition-all duration-300">
      <div className="w-[243px] h-40 rounded-2xl overflow-hidden">
        <img
          src={item.productImage}
          className="w-full h-full object-contain rounded-2xl hover:scale-110 transition-all duration-300"
          alt=""
        />
      </div>
      <div className="flex flex-col p-4 gap-1 bg-white rounded-2xl">
        <h2 className="text-[#5e472d] text-base">{item.productName}</h2>
        <div className="flex items-center gap-1 text-sm">
          <div className="rating rating-xs rating-half">
            <input type="radio" name={`rating-${index + 1}`} className="rating-hidden" />
            <input type="radio" name={`rating-${index + 1}`} className="mask mask-star-2 mask-half-1 bg-orange-400" aria-label="0.5 star" />
            <input type="radio" name={`rating-${index + 1}`} className="mask mask-star-2 mask-half-2 bg-orange-400" aria-label="1 star" />
            <input type="radio" name={`rating-${index + 1}`} className="mask mask-star-2 mask-half-1 bg-orange-400" aria-label="1.5 star" />
            <input type="radio" name={`rating-${index + 1}`} className="mask mask-star-2 mask-half-2 bg-orange-400" aria-label="2 star" />
            <input type="radio" name={`rating-${index + 1}`} className="mask mask-star-2 mask-half-1 bg-orange-400" aria-label="2.5 star" />
            <input type="radio" name={`rating-${index + 1}`} className="mask mask-star-2 mask-half-2 bg-orange-400" aria-label="3 star" />
            <input type="radio" name={`rating-${index + 1}`} className="mask mask-star-2 mask-half-1 bg-orange-400" aria-label="3.5 star" defaultChecked />
            <input type="radio" name={`rating-${index + 1}`} className="mask mask-star-2 mask-half-2 bg-orange-400" aria-label="4 star" />
            <input type="radio" name={`rating-${index + 1}`} className="mask mask-star-2 mask-half-1 bg-orange-400" aria-label="4.5 star" />
            <input type="radio" name={`rating-${index + 1}`} className="mask mask-star-2 mask-half-2 bg-orange-400" aria-label="5 star" />
          </div>
          <p className="text-[#8c8e91]">(4/3)</p>
        </div>
        <p className="text-[#5e4a2d] text-lg font-semibold">
          $ {new Intl.NumberFormat("es-ES").format(item.productPrice)}
        </p>
        <button className="btn btn-neutral mt-3">Agregar al carrito</button>
      </div>
      <button className="link absolute top-4 right-4" onClick={() => removeWishListItem(item.id)}>
        <FaRegTrashAlt />
      </button>
    </li>
  )
}
