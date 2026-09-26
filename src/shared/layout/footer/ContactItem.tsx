import Icon from "../../ui/Icon";
import { IconName } from "../../types/icon-list";

type ContactItemProps = {
  label: string;
  iconName: IconName;
  size: number;
};

export default function ContactItem({ label, iconName, size }: ContactItemProps) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 text-brand">
        <Icon name={iconName} size={size} />
      </span>
      <p className="leading-snug text-ink-soft">{label}</p>
    </div>
  );
}
