import useProducts from "../../products/hooks/api/useProducts";
import WishListItem from "../components/WishListItem";
import useWishList from "../hooks/useWishList";

export default function WishList() {
  const { wishList, itemsInCart, handleAddToCartSinceWishList } = useWishList();
  const { products } = useProducts();

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-display text-2xl font-extrabold text-ink">Lista de deseos</h2>
        <button
          type="button"
          disabled={!itemsInCart || !wishList.length}
          onClick={() => handleAddToCartSinceWishList(products)}
          className="btn gap-2 sticker sticker-hover bg-action font-bold text-primary-content
            hover:bg-action-dark disabled:bg-base-300 disabled:text-ink-muted font-semibold"
        >
          {!wishList.length
            ? "No hay productos"
            : itemsInCart
              ? "Agregar todo al carrito"
              : "Productos agregados"}
        </button>
      </div>

      {!wishList.length ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <img src="/images/box-empty.png" alt="" width={140} />
          <p className="text-xl font-bold text-ink">Tu lista de deseos está vacía</p>
          <p className="max-w-sm text-ink-muted">
            Guarda aquí los productos que te gustan para comprarlos después.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {wishList.map((item, index) => (
            <WishListItem key={item.id} item={item} index={index} products={products} />
          ))}
        </ul>
      )}
    </>
  );
}
