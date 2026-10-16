import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiTrash2 } from "react-icons/fi";
import WishListItem from "../components/WishListItem";
import useWishList from "../hooks/useWishList";
import useWishListProducts from "../hooks/useWishListProducts";

const PAGE_SIZE = 5;

export default function WishList() {
  const { wishList, itemsInCart, handleAddToCartSinceWishList, clearWishList } = useWishList();
  const { products, loaded } = useWishListProducts(wishList);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const hidden = Math.max(wishList.length - visible, 0);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-ink">Lista de deseos</h2>
          <p className="mt-0.5 text-sm text-ink-muted">
            {wishList.length
              ? `${wishList.length} ${wishList.length === 1 ? "producto guardado" : "productos guardados"} para después.`
              : "Guarda aquí lo que te gusta con el corazón de cada producto."}
          </p>
        </div>
        {wishList.length > 0 && (
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={clearWishList}
              className="flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-bold text-ink-soft
              transition-colors hover:bg-error/10 hover:text-error"
            >
              <FiTrash2 size={15} />
              Limpiar lista
            </button>
            <button
              type="button"
              disabled={!itemsInCart}
              onClick={() => handleAddToCartSinceWishList(products)}
              className="flex h-10 items-center gap-2 rounded-full bg-brand px-5 text-sm font-bold text-white
              transition-colors hover:bg-ink disabled:bg-success/10 disabled:text-success"
            >
              {itemsInCart ? "Agregar todo al carrito" : "Todo está en el carrito"}
            </button>
          </div>
        )}
      </div>

      {!wishList.length ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <img src="/images/box-empty.png" alt="" width={140} />
          <p className="text-xl font-bold text-ink">Tu lista de deseos está vacía</p>
          <p className="max-w-sm text-ink-muted">Guarda aquí los productos que te gustan para comprarlos después.</p>
        </div>
      ) : (
        <>
          <ul className="flex flex-col gap-2.5">
            {wishList.slice(0, visible).map(item => (
              <WishListItem
                key={item.id}
                id={item.id}
                product={products.find(({ id }) => id === item.id)}
                loaded={loaded}
              />
            ))}
          </ul>

          {wishList.length > PAGE_SIZE && (
            <button
              type="button"
              onClick={() => setVisible(hidden ? visible + PAGE_SIZE : PAGE_SIZE)}
              className="mx-auto mt-5 flex h-10 items-center gap-2 rounded-full border border-line px-5 text-sm font-bold
                text-ink transition-colors hover:border-ink"
            >
              {hidden ? `Ver más (${hidden})` : "Ver menos"}
              {hidden ? <FiChevronDown size={16} /> : <FiChevronUp size={16} />}
            </button>
          )}
        </>
      )}
    </>
  );
}
