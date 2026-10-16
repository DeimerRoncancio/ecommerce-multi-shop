import { useRouteLoaderData } from "react-router";
import type { loader as appLoader } from "../../App";
import { avatarPath, avatarUrl } from "../../shared/utilities/avatar";

let visitorAvatar: number | undefined;

const keepVisitorAvatar = (avatar: number | undefined) => {
  if (typeof window === "undefined") return avatar;
  visitorAvatar ??= avatar;
  return visitorAvatar;
};

const imageClass = "h-full w-full object-cover";

type AvatarImageProps = {
  userImage: string;
};

export default function AvatarImage({ userImage }: AvatarImageProps) {
  const app = useRouteLoaderData<typeof appLoader>("App");
  const fallback = (chosen: number | null | undefined) =>
    chosen ? avatarPath(chosen) : avatarUrl(app?.user?.id, keepVisitorAvatar(app?.avatar));
  const src = userImage || fallback(app?.chosenAvatar);

  if (userImage || app?.visitorAvatar === undefined)
    return <img src={src} alt="Foto de perfil" className={imageClass} />;

  return (
    <>
      <img src={src} alt="Foto de perfil" className={`${imageClass} in-data-guest-ended:hidden`} />
      <img
        src={fallback(app.visitorAvatar)}
        alt="Foto de perfil"
        className={`${imageClass} hidden in-data-guest-ended:block`}
      />
    </>
  );
}
