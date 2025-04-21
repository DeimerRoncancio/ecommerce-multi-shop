import useCart from "../../cart/hooks/useCart";
import useGetProducts from "../../shared/hooks/api/useGetProducts";
import WishListItem from "../components/WishListItem";
import useWishList from "../hooks/useWishList";

export default function WishList() {
  const { items, handleAddItem } = useCart();
  const { products } = useGetProducts();
  const { wishList } = useWishList();

  const handleAddToWishList = () => {
    const cartIds = new Set(items.map(listItem => listItem.id));
    const itemsToAdd = wishList.filter(({ id }) => !cartIds.has(id));
    const productsById = new Map(products.map(product => [product.id, product]));

    itemsToAdd.forEach(({ id }) => {
      const product = productsById.get(id);
      product && handleAddItem(product);
    })
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-[#5e472d]">Lista de deseos</h2>
        <button className="btn"
          onClick={() => handleAddToWishList()}
        >Agregar el carrito</button>
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
              <WishListItem key={item.id} item={item} index={index} />
            ))
          }
        </ul>
      </div>
    </>
  )
}
