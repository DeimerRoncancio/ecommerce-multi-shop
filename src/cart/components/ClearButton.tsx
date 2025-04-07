import { AiOutlineClear } from "react-icons/ai";
import useCart from "../hooks/useCart";

type ClearButtonProps = {
  fontSize: number
}

export default function ClearButton({ fontSize }: ClearButtonProps) {
  const { clear } = useCart();
  
  return (
    <button className="btn btn-link btn-block p-0 m-0 h-fit text-[#646464] hover:text-black"
      onClick={clear} style={{ fontSize:  fontSize}}>
      <AiOutlineClear />
      Limpiar carrito
    </button>
  )
}
