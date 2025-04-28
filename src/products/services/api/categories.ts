import axios from "axios";
import { CategoriesFromApiType } from "../../types/categories";
import { envs } from "../../../shared/config/env.config";

export const getCategories = (): Promise<CategoriesFromApiType[]> => {
  return axios.get(`${envs.API}/app/categories`)
    .then(res => res.data);
}
