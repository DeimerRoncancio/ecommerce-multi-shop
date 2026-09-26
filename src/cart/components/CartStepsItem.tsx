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

  const iconColor = isActive ? "#ffffff" : step.isComplete ? "#f14a13" : "#8a8078";

  return (
    <>
      {isFirst && (
        <span
          aria-hidden
          className={`relative top-6 h-[2px] w-8 rounded-full transition-colors sm:w-24 lg:w-32 ${
            index <= currentStepIndex ? "bg-brand" : "bg-base-300"
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
              ? "border-brand bg-brand ring-4 ring-brand-soft"
              : step.isComplete
                ? "cursor-pointer border-line bg-brand-soft hover:border-brand"
                : "border-line bg-base-100"
          }`}
        >
          <Icon name={step.icon} color={iconColor} size={22} />
        </button>
        <p
          className={`text-center text-xs sm:text-sm ${
            isActive || step.isComplete ? "font-medium text-ink" : "text-ink-muted"
          }`}
        >
          {step.name}
        </p>
      </div>
    </>
  );
}
