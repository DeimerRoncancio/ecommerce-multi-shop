import useGetProducts from "../../shared/hooks/api/useGetProducts"
import WishListItem from "./components/WishListItem";

export default function WishList() {
  const { products } = useGetProducts();

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-[#5e472d]">Lista de deseos</h2>
        <button className="btn">Agregar el carrito</button>
      </div>
      <div>
        <ul className="flex flex-wrap gap-6">
          {
            products.map((product, index) => (
              <WishListItem key={product.id} product={product} index={index} />
            ))
          }
        </ul>
      </div>
    </>
  )
}
