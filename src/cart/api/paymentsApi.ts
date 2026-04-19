import { createInstance } from "../../shared/api/axios-factory";
import { envs } from "../../shared/config/env.config";

export const payments = createInstance(`${envs.API}/app/payments`);
