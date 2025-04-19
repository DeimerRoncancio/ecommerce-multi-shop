import { useNavigate } from "react-router";
import Icon from "../../shared/components/Icon";
import { IconName } from "../../shared/types/IconList";

type MenuButton = {
  label: string,
  iconName: IconName,
  pathname: string,
  to: string
}

export default function MenuButton({ label, iconName, pathname, to }: MenuButton) {
  const navigate = useNavigate();
  
  return (
    <button className={`btn gap-2 py-7 px-3 rounded-xl 
    ${pathname === to
      ? 'bg-[#f04913] text-white border-[#f04913]'
      : 'bg-white bg-none shadow-none'} text-base font-semibold 
    text-[#292421] border-white justify-normal`} onClick={() => navigate(to)}>
      <Icon name={iconName} size={25} />
      {label}
    </button>
  )
}
