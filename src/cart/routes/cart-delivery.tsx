import { useNavigate } from "react-router";
import { useSteps } from "../storage/steps";

export default function CartDelivery() {
  const { nextSteps } = useSteps();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Dirección de envío</h2>
      <button className="btn btn-active" onClick={() => {
        nextSteps("Entrega");
        navigate("/cart/payment");
      }}>Ir</button>
    </div>
  );
}
