import { UpdateRequestTypes } from "../types/user";
import { users } from "../api/usersApi";

export const getUser = (token: string) => {
  return users.get(`/get-user/${token}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.data);
}

export const updateDataUser = (id: string, userInfo: UpdateRequestTypes) => {
  return users.put(`/update/${id}`, userInfo);
}
