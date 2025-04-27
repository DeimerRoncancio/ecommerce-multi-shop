import { AiOutlineClear } from "react-icons/ai";

type ClearButtonProps = {
  fontSize: number,
  clear: () => void
}

export default function ClearButton({ fontSize, clear }: ClearButtonProps) {
  
  return (
    <button className="btn btn-link btn-block p-0 m-0 h-fit text-[#646464] hover:text-black"
      onClick={clear} style={{ fontSize:  fontSize}}>
      <AiOutlineClear />
      Limpiar carrito
    </button>
  )
}
