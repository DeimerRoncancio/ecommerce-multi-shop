import Icon from "../../shared/ui/Icon"
import { StepType } from "../types/cart";

type CartStepsItemProps = {
  step: StepType,
  isFirst: boolean,
  currentStepIndex: number;
  index: number;
  isActive: boolean;
}

export default function CartStepsItem({ step, isFirst, currentStepIndex, index, isActive }: CartStepsItemProps) {
  return (
    <>
      {isFirst &&
        <span
          className={`relative w-[140px] h-[2.5px] top-[18px] rounded-full bg-[#f3e2e2] 
          ${index <= currentStepIndex && 'bg-[#f14913]'}`}
        />}
      <div className="flex flex-col gap-2 justify-center items-center">
        <button className={`${step.isComplete ? 'bg-[#f14913]' : ''} ${isActive && 'outline-2 outline-[#f14913] bg-[#f14913]'} 
        border-2 border-white p-1 rounded-full`}>
          <Icon name={step.icon} color={`${step.isComplete || isActive ? 'white' : '#9a9a9a'}`} size={25} />
        </button>
        <p className={`${step.isComplete ? 'text-[#5a5a5a] font-semibold' : 'text-[#9a9a9a] font-sans'}`}>{step.name}</p>
      </div>
    </>
  )
}
