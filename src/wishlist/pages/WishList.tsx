import useProducts from "../../products/hooks/api/useProducts";
import WishListItem from "../components/WishListItem";
import useWishList from "../hooks/useWishList";

export default function WishList() {
  const { wishList, itemsInCart, handleAddToCartSinceWishList } = useWishList();
  const { products } = useProducts()

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-[#5e472d]">Lista de deseos</h2>
        <button className={`btn ${
          !itemsInCart || !wishList.length
            ? 'btn-disabled text-[#a08f88]'
            : 'btn-neutral btn-outline'
        }`}
        onClick={() => handleAddToCartSinceWishList(products)}>
          {
            !wishList.length
            ? 'No hay productos'
            : itemsInCart
              ? 'Agregar al carrito'
              : 'Productos agregados'
          }
        </button>
      </div>
      <div>
        <ul className="flex flex-wrap gap-6">
          {
            !wishList.length
            ? (
              <div className="flex flex-col w-full mt-15 items-center">
                <img src="/images/wish-list-empty.png" alt="" width={150} />
                <p className="mt-5 text-2xl font-semibold text-[#80878e]">Lista de deseos vacia</p>
              </div>
            )
            : wishList.map((item, index) => (
              <WishListItem 
                key={item.id}
                item={item}
                index={index}
                products={products}
              />
            ))
          }
        </ul>
      </div>
    </>
  )
}
