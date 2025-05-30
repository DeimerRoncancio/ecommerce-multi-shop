export interface UserTypes {
  id: string;
  name: string;
  email: string;
  profileImage?: ImageType;
  secondName?: string;
  lastnames?: string;
  phoneNumber?: number;
  gender?: string;
  admin: boolean;
  enabled: boolean;
}

export interface ImageType {
  id: string;
  imageId: string;
  imageUrl: string;
  name: string;
}

export interface UpdateRequestTypes {
  name: string,
  secondName: string | undefined,
  lastnames: string,
  phoneNumber: string,
  gender: string,
  email: string
}

export interface UserUpdateTypes {
  email: string;
  gender: string;
  lastnames: string;
  names: string;
  phoneNumber: string;
}
