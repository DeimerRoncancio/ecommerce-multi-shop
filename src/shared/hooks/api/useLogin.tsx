import { LoginAccesUserFormData } from "../../../auth/zod/routesAuth";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import axios from "axios";
import { envs } from "../../config/env.config";

export default function useLogin() {
  const navigate = useNavigate();
  
  const sendData = (data: LoginAccesUserFormData) => {
    axios.post(`${envs.API}/login`, data)
      .then((res) => {
        Cookies.set("accessHome", res.data.token);
        navigate("/profile");
      });
  }

  return {
    sendData
  }
}
