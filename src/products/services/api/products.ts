import axios from "axios"
import { envs } from "../../../shared/config/env.config"
import { ProductsFromApi } from "../../types/product"

export const getProducts = (): Promise<ProductsFromApi[]> => {
  return axios
    .get(`${envs.API}/app/products`)
    .then(res => res.data)
}
