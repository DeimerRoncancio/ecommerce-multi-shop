import { IconList, IconName } from "../../types/IconNames";

type IconProps = {
  name: IconName;
}

export default function Icon({ name }: IconProps) {
  const IconComponent = IconList[name];

  if (!IconComponent) return null;

  return <IconComponent size={17} />
}
