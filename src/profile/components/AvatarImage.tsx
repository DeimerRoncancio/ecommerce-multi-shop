import { UserTypes } from "../types/user"

type AvatarImageProps = {
  loading: boolean,
  user: UserTypes
}

export default function AvatarImage({ loading, user }: AvatarImageProps) {
  return (
    loading ? (
      <div className="w-full h-full bg-gray-200"></div>
    ) : (
      <img src={
        !user.name.length
          ? '/images/uknown-profile.png'
          : user.profileImage?.imageUrl
      } />
    )
  )
}
