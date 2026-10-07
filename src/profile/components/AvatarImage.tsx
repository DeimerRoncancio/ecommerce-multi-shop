type AvatarImageProps = {
  userImage: string;
}

export default function AvatarImage({ userImage }: AvatarImageProps) {
  return (
    <img
      src={!userImage ? '/images/uknown-profile.png' : userImage}
      alt="Foto de perfil"
      className="h-full w-full object-cover"
    />
  )
}
