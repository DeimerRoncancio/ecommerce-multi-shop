import { FiSearch } from "react-icons/fi";

export default function Search() {
  return (
    <form
      role="search"
      onSubmit={event => event.preventDefault()}
      className="flex w-full items-center gap-2 rounded-full border border-line bg-cream
        py-1.5 pe-1.5 ps-5 transition-colors focus-within:border-brand"
    >
      <input
        type="search"
        aria-label="Buscar productos"
        placeholder="Busca en Multi Shop"
        className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none
          placeholder:text-ink-muted md:text-base"
      />
      <button
        type="submit"
        aria-label="Buscar"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-neutral text-neutral-content
          transition-colors hover:bg-brand"
      >
        <FiSearch size={18} />
      </button>
    </form>
  );
}
