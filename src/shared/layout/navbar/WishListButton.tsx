import { FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router";
import useWishList from "../../../wishlist/hooks/useWishList";

export default function WishListButton() {
  const { wishList } = useWishList();
  const navigate = useNavigate();

  return (
    <button
      type="button"
      aria-label={`Lista de deseos, ${wishList.length} productos`}
      onClick={() => navigate("/profile/wish-list")}
      className="relative grid h-10 w-10 place-items-center rounded-xl text-ink
        transition-colors hover:bg-cream hover:text-brand"
    >
      <FiHeart size={21} />
      {wishList.length > 0 && (
        <span
          className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full
            bg-brand px-1 text-[11px] font-semibold text-primary-content"
        >
          {wishList.length}
        </span>
      )}
    </button>
  );
}
