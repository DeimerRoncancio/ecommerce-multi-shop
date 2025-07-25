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

export interface PasswordType {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PasswordMatchType {
  newPassword?: string;
  confirmPassword?: string;
}

export interface PasswordRequestType {
  currentPassword: string;
  newPassword: string;
}

export type PasswordFieldErrors = 'currentPassword' | 'newPassword';

export const ERROR = {
  PASSWORD_UNAUTHORIZED: 'PASSWORD_UNAUTHORIZED',
  SAME_PASSWORD: 'SAME_PASSWORD'
}

export const ERROR_MESSAGES: Record<PasswordFieldErrors, string> = {
  currentPassword: 'Esta no es tu contraseña actual',
  newPassword: 'Esta ya es tu contraseña actual',
}

export interface UpdateRequestTypes {
  name: string,
  secondName: string | undefined,
  lastnames: string | undefined,
  phoneNumber: string | undefined,
  gender: string | undefined,
  email: string
}

export interface UserUpdateTypes {
  email: string;
  gender: string | undefined;
  lastnames: string | undefined;
  names: string;
  phoneNumber: string | undefined;
}
