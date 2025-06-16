import { UserTypes, UserUpdateTypes } from "../types/user";

export const UserInitialValues: UserTypes = {
  id: "",
  name: "",
  email: "",
  profileImage: {
    id: "",
    imageId: "",
    imageUrl: "",
    name: "",
  },
  secondName: "",
  lastnames: "",
  phoneNumber: 0,
  gender: "",
  admin: false,
  enabled: false,
}

export const initialUserValues = (user: UserTypes): UserUpdateTypes => ({
  names: user.name + (user.secondName ? ' ' + user.secondName : ''),
  lastnames: user.lastnames,
  email: user.email,
  phoneNumber: user.phoneNumber?.toString(),
  gender: user.gender,
})
