import Icon from "../../ui/Icon";
import { IconName } from "../../types/icon-list";

type ContactItemProps = {
  title: string;
  label: string;
  iconName: IconName;
  href?: string;
};

export default function ContactItem({ title, label, iconName, href }: ContactItemProps) {
  const content = (
    <>
      <span
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-white
        transition-colors group-hover:bg-ink"
      >
        <Icon name={iconName} size={16} />
      </span>
      <span>
        <span className="block text-xs text-ink-muted">{title}</span>
        <span className="block font-bold text-ink">{label}</span>
      </span>
    </>
  );
  const className = "group flex items-center gap-3";

  return href ? (
    <a href={href} className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}
