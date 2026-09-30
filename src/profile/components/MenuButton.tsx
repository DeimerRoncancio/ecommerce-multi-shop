import { useNavigate } from "react-router";
import { FiChevronRight } from "react-icons/fi";
import Icon from "../../shared/ui/Icon";
import { IconName } from "../../shared/types/icon-list";

type MenuButton = {
  label: string,
  iconName: IconName,
  pathname: string,
  to: string
}

export default function MenuButton({ label, iconName, pathname, to }: MenuButton) {
  const navigate = useNavigate();
  const isActive = pathname === to;
  const isSoon = !to;

  return (
    <button
      type="button"
      onClick={() => navigate(to)}
      disabled={isSoon}
      aria-current={isActive ? "page" : undefined}
      className={`group relative flex h-11 items-center gap-3 rounded-lg px-3 text-left text-sm transition-colors
        disabled:cursor-default ${
          isActive
            ? "bg-brand-soft font-bold text-brand"
            : isSoon
              ? "text-ink-muted"
              : "font-semibold text-ink hover:bg-cream hover:text-brand"
        }`}
    >
      {isActive && <span aria-hidden className="absolute inset-y-2 left-0 w-1 rounded-full bg-brand" />}
      <Icon name={iconName} size={19} />
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {isSoon ? (
        <span className="rounded-full bg-cream px-2 py-0.5 text-[10px] font-bold text-ink-muted">Pronto</span>
      ) : (
        <FiChevronRight
          size={16}
          className={`transition-transform group-hover:translate-x-0.5 ${isActive ? "" : "text-ink-muted"}`}
        />
      )}
    </button>
  )
}
