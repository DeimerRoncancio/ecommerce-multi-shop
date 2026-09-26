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
      className="grid h-9 w-9 place-items-center rounded-full border border-line bg-cream
        text-ink-soft transition-colors duration-200 hover:border-brand hover:bg-brand hover:text-primary-content"
    >
      <Icon name={iconName} size={16} />
    </Link>
  );
}
