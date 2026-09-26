import { FiMenu } from "react-icons/fi";

export default function MenuButton() {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-xl px-3 py-2 text-ink transition-colors
        hover:bg-cream hover:text-brand"
    >
      <FiMenu size={22} />
      <span className="text-base font-medium">Menú</span>
    </button>
  );
}
