import { useNavigate } from "react-router";
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
  
  return (
    <button
      onClick={() => navigate(to)}
      className={`btn h-12 justify-normal gap-2.5 rounded-xl border-0 px-3 text-sm font-medium
        shadow-none transition-colors ${
          pathname === to
            ? "bg-brand text-primary-content hover:bg-brand-dark"
            : "bg-base-100 text-ink hover:bg-cream hover:text-brand"
        }`}
    >
      <Icon name={iconName} size={20} />
      {label}
    </button>
  )
}
