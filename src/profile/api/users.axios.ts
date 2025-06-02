import { envs } from "../../shared/config/env.config";
import Cookies from 'js-cookie';
import axios from "axios";

const token = Cookies.get('accessHome');

export const users = axios.create({
    baseURL: `${envs.API}/app/users`,
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
