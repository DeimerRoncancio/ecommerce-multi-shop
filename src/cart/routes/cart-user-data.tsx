import { useNavigate } from "react-router";
import { useSteps } from "../storage/steps";

export default function CartUserData() {
  const { nextSteps } = useSteps();
  const navigate = useNavigate();
  
  return (
    <div>
      <h2>Datos del usuario</h2>
      <button className="btn btn-active" onClick={() => {
        nextSteps("Datos de usuario");
        navigate("/cart/delivery");
      }}>Ir</button>
    </div>
  );
}
