import useProducts from "../../products/hooks/api/useProducts";
import WishListItem from "../components/WishListItem";
import useWishList from "../hooks/useWishList";

export default function WishList() {
  const { wishList, itemsInCart, handleAddToCartSinceWishList } = useWishList();
  const { products } = useProducts();

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-display text-2xl font-semibold text-ink">Lista de deseos</h2>
        <button
          type="button"
          disabled={!itemsInCart || !wishList.length}
          onClick={() => handleAddToCartSinceWishList(products)}
          className="btn gap-2 rounded-xl border-0 bg-brand text-primary-content shadow-none
            hover:bg-brand-dark disabled:bg-base-300 disabled:text-ink-muted"
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
          <p className="text-xl font-semibold text-ink-soft">Tu lista de deseos está vacía</p>
          <p className="max-w-sm text-ink-muted">
            Guarda aquí los productos que te gustan para comprarlos después.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {wishList.map((item, index) => (
            <WishListItem key={item.id} item={item} index={index} products={products} />
          ))}
        </ul>
      )}
    </>
  );
}
