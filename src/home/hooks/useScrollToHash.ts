import { useEffect } from "react";
import { useLocation } from "react-router";

export default function useScrollToHash() {
  const { hash, key } = useLocation();

  useEffect(() => {
    if (!hash) return;
    document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: "smooth" });
  }, [hash, key]);
}
