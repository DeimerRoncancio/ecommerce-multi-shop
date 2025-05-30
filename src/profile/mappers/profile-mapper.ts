import { UpdateRequestTypes, UserTypes, UserUpdateTypes } from "../types/user";

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

export const toUserTypes = (newUserData: UpdateRequestTypes, user: UserTypes): UserTypes => {
    return{
      id: user.id,
      name: newUserData.name,
      secondName: newUserData.secondName,
      profileImage: user.profileImage,
      lastnames: newUserData.lastnames,
      phoneNumber: Number(newUserData.phoneNumber),
      email: newUserData.email,
      admin: false,
      enabled: false
    }
}
