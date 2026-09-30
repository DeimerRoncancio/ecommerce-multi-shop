import { useNavigate } from "react-router";
import { FiCheck } from "react-icons/fi";
import { StepType } from "../types/cart";

type CartStepsItemProps = {
  step: StepType;
  number: number;
  isActive: boolean;
};

export default function CartStepsItem({ step, number, isActive }: CartStepsItemProps) {
  const navigate = useNavigate();
  const isDone = step.isComplete && !isActive;

  return (
    <li className="shrink-0">
      <button
        type="button"
        onClick={() => navigate(step.path)}
        disabled={!isDone}
        aria-current={isActive ? "step" : undefined}
        className={`-mb-px flex items-center gap-1.5 border-b-[3px] pb-3 text-sm font-bold transition-colors
          disabled:cursor-default ${
            isActive
              ? "border-brand text-ink"
              : isDone
                ? "border-transparent text-success hover:border-success"
                : "border-transparent text-ink-muted"
          }`}
      >
        {isDone ? <FiCheck size={15} strokeWidth={3} /> : <span>{number} ·</span>}
        {step.name}
      </button>
    </li>
  );
}
