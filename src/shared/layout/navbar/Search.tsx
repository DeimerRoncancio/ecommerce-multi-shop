import { FiSearch } from "react-icons/fi";

export default function Search() {
  return (
    <form
      role="search"
      onSubmit={event => event.preventDefault()}
      className="flex h-11 w-full items-center gap-2 rounded-full bg-base-100 pe-1 ps-4 text-ink
        shadow-[inset_0_0_0_2px_transparent] transition-shadow focus-within:shadow-[inset_0_0_0_2px_#111111]
        lg:h-12"
    >
      <FiSearch size={18} className="shrink-0 text-ink-muted" aria-hidden />
      <input
        type="search"
        aria-label="Buscar productos"
        placeholder="Busca productos, marcas y más"
        className="h-full min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted
          lg:text-[15px]"
      />
      <button
        type="submit"
        className="flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-ink px-3 text-sm font-bold text-white
          transition-colors hover:bg-brand-dark sm:px-5 lg:h-10"
      >
        <FiSearch size={16} className="sm:hidden" />
        <span className="hidden sm:inline">Buscar</span>
      </button>
    </form>
  );
}
