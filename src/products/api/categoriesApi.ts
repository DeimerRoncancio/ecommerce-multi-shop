import { envs } from "../../shared/config/env.config";
import { createInstance } from "../../shared/api/axios-factory";

export const categories = createInstance(`${envs.API}/app/categories?size=5&page=0`);
