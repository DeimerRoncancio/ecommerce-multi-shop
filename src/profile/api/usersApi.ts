import { createInstance } from "../../shared/api/axios-factory";
import { envs } from "../../shared/config/env.config";

export const users = createInstance(`${envs.API}/app/users`);
