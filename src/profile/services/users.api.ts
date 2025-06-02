import { users } from "../api/users.api";
import { UpdateRequestTypes } from "../types/user";

export const getUser = (token: string) => {
  return users.get(`/get-user/${token}`).then(res => res.data);
}

export const updateDataUser = (id: string, userInfo: UpdateRequestTypes) => {
  return users.put(`/update/${id}`, userInfo);
}
