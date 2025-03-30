export type userType = {
  name: string;
  profileImage?: File;
  secondName?: string;
  lastnames?: string;
  phoneNumber?: string;
  gender?: string;
  email: string;
};

type TypeUser = [
  "name",
  "secondName",
  "lastnames",
  "phoneNumber",
  "gender",
  "email",
  "password",
];

export const addUserType: TypeUser = [
  "name",
  "secondName",
  "lastnames",
  "phoneNumber",
  "gender",
  "email",
  "password",
];
