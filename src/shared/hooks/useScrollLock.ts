import { useEffect } from "react";

export default function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [locked]);
}
