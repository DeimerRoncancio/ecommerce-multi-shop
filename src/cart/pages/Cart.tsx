import { Link, Outlet, useNavigate } from "react-router";
import { GiPadlock } from "react-icons/gi";
import ProfileButton from "../../shared/components/navbar/ProfileButton";
import { IoMdHeartEmpty } from "react-icons/io";

export default function Cart() {
  const navigate = useNavigate();
  
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <nav className="flex w-full bg-[#ffece59a] p-1 px-4">
        <ul className="w-1/3 gap-16 flex">
          <Link to="/" className="w-13 pl-4 z-10 btn btn-link p-0">
            <img src='/images/logo-bag.webp' />
          </Link>
        </ul>

        <ul className="w-1/3 flex z-0 gap-2 text-[#7d7d7d] font-semibold justify-center items-center">
          <div className="flex gap-1">
            <p className="text-[#9a9a9a]">Tu compra </p>
            <p className="text-[#bebebe]">es 100% segura</p>
          </div>
          <GiPadlock size={21} />
        </ul>

        <ul className="flex-row-reverse flex items-center w-1/3">
          <li className="flex px-4 items-center text-[#a2a9b1]">
            <ProfileButton size={32} />
          </li>
          <li className="flex px-4 items-center border-r-[1px] border-[#a2a9b1] text-[#a2a9b1]">
            <button className="btn btn-ghost w-8 h-8 p-0 rounded-full text-[#343e49]" 
              onClick={() => navigate("/profile/wish-list")}>
              <IoMdHeartEmpty size={26} />
            </button>
          </li>
          <li className="flex px-4 items-center h-8 border-r-[1px] border-[#a2a9b1] text-[#a2a9b1]">
            <button className="flex flex-col p-0 btn btn-link decoration-transparent items-center text-[#343e49] 
             hover:text-[#343e499f] gap-0 font-normal text-md">
              <span className="p-0 m-0">Mis compras</span>
            </button>
          </li>
        </ul>
      </nav>

      <main className="!mt-0">
        <Outlet />
      </main>

      <footer className="px-10 py-4 flex flex-col text-[#7d7d7d]">
        <div className="w-full h-[1px] mb-4 mt-2.5 bg-[#e3e3e3]"></div>
        <div className="flex w-full justify-between">
          <p>2025 Multi Shop ® marca registrada de Grupo Efma S.A.</p>
          <div>
            <button className="btn btn-link btn-block p-0 m-0 h-fit text-base text-[#646464] hover:text-black">
              Ver terminos y condiciones
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
