import { SocialIconList, SocialIconName } from "./types/SocialIconList";

type IconProps = {
  name: SocialIconName;
}

export default function Icon({ name }: IconProps) {
  const IconComponent = SocialIconList[name];

  if (!IconComponent) return null;

  return <IconComponent size={17} />
}
