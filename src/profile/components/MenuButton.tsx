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
    <button className={`btn gap-4 py-6 rounded-xl 
    ${pathname === to
      ? 'bg-[#f04913] text-white border-[#f04913]'
      : 'bg-white bg-none shadow-none'} text-base font-normal 
    text-[#292421] border-white justify-normal`} onClick={() => navigate(to)}>
      <Icon name={iconName} size={25} />
      {label}
    </button>
  )
}
