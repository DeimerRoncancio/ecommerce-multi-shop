import { Link } from "react-router";
import { IconName } from "../../types/icon-list";
import Icon from "../../ui/Icon";

type SocialButtonProps = {
  iconName: IconName;
};

export default function SocialButton({ iconName }: SocialButtonProps) {
  return (
    <Link
      to=""
      aria-label={iconName}
      className="grid h-9 w-9 place-items-center rounded-full bg-ink text-white transition-colors duration-200
        hover:bg-brand"
    >
      <Icon name={iconName} size={16} />
    </Link>
  );
}
