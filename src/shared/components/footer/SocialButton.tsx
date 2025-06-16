import { Link } from "react-router";
import Icon from "../Icon";
import { IconName } from "../../types/icon-list";

type SocialButtonProps = {
  iconName: IconName;
}

export default function SocialButton({ iconName }: SocialButtonProps) {
  return (
    <Link to="" className="p-2 rounded-full bg-[#e8e9e9] text-[#212529] hover:bg-[#f04913] 
  hover:text-white transition-all duration-300">
      <Icon name={iconName} size={17} />
    </Link>
  )
}
