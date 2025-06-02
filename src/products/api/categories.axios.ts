import axios from "axios";
import { envs } from "../../shared/config/env.config";

export const categories = axios.create({baseURL: `${envs.API}/app/categories`});
