import { User } from "../types/user"

type AvatarImageProps = {
  loading: boolean,
  user: User
}

export default function AvatarImage({ loading, user }: AvatarImageProps) {
  return (
    loading ? (
      <div className="w-full h-full bg-gray-100"></div>
    ) : (
      <img src={
        !user.name.length
          ? '/images/uknown-profile.png'
          : user.profileImage?.imageUrl
      } />
    )
  )
}
