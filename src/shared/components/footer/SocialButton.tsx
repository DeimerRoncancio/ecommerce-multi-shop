import { NavLink } from "react-router";
import Icon from "./Icon";
import { SocialIconName } from "./types/SocialIconList";

type SocialButtonProps = {
  iconName: SocialIconName;
}

export default function SocialButton({ iconName }: SocialButtonProps) {
  return (
    <NavLink to="" className="p-2 rounded-full bg-[#e8e9e9] text-[#212529] hover:bg-[#f04913] 
  hover:text-white transition-all duration-300">
      <Icon name={iconName} />
    </NavLink>
  )
}
