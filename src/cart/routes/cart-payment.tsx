import { useNavigate } from "react-router";
import { useSteps } from "../storage/steps";

export default function CartPayment() {
  const { nextSteps } = useSteps();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Método de pago</h2>
      <button className="btn btn-active" onClick={() => {
        nextSteps("Método de pago");
        navigate("/cart/payment");
      }}>Ir</button>
    </div>
  );
}
