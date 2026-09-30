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
      className="relative flex h-14 min-w-16 flex-col items-center justify-center gap-0.5 rounded-xl px-2
        text-white transition-colors hover:bg-white/15"
    >
      <span className="relative">
        <FiHeart size={22} />
        {wishList.length > 0 && (
          <span
            className="absolute -top-3 left-4.25 grid h-5 min-w-5 place-items-center rounded-full bg-sun px-1
              text-[11px] font-extrabold text-ink ring-2 ring-brand"
          >
            {wishList.length}
          </span>
        )}
      </span>
      <span className="text-xs font-bold">Favoritos</span>
    </button>
  );
}
