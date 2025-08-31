import CartStepsItem from "../components/CartStepsItem";
import { Outlet, useLocation } from "react-router";
import { useSteps } from "../storage/steps";

export default function CartHeaderLayout() {
  const { steps } = useSteps();
  const location = useLocation();

  return (
    <>
      <header className="w-full flex items-start gap-8 justify-center p-10 pb-6 mt-10">
        {steps.map((step, index) => {
          const isActive = location.pathname === step.path;
          const currentIndex = steps.findIndex(step => step.path === location.pathname);
          const isFirst = index + 1 !== 1;

          return (
            <>
              <CartStepsItem
                key={index}
                step={step}
                isFirst={isFirst}
                currentStepIndex={currentIndex}
                index={index}
                isActive={isActive}
              />
            </>
          )
        })}
      </header>
      <Outlet />
    </>
  )
}
