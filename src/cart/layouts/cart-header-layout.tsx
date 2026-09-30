import CartStepsItem from "../components/CartStepsItem";
import { Outlet, useLocation } from "react-router";
import { useStepsStorage } from "../storage/steps";
import Container from "../../shared/ui/Container";

// Pantalla partida: a la izquierda las pestañas de los pasos y el contenido de cada paso;
// a la derecha, de arriba abajo, una franja naranja suave donde va el resumen (380px) .
// La franja empieza en la mitad del espacio entre las dos columnas del contenido.
export default function CartHeaderLayout() {
  const { steps } = useStepsStorage();
  const location = useLocation();

  return (
    <div className="relative flex-1">
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 hidden border-l border-brand/15 bg-brand-soft/70 lg:block
          lg:left-[min(calc(100%-436px),calc(50%+204px))]"
      />

      <Container as="header" className="relative" aria-label="Pasos de la compra">
        <ol className="no-scrollbar flex gap-6 overflow-x-auto border-b border-line pt-5 lg:mr-[428px]">
          {steps.map((step, index) => (
            <CartStepsItem
              key={index}
              step={step}
              number={index + 1}
              isActive={location.pathname === step.path}
            />
          ))}
        </ol>
      </Container>

      <div className="relative pt-7">
        <Outlet />
      </div>
    </div>
  );
}
