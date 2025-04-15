import { IconNetworkList, IconNetworkName } from "./types/IconNetworkList";

type IconProps = {
  name: IconNetworkName;
}

export default function Icon({ name }: IconProps) {
  const IconComponent = IconNetworkList[name];

  if (!IconComponent) return null;

  return <IconComponent size={17} />
}
