import { useNavigate } from "react-router";
import Icon from "../../shared/ui/Icon";
import { StepType } from "../types/cart";

type CartStepsItemProps = {
  step: StepType;
  isFirst: boolean;
  currentStepIndex: number;
  index: number;
  isActive: boolean;
};

export default function CartStepsItem({
  step,
  isFirst,
  currentStepIndex,
  index,
  isActive,
}: CartStepsItemProps) {
  const navigate = useNavigate();

  const changeStep = () => {
    if (step.isComplete) navigate(step.path);
  };

  const iconColor = isActive ? "#f14a13" : step.isComplete ? "#ffffff" : "rgba(255,255,255,0.55)";

  return (
    <>
      {isFirst && (
        <span
          aria-hidden
          className={`relative top-6 h-0.5 w-8 rounded-full transition-colors sm:w-24 lg:w-32 ${
            index <= currentStepIndex ? "bg-white" : "bg-white/30"
          }`}
        />
      )}
      <div className="flex flex-col items-center justify-center gap-2">
        <button
          type="button"
          onClick={changeStep}
          disabled={!step.isComplete || isActive}
          className={`grid h-12 w-12 place-items-center rounded-full border transition-all ${
            isActive
              ? "border-white bg-white ring-4 ring-white/30"
              : step.isComplete
                ? "cursor-pointer border-white/50 bg-white/15 hover:bg-white/25"
                : "border-white/25 bg-white/5"
          }`}
        >
          <Icon name={step.icon} color={iconColor} size={22} />
        </button>
        <p
          className={`text-center text-xs sm:text-sm ${
            isActive || step.isComplete ? "font-semibold text-white" : "text-white/60"
          }`}
        >
          {step.name}
        </p>
      </div>
    </>
  );
}
