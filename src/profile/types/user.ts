export interface UserTypes {
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
