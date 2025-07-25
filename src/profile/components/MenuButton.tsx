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
    <button className={`btn gap-2 py-7 px-3 rounded-xl transition-all duration-300 
    ${pathname === to
      ? 'bg-[#f04913] text-white border-[#f04913]'
      : 'bg-white bg-none shadow-none hover:bg-gray-300'} text-base font-semibold 
    text-[#292421] border-white justify-normal`} onClick={() => navigate(to)}>
      <Icon name={iconName} size={25} />
      {label}
    </button>
  )
}
