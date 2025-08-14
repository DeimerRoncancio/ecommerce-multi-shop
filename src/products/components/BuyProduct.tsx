import { AiOutlineThunderbolt } from "react-icons/ai";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoBagHandleOutline } from "react-icons/io5";
import ProductQuantity from "./ProductQuantity";

export default function BuyProduct() {
  return (
    <>
      <ProductQuantity />
      <div className="flex flex-col gap-2 mr-6">
        <div className="flex flex-col">
          <button className="btn btn-info bg-[#f04913] border-[#f04913] text-white rounded-2xl shadow-none
          outline-none">
            <IoBagHandleOutline size={17} />
            Agregar al carrito - $18000
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button className="btn btn-outline btn-primary border border-gray-300 rounded-2xl 
        hover:bg-gray-100 hover:text-black shadow-none">
            <IoIosHeartEmpty size={17} />
            Agregar a lista de deseos
          </button>
          <button className="btn btn-outline btn-primary border border-gray-300 rounded-2xl
        hover:bg-gray-100 hover:text-black focus-visible:!outline-[#f04913] shadow-none">
            <AiOutlineThunderbolt size={17} />
            Comprar ahora
          </button>
        </div>
      </div>
    </>
  );
}
