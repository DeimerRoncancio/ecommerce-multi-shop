import axios from "axios"
import { envs } from "../../../shared/config/env.config"
import { ProductsFromApiType } from "../../types/product"

export const getProducts = (): Promise<ProductsFromApiType[]> => {
  return axios
    .get(`${envs.API}/app/products`)
    .then(res => res.data)
}
