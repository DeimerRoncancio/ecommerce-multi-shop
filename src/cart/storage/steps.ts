import { create } from "zustand";
import { StepType } from "../types/cart";
import { persist } from "zustand/middleware";

type Props = {
  steps: StepType[];
  nextSteps: (nameStep: string) => void;
  clearSteps: () => void;
};

export const useSteps = create<Props>()(persist((set) => ({
  steps: [
    { name: "Carrito", isComplete: false, path: "/cart", icon: "cart" },
    { name: "Datos de usuario", isComplete: false, path: "/cart/user-data", icon: "profile" },
    { name: "Entrega", isComplete: false, path: "/cart/delivery", icon: "deliver" },
    { name: "Pago", isComplete: false, path: "/cart/payment", icon: "payment" },
  ],

  nextSteps: (nameStep: string) => {
    set((state) => ({
      steps: state.steps.map((step) =>
        step.name === nameStep ? { ...step, isComplete: true } : step
      )
    }));
  },

  clearSteps: () => {
    set((state) => ({
      steps: state.steps.map((step) => ({ ...step, isComplete: false }))
    }));
  },
}), {
  name: 'steps'
}));
