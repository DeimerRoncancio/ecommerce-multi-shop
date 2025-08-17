import { envs } from "../../config/env.config";
import { createInstance } from "../axios-factory";

export const payments = createInstance(`${envs.API}/app/payments/create-payment-session`);
