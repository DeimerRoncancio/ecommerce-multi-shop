import { UpdateRequestTypes } from "../types/user";
import { users } from "../api/usersApi";

export const validationUser = (token: string) => {
  return users.get(`/token-validation/${token}`);
}

export const getUser = (token: string) => {
  return users.get(`/get-user/${token}`, {
    headers: {
      Authorization: `Bearer ${token}`
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
