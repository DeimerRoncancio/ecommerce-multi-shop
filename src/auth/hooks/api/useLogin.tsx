import { LoginAccesUserFormData } from "../../../auth/zod/routesAuth";
import { useNavigate } from "react-router";
import { send } from "../../../auth/services/api/login";

export default function useLogin() {
  const navigate = useNavigate();
  
  const sendData = (data: LoginAccesUserFormData) => {
    send(data).then(() => navigate("/profile"));
  }

  return {
    sendData
  }
}
