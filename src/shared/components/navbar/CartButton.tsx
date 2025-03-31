import { IoCartOutline } from "react-icons/io5";

export default function CartButton() {
  return (
    <div className="dropdown dropdown-end px-4 h-full">
      <div className="h-full flex items-center">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <div className="indicator text-[25px] text-[#343e49]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <IoCartOutline />
            </svg>
            <span className="badge badge-sm indicator-item">8</span>
          </div>
        </div>
      </div>
      <div
        tabIndex={0}
        className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
        <div className="card-body">
          <span className="text-lg font-bold">8 Items</span>
          <span className="text-info">Subtotal: $999</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block">View cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}