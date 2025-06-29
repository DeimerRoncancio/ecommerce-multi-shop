type AvatarImageProps = {
  loading: boolean,
  userImage: string;
}

export default function AvatarImage({ loading, userImage }: AvatarImageProps) {
  return (
    loading ? (
      <div className="w-full h-full bg-gray-200"></div>
    ) : (
      <img src={
        !userImage
          ? '/images/uknown-profile.png'
          : userImage
      } />
    )
  )
}
