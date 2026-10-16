import { createInstance } from "../api/axios-factory";
import { envs } from "../config/env.config";

const guests = createInstance(`${envs.API}/app/guests`);

export const getGuestAvatar = (email: string) =>
  guests.get<{ avatar: number | null }>("/avatar", { params: { email } }).then(res => res.data.avatar);

export const saveGuestAvatar = (email: string, avatar: number) => guests.put("/avatar", { email, avatar });
