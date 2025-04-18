import { IconList, IconName } from "../types/IconList";

type IconProps = {
  name: IconName;
  color?: string;
  size: number;
}

export default function Icon({ name, color, size }: IconProps) {
  const IconComponent = IconList[name];

  if (!IconComponent) return null;

  return <IconComponent size={size} color={color} />
}
