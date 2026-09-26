import { AiOutlineClear } from "react-icons/ai";

type ClearButtonProps = {
  fontSize: number;
  clear: () => void;
};

export default function ClearButton({ fontSize, clear }: ClearButtonProps) {
  return (
    <button
      type="button"
      onClick={clear}
      style={{ fontSize }}
      className="flex items-center gap-1.5 text-ink-soft transition-colors hover:text-brand"
    >
      <AiOutlineClear />
      Limpiar carrito
    </button>
  );
}
