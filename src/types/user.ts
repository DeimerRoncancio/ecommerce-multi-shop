export interface User {
  name: string;
  email: string;
  profileImage?: Image;
  secondName?: string;
  lastnames?: string;
  phoneNumber?: number;
  gender?: string;
  admin: boolean;
  enabled: boolean;
}

export interface Image {
  id: string;
  imageId: string;
  imageUrl: string;
  name: string;
}
