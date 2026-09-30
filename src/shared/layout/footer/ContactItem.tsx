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
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-white
        transition-colors group-hover:bg-ink">
        <Icon name={iconName} size={18} />
      </span>
      <span>
        <span className="block text-xs text-ink-muted">{title}</span>
        <span className="block font-bold text-ink">{label}</span>
      </span>
    </>
  );
  const className = "group flex items-center gap-3.5 px-6 py-5 transition-colors sm:px-8";

  return href ? (
    <a href={href} className={`${className} hover:bg-base-100`}>{content}</a>
  ) : (
    <div className={className}>{content}</div>
  );
}
