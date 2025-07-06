import { PasswordRequestType, UpdateRequestTypes } from "../types/user";
import { users } from "../api/usersApi";

export const validationUser = (token: string) => {
  return users.get('/token-validation', {
    headers: {
      'Token': token,
    }
  });
}

export const getUser = (token: string) => {
  return users.get('/me', {
    headers: {
      Authorization: `Bearer ${token}`,
      Token: token,
    }
  }).then(res => res.data);
}

export const updateUserData = (id: string, token: string, userInfo: UpdateRequestTypes) => {
  return users.put(`/update/${id}`, userInfo, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export const updatePassword = (id: string, token: string, data: PasswordRequestType) => {
  return users.put(`/update/password/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export const updateUserImage = (id: string, token: string, formData: FormData) => {
  return users.put(`/update/profile-image/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export const deleteUserAccount = (id: string, token: string) => {
  return users.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
