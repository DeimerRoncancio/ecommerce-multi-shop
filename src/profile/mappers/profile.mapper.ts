import { UpdateRequestTypes, UserFromApiTypes, UserTypes, UserUpdateTypes } from "../types/user";

export const updateTypesToRequestTypes = (user: UserUpdateTypes): UpdateRequestTypes => {
    return {
      name: user.names.split(' ')[0],
      secondName: user.names.split(' ')[1] || undefined,
      lastnames: user.lastnames,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      email: user.email
    }
}

export const apiToUserTypes = ({ imageUser, ...user }: UserFromApiTypes): UserTypes => ({
  ...user,
  profileImage: imageUser,
})
