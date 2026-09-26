import CartStepsItem from "../components/CartStepsItem";
import { Outlet, useLocation } from "react-router";
import { useStepsStorage } from "../storage/steps";
import Container from "../../shared/ui/Container";

export default function CartHeaderLayout() {
  const { steps } = useStepsStorage();
  const location = useLocation();

  const currentIndex = steps.findIndex(step => step.path === location.pathname);

  return (
    <>
      <Container as="header" className="flex items-start justify-center gap-2 py-8 sm:gap-6 lg:py-10">
        {steps.map((step, index) => (
          <CartStepsItem
            key={index}
            step={step}
            isFirst={index !== 0}
            currentStepIndex={currentIndex}
            index={index}
            isActive={location.pathname === step.path}
          />
        ))}
      </Container>
      <Outlet />
    </>
  );
}
