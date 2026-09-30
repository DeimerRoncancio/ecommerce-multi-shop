type AvatarImageProps = {
  loading: boolean,
  userImage: string;
}

export default function AvatarImage({ loading, userImage }: AvatarImageProps) {
  return (
    loading ? (
      <div className="w-full h-full bg-base-300"></div>
    ) : (
      <img
        src={!userImage ? '/images/uknown-profile.png' : userImage}
        alt="Foto de perfil"
        className="h-full w-full object-cover"
      />
    )
  )
}
