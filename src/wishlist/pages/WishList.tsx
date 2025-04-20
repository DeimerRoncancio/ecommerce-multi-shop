import WishListItem from "../components/WishListItem";
import useWishList from "../hooks/useWishList";

export default function WishList() {
  const { wishListItems } = useWishList();

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-[#5e472d]">Lista de deseos</h2>
        <button className="btn">Agregar el carrito</button>
      </div>
      <div>
        <ul className="flex flex-wrap gap-6">
          {
            wishListItems.map((item, index) => (
              <WishListItem key={item.id} item={item} index={index} />
            ))
          }
        </ul>
      </div>
    </>
  )
}
