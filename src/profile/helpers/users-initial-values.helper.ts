import { UserTypes } from "../types/user";

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
