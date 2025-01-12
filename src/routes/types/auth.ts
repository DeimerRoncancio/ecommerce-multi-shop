export type userType = {
  name: string;
  profileImage?: File;
  secondName: string;
  lastNames: string;
  phoneNumber: string;
  gender?: string;
  email: string;
};

type TypeUser = [
  "name",
  "secondName",
  "lastNames",
  "phoneNumber",
  "gender",
  "email",
  "password",
];

export const addUserType: TypeUser = [
  "name",
  "secondName",
  "lastNames",
  "phoneNumber",
  "gender",
  "email",
  "password",
];
