import { IoMdHeartEmpty } from "react-icons/io";
import { useNavigate } from "react-router";
import useWishList from "../../../wishlist/hooks/useWishList";

export default function WishListButton() {
  const { wishList } = useWishList();
  const navigate = useNavigate();
  
  return (
    <div className="h-full flex items-center" onClick={() => navigate("profile/wish-list")}>
      <div tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator text-[25px] text-[#343e49]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <IoMdHeartEmpty />
          </svg>
          <span className="badge badge-sm indicator-item">{wishList.length}</span>
        </div>
      </div>
    </div>
  );
}
