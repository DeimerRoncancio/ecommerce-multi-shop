import { IconName } from "../../types/IconList";
import Icon from "./Icon";

type ContactItemProps = {
  label: string,
  iconName: IconName,
  size: number
}

export default function ContactItem({ label, iconName, size }: ContactItemProps) {
  return (
    <div className="flex items-center justify-start gap-2">
      <Icon name={iconName} color="#f14a13" size={size} />
      <p className="leading-4 text-[#636669]">
        {label}
      </p>
    </div>
  )
}
