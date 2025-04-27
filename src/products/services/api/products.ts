import axios from "axios"
import { envs } from "../../../shared/config/env.config"

export const getProducts = () => {
  return axios.get(`${envs.API}/app/products`)
    .then(res => res.data)
}
