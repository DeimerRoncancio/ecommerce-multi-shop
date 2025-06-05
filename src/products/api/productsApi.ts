import { createInstance } from "../../shared/api/axios-factory";
import { envs } from "../../shared/config/env.config";

export const products = createInstance(`${envs.API}/app/products`);
