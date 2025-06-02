import { envs } from "../../shared/config/env.config";
import axios from "axios";

export const products = axios.create({baseURL: `${envs.API}/app/products`,});
